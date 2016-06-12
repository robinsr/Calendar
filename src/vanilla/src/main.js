/**
 * Entry point of the app
 */

import Model from './model';
import View from './view';
import Controller from './controller';
import { $on } from './util';

class App {
  constructor() {
    this.view = new View();
    this.model = new Model();
    this.controller = new Controller(this.view, this.model);
  }
}

const app = new App();

const setView = () => {
  app.controller.setView(document.location.hash);
}

$on(window, 'load', setView);
$on(window, 'hashchange', setView);