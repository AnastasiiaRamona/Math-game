import Controller from '../../controller';
import Example from './components/example';
import CubeRow from './components/cubeRow';
import $ from 'jquery';

class GameView {
  constructor() {
    this.controller = new Controller();
  }

  render() {
    const example = new Example(2, 3);
    const exampleContent = example.render();
    const cubeRow = new CubeRow(3);
    const cubeRowContent = cubeRow.render().html();

    const content = `
      <section class="game-view">
        <div class="game-row">
          ${exampleContent}
          ${cubeRowContent}
        </div>
      </section>
    `;

    $('body').html(content);
  }
}

export default GameView;
