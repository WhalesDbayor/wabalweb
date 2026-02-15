// 1. SCROLL REVEAL ANIMATION
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 2. THREE.JS-LIKE BACKGROUND CANVAS (Simple particle drift)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.1
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        p.y -= p.speed;
        if (p.y < 0) p.y = canvas.height;
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();

// Welcome banner fade-out after 10s
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('welcome-banner');
    if (banner) {
        setTimeout(() => {
            banner.classList.add('exit');
            setTimeout(() => banner.remove(), 800); // wait for animation to complete
        }, 10000); // 10 seconds
    }
});

// Page enter animation
document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => document.body.classList.add('page-ready'));
    // Auto-update year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
});

// Smooth page-exit for same-origin links
document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('javascript:')) return;
    try {
        const url = new URL(href, location.href);
        if (url.origin !== location.origin) return; // external link - let it behave normally
        e.preventDefault();
        document.body.classList.add('page-exit');
        setTimeout(() => { location.href = url.href; }, 420);
    } catch (err) {
        // malformed URL - ignore
    }
});