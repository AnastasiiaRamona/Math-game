import Cube from '../cube/cube';
import $ from 'jquery';
import './cubeRow.css';

class CubeRow {
  constructor(quantity) {
    this.quantity = quantity;
    this.cube = new Cube();
  }

  create() {
    const container = $('<div class="cube-row"></div>');

    for (let i = 0; i < this.quantity; i++) {
      const cubeContent = this.cube.create();
      container.append(cubeContent);
    }

    return container;
  }
}

export default CubeRow;
