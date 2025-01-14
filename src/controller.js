import Model from './model';
import router from './routes';
import $ from 'jquery';

class Controller {
  constructor() {
    this.model = new Model();
  }
  setCurrentMultiplier(number) {
    this.model.currentMultiplier = Number(number);
  }

  getCurrentMultiplier() {
    return this.model.currentMultiplier;
  }

  getCurrentIndex() {
    return this.model.currentIndex;
  }

  startGame() {
    router.navigateTo('/game');
  }

  checkResult(result) {
    const firstMultiplier = this.model.currentMultiplier;
    const secondMultiplier = this.model.currentIndex;
    if (result === firstMultiplier * secondMultiplier) {
      this.model.isAnswerCorrect = true;

      this.model.currentIndex++;

      this.updateLastExerciseAnswer(result);
    } else {
      this.model.isAnswerCorrect = false;
    }

    return this.model.isAnswerCorrect;
  }

  updateLastExerciseAnswer(result) {
    const answerInput = $('#answerInput');
    answerInput.replaceWith($(`<p class="answered-text">${result}</p>`));
  }

  checkInputAnswer(answer) {
    if (answer === '' || answer === undefined || answer === null) {
      return false;
    }

    return true;
  }
}

const controller = new Controller();
export default controller;
