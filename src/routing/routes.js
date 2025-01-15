import StartView from '../views/startView/startView';
import GameView from '../views/gameView/gameView';

const startView = new StartView();
const gameView = new GameView();

export const routes = {
  '/start': () => startView.render(),
  '/game': () => gameView.render(),
};
