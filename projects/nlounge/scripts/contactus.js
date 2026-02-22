// --- 3D AMBIENCE (Refining the Crystal for the Contact Theme) ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-canvas'), antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// A slower, more "calm" rotation for the contact page
const crystal = new THREE.Mesh(
  new THREE.IcosahedronGeometry(4, 1),
  new THREE.MeshPhysicalMaterial({
    color: 0xffffff, transmission: 0.9, thickness: 2, transparent: true,
    emissive: 0xD4AF37, emissiveIntensity: 0.08
  })
);
scene.add(crystal);
scene.add(new THREE.PointLight(0xD4AF37, 2).set(5, 5, 5));
camera.position.z = 12;

function animate() {
  requestAnimationFrame(animate);
  crystal.rotation.y += 0.001;
  crystal.rotation.x += 0.0005;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});