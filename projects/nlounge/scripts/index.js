// Section background images
const sectionBackgrounds = {
  home: 'url("images/nloungenspa1.png")',
  services: 'url("images/relaxation-spa-stones-like-candles.jpg")',
  gallery: 'url("images/relaxation-spa-stones-like-candles2.jpg")',
  contact: 'url("images/relaxation-spa-stones-like-candles3.jpg")'
};

function switchSection(id) {
  // Update UI
  document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  // Update Dock
  document.querySelectorAll('.dock-item').forEach(d => d.classList.remove('active'));
  const dockItems = document.querySelectorAll('.dock-item');
  dockItems.forEach(d => {
    if (d.textContent.toLowerCase().includes(id)) d.classList.add('active');
  });

  // Set background image
  document.body.style.backgroundImage = sectionBackgrounds[id] || sectionBackgrounds.home;
}

// Set initial background
document.body.style.backgroundImage = sectionBackgrounds.home;