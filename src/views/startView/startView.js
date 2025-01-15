import $ from 'jquery';
import controller from '../../controller';
import Header from './components/header/header';
import './startView.css';
import homeImage from '../../assets/home-image.svg';

class StartView {
  constructor() {
    this.controller = controller;
  }
  render() {
    const header = new Header();
    const headerContent = header.create();

    const mainView = $('<section class="main-view"></section>');
    mainView.append(headerContent);

    const content = `
      <section class="start-page">
        <h1>Welcome to the Fun Math Game!</h1> 
          <div class="choose-number-container"> 
            <p>Choose a number from 1 to 9:</p>
            <div class="number-container">
              <input type="number" id="numberInput" value="1" min="1" max="9">
              <button id="startButton">Let's get started</button>
            </div>
          </div>
      </section>
      <img src="${homeImage}" alt="Home-image" class="home-image" />
    `;

    mainView.append(content);

    $('body').html(mainView);

    $('#startButton').on('click', () => {
      const number = $('#numberInput').val();
      this.controller.setCurrentMultiplier(number);
      this.controller.startGame();
    });

    this.addEventListenerToNumberInput();
  }

  addEventListenerToNumberInput() {
    $('#numberInput').on('input', async () => {
      try {
        await this.controller.validateNumber($('#numberInput').val());
        $('#startButton').removeClass('disabled').prop('disabled', false);
      } catch {
        $('#startButton').addClass('disabled').prop('disabled', true);
      }
    });
  }
}

export default StartView;
