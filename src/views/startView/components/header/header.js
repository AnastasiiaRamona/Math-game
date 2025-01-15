import $ from 'jquery';
import logoImg from '../../../../assets/happy-logo.svg';
import './header.css';

class Header {
  create() {
    const content = $(`
      <header class="header">
        <div class="header-logo-container">
          <img src="${logoImg}" alt="Logo" class="header-logo" />
        </div> 
      </header>
    `);
    return content;
  }
}

export default Header;
