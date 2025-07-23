document.addEventListener("DOMContentLoaded", () => {
  // Inject base styles
  const style = document.createElement("style");
  style.innerHTML = `
    .main-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    #sidebar {
      position: fixed;
      top: 0;
      left: -250px;
      width: 250px;
      height: 100%;
      background-color: var(--sidebar-bg, #222);
      color: var(--sidebar-color, #fff);
      padding: 1rem;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
      transition: left 0.3s ease;
      z-index: 1000;
    }

    #sidebar.open {
      left: 0;
    }

    #sidebar-toggle {
      position: fixed;
      top: 1rem;
      left: 1rem;
      background-color: var(--accent, #8e44ad);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      z-index: 1100;
    }

    #submit-dropdown {
      display: none;
      position: absolute;
      top: 100%;
      right: 0;
      background-color: var(--dropdown-bg, #fff);
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 0.5rem;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      z-index: 100;
    }

    #submit-dropdown.show {
      display: block;
    }

    #submit-button {
      position: relative;
      background-color: var(--accent, #8e44ad);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
    }

    #submit-dropdown a {
      display: block;
      color: #333;
      text-decoration: none;
      padding: 0.25rem 0.5rem;
    }

    #submit-dropdown a:hover {
      background-color: #f0f0f0;
    }

    .server-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: var(--info-bg, #f5f5f5);
      padding: 0.5rem 1rem;
      border-bottom: 1px solid #ccc;
      font-size: 0.9rem;
      color: #555;
    }
  `;
  document.head.appendChild(style);

  // Sidebar toggle
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  // Submit dropdown
  const submitButton = document.getElementById("submit-button");
  const submitDropdown = document.getElementById("submit-dropdown");
  if (submitButton && submitDropdown) {
    submitButton.addEventListener("click", (e) => {
      e.stopPropagation();
      submitDropdown.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!submitDropdown.contains(e.target) && e.target !== submitButton) {
        submitDropdown.classList.remove("show");
      }
    });
  }

  // Fake users online
  const usersOnline = document.getElementById("users-online");
  if (usersOnline) {
    const fakeOnline = Math.floor(Math.random() * 1000) + 100;
    usersOnline.textContent = `${fakeOnline} users online`;
  }

  // Server time
  const serverTime = document.getElementById("server-time");
  if (serverTime) {
    function updateTime() {
      const now = new Date();
      const formatted = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      serverTime.textContent = `Server Time: ${formatted}`;
    }
    updateTime();
    setInterval(updateTime, 60000);
  }

  // Theme switching
  const theme = localStorage.getItem("theme") || "fire-vault";
  const stylesheet = document.getElementById("theme-stylesheet");
  if (stylesheet) {
    stylesheet.href = `${window.location.origin}${window.location.pathname.split('/').slice(0, 2).join('/')}/assets/css/themes/${theme}.css`;
  }

  const themeSelect = document.getElementById("theme-selector");
  if (themeSelect) {
    themeSelect.value = theme;
    themeSelect.addEventListener("change", () => {
      const selectedTheme = themeSelect.value;
      localStorage.setItem("theme", selectedTheme);
      if (stylesheet) {
        stylesheet.href = `/assets/css/themes/${selectedTheme}.css`;
      }
    });
  }
});
