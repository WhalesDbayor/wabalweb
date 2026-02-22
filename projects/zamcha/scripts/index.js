// Initialize Icons
lucide.createIcons();

// Canvas Background Animation
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let ripples = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

class Ripple {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.r = 0;
    this.dr = Math.random() * 1 + 0.5;
    this.opacity = 0;
    this.maxOpacity = Math.random() * 0.3 + 0.1;
  }
  update() {
    this.r += this.dr;
    if (this.r < 200) this.opacity += 0.002;
    else if (this.r > 400) this.opacity -= 0.001;

    if (this.opacity <= 0 && this.r > 400) this.reset();
  }
  draw() {
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
    gradient.addColorStop(0, `rgba(74, 158, 255, 0)`);
    gradient.addColorStop(0.8, `rgba(112, 0, 255, ${this.opacity * 0.5})`);
    gradient.addColorStop(1, `rgba(74, 158, 255, 0)`);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

function init() {
  resize();
  for (let i = 0; i < 3; i++) {
    setTimeout(() => ripples.push(new Ripple()), i * 3000);
  }
  animate();
}

function animate() {
  ctx.fillStyle = 'rgba(2, 2, 5, 0.15)';
  ctx.fillRect(0, 0, width, height);

  ripples.forEach(r => {
    r.update();
    r.draw();
  });
  requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
init();

// Parallax Mouse Effect
document.addEventListener('mousemove', (e) => {
  const moveX = (e.clientX - width / 2) / 100;
  const moveY = (e.clientY - height / 2) / 100;
  document.querySelector('.hero').style.transform =
    `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
});

function startTour() {
  const content = document.getElementById('landing-content'); // Wrap your nav, hero, and footer in this ID
  const body = document.body;

  // 1. Apply the visual zoom
  content.classList.add('zoom-out-effect');
  body.classList.add('warp-active');

  // 2. Wait for animation to peak, then redirect
  setTimeout(() => {
    window.location.href = "taketour.html";
  }, 750);
}