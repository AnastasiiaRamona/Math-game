import Model from './model';
import router from './routes';

class Controller {
  constructor() {
    this.model = new Model();
  }

  setCurrentMultiplier(number) {
    this.model.currentMultiplier = number;
  }

  getCurrentMultiplier() {
    return this.model.currentMultiplier;
  }

  startGame() {
    router.navigateTo('/game');
  }
}

export default Controller;
