lucide.createIcons();
let current = 0; // Track current slide index

// Background Animation (Same logic for continuity)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function animate() {
  ctx.fillStyle = 'rgba(2, 2, 5, 0.1)';
  ctx.fillRect(0, 0, width, height);

  // Simplified constant pulse for the tour
  let time = Date.now() * 0.001;
  let x = width / 2 + Math.sin(time) * 100;
  let y = height / 2 + Math.cos(time) * 50;

  let g = ctx.createRadialGradient(x, y, 0, x, y, 400);
  g.addColorStop(0, 'rgba(74, 158, 255, 0.1)');
  g.addColorStop(1, 'transparent');

  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, 400, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
resize();
animate();

// Slider Logic
function goTo(index) {
  // current = index;
  const wrapper = document.getElementById('master-slide');
  const dots = document.querySelectorAll('.dot');

  wrapper.style.transform = `translateX(-${index * 100}vw)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Mousewheel navigation
window.addEventListener('wheel', (e) => {
  if (e.deltaY > 0) {
    current = Math.min(2, current + 1);
    goTo(current);
  } else if (e.deltaY < 0) {
    current = Math.max(0, current - 1);
    goTo(current);
  }
});

function triggerWarp() {
  const warpCanvas = document.getElementById('warp-canvas');
  const shutter = document.getElementById('transition-shutter');
  const ctx = warpCanvas.getContext('2d');

  warpCanvas.style.opacity = "1";
  let speed = 0;
  let stars = [];

  // Create star field
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * window.innerWidth - window.innerWidth / 2,
      y: Math.random() * window.innerHeight - window.innerHeight / 2,
      z: Math.random() * window.innerWidth
    });
  }

  function animateWarp() {
    ctx.fillStyle = "rgba(2, 2, 5, 0.2)"; // Trail effect
    ctx.fillRect(0, 0, warpCanvas.width, warpCanvas.height);

    ctx.strokeStyle = "white";
    speed += 0.5; // Accelerate

    stars.forEach(s => {
      s.z -= speed;
      if (s.z <= 1) s.z = window.innerWidth;

      let x = (s.x / s.z) * window.innerWidth + window.innerWidth / 2;
      let y = (s.y / s.z) * window.innerHeight + window.innerHeight / 2;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + (s.x / s.z) * speed, y + (s.y / s.z) * speed);
      ctx.stroke();
    });

    if (speed < 40) {
      requestAnimationFrame(animateWarp);
    } else {
      // Flash and Switch
      shutter.style.opacity = "1";
      setTimeout(() => {
        // REDIRECT OR SHOW FORGE PAGE HERE
        window.location.href = "creationforge.html";
      }, 400);
    }
  }
  // window.location.href='creationforge.html';

  warpCanvas.width = window.innerWidth;
  warpCanvas.height = window.innerHeight;
  animateWarp();
}