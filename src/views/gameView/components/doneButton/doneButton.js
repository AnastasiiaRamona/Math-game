import $ from 'jquery';
import './doneButton.css';

class DoneButton {
  create() {
    const content = $(`
      <button id="doneButton" class="disabled" disabled>Done</button>
    `);
    return content;
  }
}

export default DoneButton;
