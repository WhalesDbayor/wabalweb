// --- 3D AMBIENT BACKGROUND ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg-canvas'),
  antialias: true, alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.IcosahedronGeometry(3, 1);
const material = new THREE.MeshPhysicalMaterial({
  color: 0xffffff, transmission: 0.9, thickness: 2, transparent: true,
  emissive: 0xD4AF37, emissiveIntensity: 0.05
});
const crystal = new THREE.Mesh(geometry, material);
scene.add(crystal);

const light = new THREE.PointLight(0xD4AF37, 2);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.2));

camera.position.z = 10;

// --- MODAL LOGIC ---
function openRitual(title, img, tag, dur, price) {
  document.getElementById('m-title').innerText = title;
  document.getElementById('m-tag').innerText = tag;
  document.getElementById('m-dur').innerText = dur;
  document.getElementById('m-price').innerText = price;
  document.getElementById('modal-img').style.backgroundImage = `url(${img})`;

  document.getElementById('services-container').classList.add('blur-out');
  document.getElementById('breakdown-modal').classList.add('active');

  // 3D Reaction
  crystal.material.emissiveIntensity = 0.5;
  crystal.scale.set(1.5, 1.5, 1.5);
}

function closeRitual() {
  document.getElementById('services-container').classList.remove('blur-out');
  document.getElementById('breakdown-modal').classList.remove('active');

  // 3D Reset
  crystal.material.emissiveIntensity = 0.05;
  crystal.scale.set(1, 1, 1);
}

// --- ANIMATION LOOP ---
let targetY = 0; let scrollY = 0;
window.addEventListener('scroll', () => { targetY = window.scrollY; });

function animate() {
  requestAnimationFrame(animate);
  scrollY += (targetY - scrollY) * 0.05;
  crystal.position.y = (scrollY * 0.005);
  crystal.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});