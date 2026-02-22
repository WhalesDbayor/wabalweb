// Modal logic for Synchronize Strategy
const syncBtn = document.getElementById('sync-strategy-btn');
const modal = document.getElementById('strategy-modal');
const closeModal = document.getElementById('close-modal');
const modalOk = document.getElementById('modal-ok');
if (syncBtn && modal && closeModal && modalOk) {
  syncBtn.closest('form').addEventListener('submit', function (e) {
    e.preventDefault();
    modal.style.display = 'flex';
  });
  closeModal.addEventListener('click', () => { modal.style.display = 'none'; });
  modalOk.addEventListener('click', () => { modal.style.display = 'none'; });
  // Optional: close modal on overlay click
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
}
// 1. Smooth Scroll (Lenis)
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Custom Cursor
const cursor = document.getElementById('cursor');
window.addEventListener('mousemove', (e) => {
  gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
});

// 3. Three.js Background
let particleSpeed = 0.0005; // Default speed for particle animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('hero-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const particles = new THREE.BufferGeometry();
const count = 3000;
const posArray = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) { posArray[i] = (Math.random() - 0.5) * 1000; }
particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const material = new THREE.PointsMaterial({ size: 1.5, color: 0x00f0ff, transparent: true, opacity: 0.5 });
const mesh = new THREE.Points(particles, material);
scene.add(mesh);
camera.position.z = 400;

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.y += particleSpeed;
  renderer.render(scene, camera);
}
animate();

// 4. Typing Animation Logic
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const typeTexts = document.querySelectorAll(".type-text");

typeTexts.forEach((textElement) => {
  const targetText = textElement.getAttribute("data-text");

  gsap.to(textElement, {
    duration: 1.5,
    text: targetText,
    ease: "none",
    scrollTrigger: {
      trigger: textElement,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    onStart: () => textElement.classList.add("typing-cursor"),
    onComplete: () => textElement.classList.remove("typing-cursor")
  });
});

// 5. Hero Animations
const tl = gsap.timeline();
tl.from(".reveal-text", { y: 150, skewY: 7, opacity: 0, duration: 1.5, ease: "power4.out" })
  .from(".reveal-subtext", { opacity: 0, y: 20, duration: 1 }, "-=1")
  .from(".reveal-btns", { opacity: 0, scale: 0.9, duration: 1 }, "-=0.8");

// 6. Section Scroll In/Out Effects
document.querySelectorAll('section').forEach(section => {
  gsap.fromTo(section,
    { opacity: 0, y: 120, scale: 0.98, filter: 'blur(16px)' },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play reverse play reverse',
        onLeave: () => gsap.to(section, { opacity: 0, y: -120, scale: 0.98, filter: 'blur(16px)', duration: 0.8, ease: 'power4.in' }),
        onEnterBack: () => gsap.to(section, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' })
      }
    }
  );
});

// 3. Page Transition Logic
const initiateBtn = document.getElementById('initiate-btn');
const transitionOverlay = document.getElementById('page-transition');
const mainSite = document.getElementById('main-site');
const portal = document.getElementById('transformation-portal');

if (initiateBtn && transitionOverlay && mainSite && portal) {
  initiateBtn.addEventListener('click', () => {
    const tl = gsap.timeline();

    // Step 1: Accelerate Particles & Slide Overlay Up
    tl.add(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); })
      .to({}, { // Animate particleSpeed using a dummy object
        duration: 1.5,
        onUpdate: function () { particleSpeed = 0.05 * this.progress() + 0.0005 * (1 - this.progress()); },
        ease: "power2.in"
      }, 0)
      .to(transitionOverlay, { transform: "translateY(0%)", duration: 1.2, ease: "expo.inOut" }, 0.2)
      .to(".transition-bar", { width: "100px", duration: 0.8 }, "-=0.2")
      .to(".transition-text", { opacity: 1, duration: 0.4 }, "-=0.4");

    // Step 2: Switch Content Hidden/Visible
    tl.add(() => {
      mainSite.style.display = 'none';
      portal.style.display = 'block';
      particleSpeed = 0.0002; // Reset particle speed for new page
      window.scrollTo({ top: 0, behavior: 'auto' });
    });

    // Step 3: Slide Overlay Away & Reveal New Page
    tl.to(transitionOverlay, { transform: "translateY(-100%)", duration: 1.2, ease: "expo.inOut" })
      .to(portal, { opacity: 1, duration: 1 }, "-=0.8")
      .from("#transformation-portal h2", { y: 50, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.5");
  });
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});