import controller from '../../controller';
import Exercise from './components/exercise/exercise';
import CubeRow from './components/cubeRow/cubeRow';
import DoneButton from './components/doneButton/doneButton';
import $ from 'jquery';
import './gameView.css';

class GameView {
  constructor() {
    this.controller = controller;
  }

  render() {
    const exercise = this.createExercise();
    const cubeRow = this.createCubeRow();

    const doneButton = new DoneButton();
    const doneButtonContent = doneButton.create();

    const gameView = $('<section class="game-view"></section>');
    const gameRow = $('<div class="game-row"></div>');
    const cubeRows = $('<div class="cube-rows"></div>');
    const exercises = $('<div class="exercises"></div>');

    exercises.append(exercise);
    cubeRows.append(cubeRow);

    gameRow.append(exercises);
    gameRow.append(cubeRows);

    gameView.append(gameRow);
    gameView.append(doneButtonContent);

    $('body').html('');
    $('body').append(gameView);

    this.addEventListenerToDoneButton();
    this.addEventListenerToInputAnswer();
  }

  createExercise() {
    const firstMultiplier = this.controller.getCurrentMultiplier();
    const secondMultiplier = this.controller.getCurrentIndex();
    const exercise = new Exercise(firstMultiplier, secondMultiplier);
    const exerciseContent = exercise.create();
    return exerciseContent;
  }

  createCubeRow() {
    const firstMultiplier = this.controller.getCurrentMultiplier();
    const cubeRow = new CubeRow(firstMultiplier);
    const cubeRowContent = cubeRow.create();
    return cubeRowContent;
  }

  addEventListenerToDoneButton() {
    const doneButton = $('#doneButton');
    doneButton.on('click', () => {
      const answer = Number($('#answerInput').val());
      const isAnswerCorrect = this.controller.checkResult(answer);
      if (isAnswerCorrect) {
        if (this.controller.getCurrentIndex() > 10) {
          return;
        }

        const newExercise = this.createExercise();
        const newCubeRow = this.createCubeRow();
        $('.cube-rows').append(newCubeRow);

        newCubeRow.animate({ top: '100%' }, 0).animate(
          {
            top:
              (this.controller.getCurrentIndex() - 1) *
              (48 + this.vhToPixels(2)),
          },
          500
        );

        $('.exercises').append(newExercise);
        newExercise.hide().fadeIn(500);
        this.updateButtonColor(doneButton, 'right');
      } else {
        this.updateButtonColor(doneButton, 'wrong');
      }
    });
  }

  addEventListenerToInputAnswer() {
    $('#answerInput').on('input', () => {
      const isAnswerValid = this.controller.checkInputAnswer(
        $('#answerInput').val()
      );
      const doneButton = $('#doneButton');
      if (!isAnswerValid) {
        doneButton.prop('disabled', true);
        this.updateButtonColor(doneButton, 'disabled');
      } else {
        doneButton.prop('disabled', false);
        doneButton.removeClass('disabled');
      }
    });
  }

  vhToPixels(vh) {
    const viewportHeight = window.innerHeight;
    const pixels = (vh / 100) * viewportHeight;
    return pixels;
  }

  updateButtonColor(doneButton, state) {
    doneButton.removeClass('wrong right disabled');

    switch (state) {
      case 'right':
        doneButton.addClass('right');
        break;
      case 'wrong':
        doneButton.addClass('wrong');
        break;
      case 'disabled':
        doneButton.addClass('disabled');
        break;
      default:
        console.warn(`Unknown state: ${state}`);
    }
  }
}

export default GameView;
