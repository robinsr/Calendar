/**
 * Fetches items from the backend
 */

export default class Service {
  getItems() {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/common/data/items.json');
      xhr.send(null);
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
}