 // Define one custom element for all blog posts.
 class ViewsBlog extends HTMLElement {
  connectedCallback() {
    // Read the blog number from the element attribute "blog-number"
    const blogNumber = this.getAttribute('blog-number');
    if (!blogNumber) {
      this.innerHTML = '<p>Error: no blog number provided.</p>';
      return;
    }
    
    // Construct the URL using the blog number.
    const workerUrl = `https://view-counter-snowy-bar-1106.madebydannyuk.workers.dev/blog-${blogNumber}`;
    
    // Fetch the view count from the Cloudflare Worker.
    fetch(workerUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then(text => {
        // Display the response inside a <p> element.
        this.innerHTML = `<p>${text}</p>`;
      })
      .catch(error => {
        console.error('Error fetching view count for blog', blogNumber, ':', error);
        this.innerHTML = '<p>Error loading view count.</p>';
      });
  }
}

// Register the custom element only once.
if (!customElements.get('views-blog')) {
  customElements.define('views-blog', ViewsBlog);
}