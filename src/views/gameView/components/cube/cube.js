import './cube.css';
import $ from 'jquery';

class Cube {
  create() {
    const content = $(`
      <div class="cube"></div>
    `);
    return content;
  }
}

export default Cube;
