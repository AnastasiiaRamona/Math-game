import Model from './model';
import router from './routing/router';
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

  updateButtonColor(button, state) {
    switch (state) {
      case 'right':
        this.setDisabledButtonClass(button, 'right');
        break;
      case 'wrong':
        button.addClass('wrong');
        break;
      case 'disabled':
        this.setDisabledButtonClass(button, 'disabled');
        break;
      default:
        console.warn(`Unknown state: ${state}`);
    }

    setTimeout(() => {
      button.removeClass(state);
      if (state === 'right') {
        this.setDisabledButtonClass(button, 'disabled');
      }
    }, 1000);
  }

  setDisabledButtonClass(button, color) {
    button.prop('disabled', true);
    button.addClass(color);
  }

  removeDisabledButtonClass(button, color) {
    button.prop('disabled', false);
    button.removeClass(color);
  }

  flashWrongAnswerText() {
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
