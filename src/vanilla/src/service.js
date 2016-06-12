/**
 * Fetches items from the backend
 */

const request = (type, url, data=null) => {
    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open(type, url);

      if (data) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.send(data);
      xhr.onreadystatechange = function () {
        const DONE = 4;
        const OK = 200; 

        if (xhr.readyState === DONE) {
          if (xhr.status === OK) {
            try {
              resolve(JSON.parse(xhr.responseText));
            } catch (e) {
              reject(e);
            }
          } else {
            reject(xhr.status); // An error occurred during the request.
          }
        }
      };
    });
}

const service = {
  getItems() {
    return request('GET', '/appointments/all');
  },

  getMonth(month, year) {
    return request('GET', `/appointments/${year}/${++month}`);
  },

  updateItem(item) {
    return request('PUT', `/appointments/${item.id}`, JSON.stringify(item));
  }
};

export default service;