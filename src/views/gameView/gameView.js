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

    const doneButton = new DoneButton('active');
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
    $('#doneButton').on('click', () => {
      const answer = Number($('#answerInput').val());
      const isAnswerCorrect = this.controller.checkResult(answer);
      if (isAnswerCorrect) {
        $('.exercises').append(this.createExercise());
        $('.cube-rows').append(this.createCubeRow());
      }
    });
  }
}

export default GameView;
