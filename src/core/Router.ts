import Route from './Route';

class Router {
  static __instance: Router;

  routes: Array<Route>;
  history: History;
  _currentRoute: Route | null;
  _rootQuery: string;

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

  use(pathname: string, block: string) {
    const route = new Route(pathname, block, {
      rootQuery: this._rootQuery
    });
  
    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = event => {
      this._onRoute(
        event.currentTarget.location.pathname
      );
    }

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    route.render(route, pathname);
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}

export default new Router();
