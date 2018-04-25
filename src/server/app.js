const path = require('path');
const url = require('url');
const fs = require('fs');
const http = require('http');
const buffer = require('buffer').Buffer;
const appConsts = require('./consts');

const { APPTS_SERVICE_HOST, APPTS_SERVICE_PORT } = appConsts.SERVICE_CONFIG;

const staticFilesPath = path.resolve(__dirname, '..');
const { CONTENT_TYPES } = appConsts;

const objToLogFormat = (obj, prefix = '') => {
  let str = '';
  for (prop in obj) {
    if (typeof obj[prop] === 'object') {
      str += objToLogFormat(obj[prop], prefix + prop + '.');
    } else if (typeof obj[prop] !== 'function') {
      str += prefix + prop + '="' + obj[prop] + '" ';
    }
  }
  return str;
};

const handleAppointmentsApiRequest = (req, res) => {
  let proxyRequestConfig = { 
    protocol: 'http:',
    method: req.method,
    headers: Object.assign({}, req.headers, { host: null }),
    host: process.env.APPTS_SERVICE_HOST || APPTS_SERVICE_HOST,
    port: process.env.APPTS_SERVICE_PORT || APPTS_SERVICE_PORT,
    path: req.url.match(/\/appointments(\/?.*)$/)[1]
  };

  console.log('Proxy request: ' + objToLogFormat(
    Object.assign({}, proxyRequestConfig, { originalUrl: req.url }))
  );

  let proxyReq = http.request(proxyRequestConfig, (proxyRes) => {
    let { statusCode, headers } = proxyRes;
    console.log('Proxy response: ' + objToLogFormat({ statusCode, headers }));
    res.writeHead(statusCode, headers);
    proxyRes.pipe(res, { end: true });
  });

  req.pipe(proxyReq, { end: true });
};

const handleStaticFileRequest = (req, res) => {
  let { method, url } = req;

  if (/\/$/.test(url)) {
    url += 'index.html';
  }

  let filepath = path.join(staticFilesPath, url);
  
  let contentType = CONTENT_TYPES[path.extname(url)];

  fs.readFile(filepath, (err, contents) => {
    let statusCode = err ? 404 : 200;
    let headers;

    if (err) {
      res.writeHead(statusCode);
      res.end('Not found');
    } else {
      headers = { 
        'Content-Type': contentType,
        'Content-Length': buffer.byteLength(contents)
      };
      res.writeHead(statusCode, headers);
      res.end(contents, 'utf8');
    }
    
    console.log('Static handle: ', objToLogFormat({ method, url, statusCode, filepath, headers }));
  });
};

const acceptor = http.createServer();

// Proxy requests to appointments service
acceptor.on('request', (req, res) => {
  if (/\/appointments\/?.*$/.test(req.url)) {
    return handleAppointmentsApiRequest(req, res);
  } else {
    return handleStaticFileRequest(req, res);
  }
});

module.exports = acceptor;
