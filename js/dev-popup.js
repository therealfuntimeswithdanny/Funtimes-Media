// popup.js
class PopupElement extends HTMLElement {
    constructor() {
      super();
      // Attach a shadow root to the element.
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      // Render the popup markup when the element is inserted into the DOM.
      this.render();
  
      // Attach event listeners within the shadow DOM.
      // When the "Continue" button is clicked, remove the popup.
      this.shadowRoot
        .getElementById('popup-close')
        .addEventListener('click', () => {
          this.remove();
        });
      // When the close (×) button is clicked, remove the popup.
      this.shadowRoot
        .getElementById('close')
        .addEventListener('click', () => {
          this.remove();
        });
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/css/popup.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <div id="popup-overlay">
          <div id="popup">
            <button id="close" aria-label="Close popup">&times;</button>
            <h1>This site is in development</h1>
            <h3>This site may be unstable or not function as intended</h3>
            <h3>Most issues are published <a href="https://bsky.app/profile/madebydanny.uk">here</a></h3>
            <label>
              <input type="checkbox" id="never-show"> Never show again
            </label>
            <br>
            <button id="popup-close">Continue to <b>www.madebydanny.uk</b></button>
          </div>
        </div>
      `;
    }
  }
  
  // Define the custom element with a hyphenated name
  customElements.define('popup-element', PopupElement);
  