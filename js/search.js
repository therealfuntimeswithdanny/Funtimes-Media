
    // Wait for the DOM content to load
    document.addEventListener('DOMContentLoaded', () => {
      const form = document.getElementById('search-form');
      const searchInput = document.getElementById('search-input');
      const resultsDiv = document.getElementById('results');

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const query = searchInput.value.trim().toLowerCase();
        resultsDiv.innerHTML = '';

        if (query === '') return;

        // Assume searchData is defined in data.js as an array of objects
        const filteredResults = searchData.filter(item => {
          return item.title.toLowerCase().includes(query) ||
                 item.content.toLowerCase().includes(query);
        });

        if (filteredResults.length === 0) {
          resultsDiv.innerHTML = '<p>No results found.</p>';
        } else {
          filteredResults.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            // Check if the URL property exists. If so, wrap the title in an anchor tag.
            if (item.url) {
              resultItem.innerHTML = `<h2><a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title}</a></h2><p>${item.content}</p>`;
            } else {
              resultItem.innerHTML = `<h2>${item.title}</h2><p>${item.content}</p>`;
            }
            resultsDiv.appendChild(resultItem);
          });
        }
      });
    });