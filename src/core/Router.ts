import Route from './Route';
import Block from './Block';

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

  use(pathname: string, block: unknown) {
    const route = new Route(pathname, block as typeof Block);
  
    this.routes.push(route);

    return this;
  }

  start() {
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

    route.render();
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
