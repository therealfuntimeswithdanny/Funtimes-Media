class PocketlistBlog extends HTMLElement {
    constructor() {
      super();
      // Attach a shadow DOM for encapsulated styles and markup.
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      // Extract the blog ID from the custom tag name.
      // For example, if the element is <pocketlist-blog2> then blogId will be "2".
      const tagName = this.tagName.toLowerCase();
      this.blogId = tagName.replace('pocketlist-blog', '') || 'default';
  
      // Render the component.
      this.render();
  
      // Set up the click event on the bookmark button.
      this.shadowRoot.querySelector('.pocket-btn').addEventListener('click', () => {
        this.savePage();
      });
  
      // Update the count display on load.
      this.updateCount();
    }
  
    savePage() {
      const currentPageUrl = window.location.href;
      // Get existing saved data from localStorage.
      const storedData = localStorage.getItem('pocketList');
      const pockets = storedData ? JSON.parse(storedData) : {};
  
      // Ensure there's an array for this blog.
      if (!pockets[this.blogId]) {
        pockets[this.blogId] = [];
      }
  
      // Save the URL if it's not already saved.
      if (!pockets[this.blogId].includes(currentPageUrl)) {
        pockets[this.blogId].push(currentPageUrl);
      }
  
      // Save the updated object back to localStorage.
      localStorage.setItem('pocketList', JSON.stringify(pockets));
  
      // Update the count display.
      this.updateCount();
  
      // Display the confirmation flash message.
      this.shadowRoot.querySelector('.flash-message').innerHTML =
        `Page saved at <a href="/saved.html">/saved.html</a>`;
    }

  
    render() {
      // Render the component's HTML along with Font Awesome for the bookmark icon.
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <style>
          .pocket-btn {
            display: inline-flex;
            align-items: center;
            cursor: pointer;
            color: #B197FC;
            font-family: Arial, sans-serif;
            font-size: 16px;
            user-select: none;
          }
          .pocket-btn i {
            margin-right: 0.5em;
          }
          .flash-message {
            margin-top: 0.5em;
            font-family: Arial, sans-serif;
            font-size: 14px;
            color: #333;
          }
          .flash-message a {
            color: #B197FC;
            text-decoration: none;
          }
          .flash-message a:hover {
            text-decoration: underline;
          }
        </style>
        <div class="pocket-btn">
           <i class="fa-solid fa-bookmark" style="color: #B197FC;"></i>
          <span class="count"></span>
          <span>Bookmark</span>
        </div>
        <div class="flash-message"></div>
      `;
    }
  }
  
  // Register custom elements for blog numbers 1 through 50.
  for (let i = 1; i <= 50; i++) {
    const tagName = `pocketlist-blog${i}`;
    if (!customElements.get(tagName)) {
      customElements.define(tagName, PocketlistBlog);
    }
  }
  