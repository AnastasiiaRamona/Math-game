import $ from 'jquery';
import './exercise.css';

class Exercise {
  constructor(firstMultiplier, secondMultiplier) {
    this.firstMultiplier = firstMultiplier;
    this.secondMultiplier = secondMultiplier;
  }

  create() {
    const content = $(`
      <div class="exercise">
        <p>${this.firstMultiplier} × ${this.secondMultiplier} = </p>
        <input type="number" id="answerInput">
      </div>
    `);
    return content;
  }
}

export default Exercise;
