/**
 * Entry point of the app
 */

import Model from './model';
import View from './view';
import Controller from './controller';
import Service from './service';
import { $on } from './util';

class App {
  constructor() {
    this.service = new Service();
    this.view = new View();
    this.model = new Model(this.service);
    this.controller = new Controller(this.view, this.model);
  }
}

const app = new App();

const setView = () => {
  app.controller.setView(document.location.hash);
  app.view.render();
}

$on(window, 'load', setView);
$on(window, 'hashChange', setView);