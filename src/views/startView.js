import $ from 'jquery';
import Controller from '../controller';
class StartView {
  constructor() {
    this.controller = new Controller();
  }
  render() {
    const content = `
      <div class="start-page">
        <h1>Welcome to the Fun Math Game!</h1>
        <p>Choose a number:</p>
        <input type="number" id="numberInput" placeholder="Enter a number" min="1" max="9">
        <button id="startButton">Let's get started</button>
      </div>
    `;

    $('body').html(content);

    $('#startButton').on('click', () => {
      const number = $('#numberInput').val();
      this.controller.setCurrentMultiplier(number);
      this.controller.startGame();
    });
  }
}

export default StartView;
