// 1. Particle Background (Consistent with previous pages)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
const vertices = [];
for (let i = 0; i < 5000; i++) {
  vertices.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000));
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const material = new THREE.PointsMaterial({ color: 0x1F9CF0, size: 2, transparent: true, opacity: 0.3 });
const points = new THREE.Points(geometry, material);
scene.add(points);
camera.position.z = 500;

function animate() {
  requestAnimationFrame(animate);
  points.rotation.y += 0.0005;
  renderer.render(scene, camera);
}
animate();

// 2. Targeting Reticle
const rCanvas = document.getElementById('reticle-canvas');
const rRenderer = new THREE.WebGLRenderer({ canvas: rCanvas, antialias: true, alpha: true });
rRenderer.setSize(window.innerWidth, window.innerHeight);
const rScene = new THREE.Scene();
const rCamera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 1, 1000);
rCamera.position.z = 10;
const circleGeo = new THREE.RingGeometry(18, 20, 32);
const circleMat = new THREE.MeshBasicMaterial({ color: 0x1F9CF0, transparent: true, opacity: 0.4 });
const reticle = new THREE.Mesh(circleGeo, circleMat);
rScene.add(reticle);

window.addEventListener('mousemove', (e) => {
  const x = e.clientX - window.innerWidth / 2;
  const y = -e.clientY + window.innerHeight / 2;
  gsap.to(reticle.position, { x, y, duration: 0.4, ease: "power2.out" });

  // Move the preview image slightly with mouse for parallax effect
  gsap.to("#img-preview", {
    x: (e.clientX * 0.02),
    y: (e.clientY * 0.02),
    duration: 1,
    ease: "power3.out"
  });
});

function animateReticle() {
  requestAnimationFrame(animateReticle);
  reticle.rotation.z += 0.01;
  rRenderer.render(rScene, rCamera);
}
animateReticle();

// 3. Smooth Image Preview & Glow Logic
const rows = document.querySelectorAll('.service-row');
const preview = document.getElementById('img-preview');
const targetImg = document.getElementById('target-img');

rows.forEach(row => {
  row.addEventListener('mouseenter', () => {
    const imgUrl = row.getAttribute('data-img');
    targetImg.src = imgUrl;
    preview.classList.add('preview-active');

    // animate opacity/scale only — keep positional transform stable
    gsap.to(preview, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power4.out"
    });
  });

  row.addEventListener('mouseleave', () => {
    preview.classList.remove('preview-active');
    gsap.to(preview, {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: "power4.in",
      onComplete: () => gsap.set(preview, { x: 0, y: 0 })
    });
  });
});

// 4. Header Animation
gsap.to("#header-title", { opacity: 1, y: -20, duration: 1.5, ease: "power4.out", delay: 0.3 });

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