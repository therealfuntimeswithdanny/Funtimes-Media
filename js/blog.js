
  class FeedbackCounter extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      // Retrieve the blog-id and endpoint attributes (with defaults)
      this.blogId = this.getAttribute("blog-id") || "blog-1";
      this.endpoint =
        this.getAttribute("endpoint") ||
        "https://likecounter-young-mouse-f484.madebydannyuk.workers.dev";
      
      // Render the one-line widget and then load the current counts.
      this.render();
      this.loadCounts();
    }
  
    render() {
      // Render the widget inside the shadow DOM using inline-flex for one-line layout.
      // All text and icons are set to white.
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <link rel="stylesheet" href="/css/blog-home.css" />
        <style>
          .container {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-family: sans-serif;
            color: white;
          }
          button {
            font-size: 1em;
            background: none;
            border: none;
            cursor: pointer;
            color: white;
            padding: 0;
          }
          button:focus {
            outline: none;
          }
        </style>
        <div class="container">
          <span><strong>Feedback:</strong></span>
          <button id="likeBtn">
            <i class="fa-solid fa-thumbs-up" style="color: #FFD43B;"></i> <span id="likeCount">0</span>
          </button>
          <button id="loveBtn">
            <i class="fa-solid fa-heart" style="color: #ff8787;"></i> <span id="loveCount">0</span>
          </button>
          <button id="dislikeBtn">
            <i class="fa-solid fa-thumbs-down" style="color: #74C0FC;"></i> <span id="dislikeCount">0</span>
          </button>
        </div>
      `;
      
      // Attach event listeners for each button.
      this.shadowRoot
        .getElementById("likeBtn")
        .addEventListener("click", () => this.vote("like"));
      this.shadowRoot
        .getElementById("loveBtn")
        .addEventListener("click", () => this.vote("love"));
      this.shadowRoot
        .getElementById("dislikeBtn")
        .addEventListener("click", () => this.vote("dislike"));
    }
    
    async loadCounts() {
      try {
        // Request a JSON response so our Worker returns counts.
        const res = await fetch(`${this.endpoint}/${this.blogId}`, {
          headers: { "Accept": "application/json" }
        });
        if (res.ok) {
          const data = await res.json();
          this.updateCount("like", data.like);
          this.updateCount("love", data.love);
          this.updateCount("dislike", data.dislike);
        } else {
          console.error("Failed to load counts from", this.endpoint);
        }
      } catch (err) {
        console.error("Error loading counts:", err);
      }
    }
  
    async vote(action) {
      try {
        const res = await fetch(`${this.endpoint}/${this.blogId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action })
        });
        if (res.ok) {
          const data = await res.json();
          if (data[action] !== undefined) {
            this.updateCount(action, data[action]);
          }
        } else {
          console.error("Failed to post vote. Status:", res.status);
        }
      } catch (err) {
        console.error("Error posting vote:", err);
      }
    }
  
    updateCount(action, count) {
      const elem = this.shadowRoot.getElementById(`${action}Count`);
      if (elem) {
        elem.textContent = count;
      }
    }
  }
  
  customElements.define("feedback-counter", FeedbackCounter);