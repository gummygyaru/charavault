document.addEventListener('DOMContentLoaded', () => {
  const sidebarButtons = document.querySelectorAll('.manage-sidebar button[data-panel]');
  const panels = document.querySelectorAll('.manage-panel');

  function activatePanel(panelId) {
    panels.forEach(panel => {
      panel.classList.toggle('active', panel.id === panelId);
    });

    sidebarButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.panel === panelId);
    });
  }

  sidebarButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetPanel = button.dataset.panel;
      activatePanel(targetPanel);
    });
  });

  // Optional: activate first panel by default on load
  if (sidebarButtons.length > 0) {
    activatePanel(sidebarButtons[0].dataset.panel);
  }
});

