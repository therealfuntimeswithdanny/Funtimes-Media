    // When the document loads, check local storage for the user's mode preference.
    document.addEventListener('DOMContentLoaded', function () {
        const btn = document.getElementById('darkbtn');
        if (localStorage.getItem('lightMode') === 'true') {
          document.body.classList.add('light-mode');
          // In dark mode, display the sun icon.
          btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
          // In light mode, display the moon icon.
          btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
      });
  
      function toggleDarkMode() {
        const btn = document.getElementById('darkbtn');
        // Toggle the "light-mode" class on the body.
        document.body.classList.toggle("light-mode");
        if (document.body.classList.contains("light-mode")) {
          // Now in dark mode: save the state and update the icon.
          localStorage.setItem('lightMode', 'true');
          btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
          // In light mode: save the state and update the icon.
          localStorage.setItem('lightMode', 'false');
          btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
      }