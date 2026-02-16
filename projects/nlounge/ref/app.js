// 1. Initialize Lenis Smooth Scroll
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// 2. Three.js Shimmer Background (Simplified Shader Logic)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#hero-canvas'), alpha: true });

// Particle System
const geometry = new THREE.BufferGeometry();
const vertices = [];
for (let i = 0; i < 5000; i++) {
    vertices.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000));
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const material = new THREE.PointsMaterial({ color: 0xD4AF37, size: 2, transparent: true, opacity: 0.6 });
const points = new THREE.Points(geometry, material);
scene.add(points);
camera.position.z = 500;

function animateThree() {
    requestAnimationFrame(animateThree);
    points.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animateThree();

// 3. GSAP Scroll Animations
gsap.utils.toArray(".stagger-up").forEach(elem => {
    gsap.from(elem, {
        scrollTrigger: {
            trigger: elem,
            start: "top 85%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    });
});

// 4. Custom Cursor Movement
document.addEventListener('mousemove', e => {
    gsap.to(".custom-cursor", {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
});