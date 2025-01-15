import { routes } from './routes';

class Router {
  constructor(routes) {
    this.routes = routes;
    window.addEventListener('popstate', this.handleRouteChange.bind(this));
    window.addEventListener('load', this.handleRouteChange.bind(this));
  }

  handleRouteChange() {
    const currentRoute = window.location.pathname;

    const handler = this.routes[currentRoute];
    if (handler) {
      handler();
    }
  }

  navigateTo(route) {
    const absoluteRoute = route.startsWith('/') ? route : `/${route}`;
    window.history.pushState(null, '', absoluteRoute);
    this.handleRouteChange();
  }
}

const router = new Router(routes);
export default router;
