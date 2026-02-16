// --- 3D INTERACTIVE GRID/MAP ELEMENT ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth / 2, window.innerHeight);
document.getElementById('map-canvas').appendChild(renderer.domElement);

// Create a Topographic Wireframe Grid
const geometry = new THREE.PlaneGeometry(20, 20, 40, 40);
const material = new THREE.MeshBasicMaterial({
  color: 0x1F9CF0,
  wireframe: true,
  transparent: true,
  opacity: 0.2
});
const grid = new THREE.Mesh(geometry, material);
grid.rotation.x = -Math.PI / 2.5;
scene.add(grid);

// Animate the "Terrain"
const animateGrid = () => {
  const positions = grid.geometry.attributes.position.array;
  const time = Date.now() * 0.001;
  for (let i = 0; i < positions.length; i += 3) {
    positions[i + 2] = Math.sin(positions[i] * 0.5 + time) * 0.5;
  }
  grid.geometry.attributes.position.needsUpdate = true;
};

camera.position.z = 8;
camera.position.y = 2;

function animate() {
  requestAnimationFrame(animate);
  animateGrid();
  grid.rotation.z += 0.001;
  renderer.render(scene, camera);
}
animate();

// GSAP Animations
gsap.from(".glass-card", { opacity: 0, x: 50, stagger: 0.2, duration: 1, ease: "power3.out" });
gsap.from("h1", { opacity: 0, y: 30, duration: 1.2, ease: "expo.out" });

// Newly added
function initiateSuccessAnimation() {
  const tl = gsap.timeline();

  // 1. Show the overlay
  tl.to("#success-overlay", {
    opacity: 1,
    pointerEvents: "all",
    duration: 0.5,
    ease: "power2.inOut"
  });

  // 2. Animate the progress bar (The "Encryption" Phase)
  tl.to("#progress-bar", {
    width: "100%",
    duration: 3,
    ease: "none",
    onUpdate: function () {
      const progress = Math.round(this.progress() * 100);
      if (progress > 80) document.getElementById('status-text').innerText = "Bypassing Firewalls...";
      else if (progress > 40) document.getElementById('status-text').innerText = "Establishing Secure Uplink...";
    }
  });

  // 3. Transition to the Success Message
  tl.to("#status-text, #progress-bar", { opacity: 0, duration: 0.5 });
  tl.set("#final-message", { display: "block", opacity: 0 });
  tl.to("#final-message", { opacity: 1, y: -20, duration: 1, ease: "expo.out" });
}

// Function to reset the view
function closeSuccess() {
  gsap.to("#success-overlay", {
    opacity: 0,
    pointerEvents: "none",
    duration: 0.5,
    onComplete: () => {
      location.reload(); // Simple way to reset the form
    }
  });
}

// Attach to the form
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevents page refresh
  initiateSuccessAnimation();
});

// Global Footer Logic
function updateFooterTime() {
  const now = new Date();
  const timeStr = now.toISOString().split('T')[1].split('.')[0];
  const timeContainer = document.getElementById('footer-time');
  if (timeContainer) timeContainer.innerText = `OPERATIONAL UTC: ${timeStr}`;
}
setInterval(updateFooterTime, 1000);
updateFooterTime();

// Footer Scroll Reveal
gsap.from("footer", {
  scrollTrigger: {
    trigger: "footer",
    start: "top 95%",
  },
  opacity: 0,
  y: 20,
  duration: 1.2,
  ease: "power3.out"
});
