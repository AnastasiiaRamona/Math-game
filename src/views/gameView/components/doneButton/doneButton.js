import $ from 'jquery';

class DoneButton {
  constructor(buttonState) {
    this.buttonState = buttonState;
  }

  create() {
    const content = $(`
      <button id="doneButton" class="${this.buttonState}">Done</button>
    `);
    return content;
  }
}

export default DoneButton;
