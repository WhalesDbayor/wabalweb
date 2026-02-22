const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.IcosahedronGeometry(2.5, 1);
const material = new THREE.MeshPhysicalMaterial({
  color: 0xffffff, metalness: 0.1, roughness: 0.05,
  transmission: 0.95, thickness: 1.5, transparent: true,
  emissive: 0xD4AF37, emissiveIntensity: 0.02
});

const crystal = new THREE.Mesh(geometry, material);
scene.add(crystal);

const pointLight = new THREE.PointLight(0xD4AF37, 2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

camera.position.z = 8;

let isBooking = false;
let isDeepDive = false;

function enterBooking() {
  isBooking = true;
  document.getElementById('hero-ui').classList.add('away');
  animateZoom(3.8);
  setTimeout(() => document.getElementById('booking-vault').classList.add('active'), 600);
}

function exitBooking() {
  if (isDeepDive) { closeDetail(); return; }
  isBooking = false;
  document.getElementById('booking-vault').classList.remove('active');
  document.getElementById('hero-ui').classList.remove('away');
  animateZoom(8);
}

// --- DEEP DIVE LOGIC ---
function openDetail(name, color, price) {
  isDeepDive = true;
  document.getElementById('ritual-title').innerText = name;
  document.getElementById('ritual-price').innerText = price;

  document.getElementById('booking-vault').classList.add('deep-dive');
  document.getElementById('detail-panel').classList.add('active');

  animateZoom(1.8); // Macro Zoom
  crystal.material.emissive.set(color);
  crystal.material.emissiveIntensity = 0.3;
}

function closeDetail() {
  isDeepDive = false;
  document.getElementById('detail-panel').classList.remove('active');
  document.getElementById('booking-vault').classList.remove('deep-dive');

  animateZoom(3.8); // Return to Vault zoom
  crystal.material.emissive.set(0xD4AF37);
  crystal.material.emissiveIntensity = 0.02;
}

function animateZoom(targetZ) {
  const step = () => {
    const diff = targetZ - camera.position.z;
    camera.position.z += diff * 0.06;
    if (Math.abs(diff) > 0.001) requestAnimationFrame(step);
  };
  step();
}

function animate() {
  requestAnimationFrame(animate);
  const rotationSpeed = isDeepDive ? 0.012 : (isBooking ? 0.008 : 0.003);
  crystal.rotation.y += rotationSpeed;
  crystal.rotation.x += rotationSpeed * 0.5;

  if (!isBooking) {
    crystal.position.x += (mouseX - crystal.position.x) * 0.05;
    crystal.position.y += (-mouseY - crystal.position.y) * 0.05;
  } else if (isDeepDive) {
    crystal.position.x += (-2.5 - crystal.position.x) * 0.05; // Offset for panel
  } else {
    crystal.position.x *= 0.9;
    crystal.position.y *= 0.9;
  }
  renderer.render(scene, camera);
}

let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();