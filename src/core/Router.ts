import Route from './Route';

class Router {
  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = '#app';

    Router.__instance = this;
  }

  use(pathname, block) {
    const route = new Route(pathname, block, {
      rootQuery: this._rootQuery
    });
  
    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = event => {
      this._onRoute(event.currentTarget.location.pathname);
    }

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname) {
    const route = this.getRoute(pathname);
    console.log({ route, pathname });

    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    route.render(route, pathname);
  }

  go(pathname) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname) {
    return this.routes.find(route => route.match(pathname));
  }
}

export default new Router();