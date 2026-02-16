// 1. Three.js Particle Background Logic
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
const vertices = [];
for (let i = 0; i < 6000; i++) {
  vertices.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000));
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const material = new THREE.PointsMaterial({ color: 0x1F9CF0, size: 1.5, transparent: true, opacity: 0.4 });
const points = new THREE.Points(geometry, material);
scene.add(points);
camera.position.z = 500;

function animate() {
  requestAnimationFrame(animate);
  points.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animate();

// 2. GSAP Smooth Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Entrance
gsap.from("#hero-title", { y: 100, opacity: 0, duration: 1.2, ease: "power4.out" });
gsap.from("#hero-para", { y: 50, opacity: 0, duration: 1, delay: 0.4 });

// Scrolling Background Text
gsap.to("#scroll-text", {
  scrollTrigger: { trigger: "body", start: "top top", scrub: 2 },
  x: -400
});

// Image Reveal Animation
const revealTL = gsap.timeline({
  scrollTrigger: { trigger: "#reveal-trigger", start: "top 70%" }
});
revealTL.to("#overlay", { x: "100%", duration: 1.2, ease: "expo.inOut" })
  .to("#main-img", { scale: 1, duration: 2, ease: "expo.out" }, "-=0.8");

// Value Cards Slide-in
gsap.from(".value-card", {
  scrollTrigger: { trigger: "#cards-container", start: "top 85%" },
  x: 100,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  ease: "power2.out"
});

// Window Resize Handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
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