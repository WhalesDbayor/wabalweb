// Smooth pronounced float-in for hero content
document.addEventListener('DOMContentLoaded', () => {
    const heroEls = document.querySelectorAll('.hero-float-in');
    heroEls.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, 250 + i * 180);
    });
});