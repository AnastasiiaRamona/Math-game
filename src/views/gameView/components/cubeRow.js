import Cube from './cube';
import $ from 'jquery';

class CubeRow {
  constructor(quantity) {
    this.quantity = quantity;
    this.cube = new Cube();
  }

  render() {
    const container = $('<div class="cube-row"></div>');

    for (let i = 0; i < this.quantity; i++) {
      const cubeContent = this.cube.render();
      container.append(cubeContent);
    }

    return container;
  }
}

export default CubeRow;
