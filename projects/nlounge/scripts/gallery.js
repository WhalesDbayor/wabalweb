// --- DATA HUB (Easily add more images here) ---
const collections = {
  spa: [
    "images/spa_skincare.jpg",
    "images/relaxation-spa-stones-like-candles3.jpg",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15",
    "https://images.unsplash.com/photo-1596178065887-1198b6148b2b"
  ],
  nails: [
    "https://images.unsplash.com/photo-1604654894610-df63bc536371",
    "images/nail_skincare.jpg",
    "https://images.unsplash.com/photo-1610992015732-2449b76344bc",
    "https://images.unsplash.com/photo-1607779097040-26e80aa78e66"
  ],
  salon: [
    "https://images.unsplash.com/photo-1562322140-8baeececf3df",
    "https://images.unsplash.com/photo-1560869713-7d0a29430803",
    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f",
    "images/beautysalon.jpg"
  ],
  barber: [
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70",
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033",
    "images/barbertools.jpg"
  ]
};

// --- HORIZONTAL SCROLL FIX ---
// Bridges vertical wheel scroll to horizontal movement
const scroller = document.getElementById('scroller-content');
scroller.addEventListener('wheel', (evt) => {
  evt.preventDefault();
  scroller.scrollLeft += evt.deltaY;
}, { passive: false });

// --- INTERACTION ---
function openCollection(title, images) {
  const overlay = document.getElementById('collection-overlay');
  const content = document.getElementById('scroller-content');
  document.getElementById('collection-title').innerText = title;

  content.innerHTML = images.map(src => `<img src="${src}?q=80&w=1400">`).join('');
  overlay.classList.add('active');
  crystal.material.emissiveIntensity = 0.5;
}

function closeCollection() {
  document.getElementById('collection-overlay').classList.remove('active');
  crystal.material.emissiveIntensity = 0.05;
}

// --- 3D AMBIENCE ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-canvas'), antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const crystal = new THREE.Mesh(
  new THREE.IcosahedronGeometry(3, 1),
  new THREE.MeshPhysicalMaterial({
    color: 0xffffff, transmission: 0.9, thickness: 2, transparent: true,
    emissive: 0xD4AF37, emissiveIntensity: 0.05
  })
);
scene.add(crystal);
scene.add(new THREE.PointLight(0xD4AF37, 2).set(5, 5, 5));
camera.position.z = 10;

// --- PARALLAX & ANIMATION ---
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelectorAll('.image-stack').forEach(stack => {
    const speed = parseFloat(stack.dataset.speed);
    stack.style.transform = `translateY(-${y * speed}px)`;
  });
  crystal.rotation.y = y * 0.001;
});

function animate() {
  requestAnimationFrame(animate);
  crystal.rotation.x += 0.001;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});