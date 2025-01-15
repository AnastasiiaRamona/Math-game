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
    this.model.clearSavedData();
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
    return typeof answer === 'number' && !isNaN(answer) && answer !== 0;
  }

  vhToPixels(vh) {
    const viewportHeight = window.innerHeight;
    const pixels = (vh / 100) * viewportHeight;
    return pixels;
  }

  updateButtonColor(doneButton, state) {
    switch (state) {
      case 'right':
        this.setDisabledState(doneButton, 'right');
        break;
      case 'wrong':
        doneButton.addClass('wrong');
        break;
      case 'disabled':
        this.setDisabledState(doneButton, 'disabled');
        break;
      default:
        console.warn(`Unknown state: ${state}`);
    }

    setTimeout(() => {
      doneButton.removeClass(state);
      if (state === 'right') {
        this.setDisabledState(doneButton, 'disabled');
      }
    }, 1000);
  }

  setDisabledState(button, color) {
    button.prop('disabled', true);
    button.addClass(color);
  }

  deleteDisabledState(button, color) {
    button.prop('disabled', false);
    button.removeClass(color);
  }

  addRedFlashingToTheAnswerInput() {
    $('#answerInput').addClass('input-error-text');
    setTimeout(() => {
      $('#answerInput').removeClass('input-error-text');
    }, 1000);
  }

  async validateNumber(value) {
    await this.model.validationSchema.validate(Number(value));
  }
}

const controller = new Controller();
export default controller;
