import controller from '../../controller';
import Exercise from './components/exercise/exercise';
import CubeRow from './components/cubeRow/cubeRow';
import DoneButton from './components/doneButton/doneButton';
import { vhToPixels, checkAnswerIsNumber } from '../../utils';
import $ from 'jquery';
import './gameView.css';

class GameView {
  constructor() {
    this.controller = controller;
  }

  render() {
    this.controller.model.clearSavedData();

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
          this.controller.setDisabledButtonClass(doneButton, 'disabled');
          return;
        }

        const newExercise = this.createExercise();
        const newCubeRow = this.createCubeRow();
        $('.cube-rows').append(newCubeRow);
        this.animateCubeRow(newCubeRow);

        $('.exercises').append(newExercise);

        this.animateExercise(newExercise);
        this.controller.updateButtonColor(doneButton, 'right');
        this.addEventListenerToInputAnswer();
      } else {
        this.controller.updateButtonColor(doneButton, 'wrong');
        this.controller.flashWrongAnswerText();
      }
    });
  }

  addEventListenerToInputAnswer() {
    $('#answerInput').on('input', () => {
      const isAnswerValid = checkAnswerIsNumber(
        parseInt($('#answerInput').val())
      );
      const doneButton = $('#doneButton');
      if (!isAnswerValid) {
        this.controller.setDisabledButtonClass(doneButton, 'disabled');
      } else {
        this.controller.removeDisabledButtonClass(doneButton, 'disabled');
      }
    });
  }

  animateCubeRow(cubeRow) {
    cubeRow.animate({ top: '100%' }, 0).animate(
      {
        top: (this.controller.getCurrentIndex() - 1) * (48 + vhToPixels(2)),
      },
      500
    );
  }

  animateExercise(exercise) {
    exercise.hide().fadeIn(500);
  }
}

export default GameView;
