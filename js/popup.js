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
        <style>
          /* Styles for the popup overlay and content */
          #popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }
  
          #popup {
            background: white;
            color: black;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            max-width: 90%;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          }
  
          button {
            cursor: pointer;
          }
        </style>
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
  