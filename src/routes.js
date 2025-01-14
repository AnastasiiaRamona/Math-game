import StartView from './views/startView';
import GameView from './views/gameView/gameView';

const startView = new StartView();
const gameView = new GameView();

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

const routes = {
  '/start': () => startView.render(),
  '/game': () => gameView.render(),
};

const router = new Router(routes);
export default router;
