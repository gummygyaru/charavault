async function insertLayout() {
  // Create containers for header and footer
  const header = document.createElement('div');
  header.id = 'header-container';
  const footer = document.createElement('div');
  footer.id = 'footer-container';

  // Insert header at top of body
  document.body.insertBefore(header, document.body.firstChild);

  // Insert footer at bottom of body
  document.body.appendChild(footer);

  // Load header and footer content
  await fetch('/partials/header.html')
    .then(res => res.text())
    .then(data => {
      header.innerHTML = data;
    });

  await fetch('/partials/footer.html')
    .then(res => res.text())
    .then(data => {
      footer.innerHTML = data;

      // Add live server time updater
      const timeEl = document.getElementById("server-time");
      if (timeEl) {
        setInterval(() => {
          const now = new Date();
          timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }, 1000);
      }

      // Mock users online
      const usersEl = document.getElementById("online-users");
      if (usersEl) {
        usersEl.textContent = `${Math.floor(Math.random() * 50 + 5)} Users Online`;
      }
    });
}

document.addEventListener("DOMContentLoaded", insertLayout);

