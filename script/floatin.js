// Float-in effect for header and project cards from random positions
document.addEventListener('DOMContentLoaded', () => {
    // Helper: random between min and max
    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }
    // Select header and all project cards (including multi-column)
    const header = document.querySelector('header');
    const cards = Array.from(document.querySelectorAll('.project-card'));
    // All elements to animate
    const floatEls = [header, ...cards];
    floatEls.forEach((el, i) => {
        // More pronounced: greater distance, random direction
        const angle = rand(0, 2 * Math.PI);
        const dist = rand(160, 340); // more pronounced
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;
        el.classList.add('float-in');
        el.style.transform = `translate(${x}px, ${y}px) scale(0.92)`;
        el.style.opacity = '0';
    });
    // Animate in sequence, more staggered
    floatEls.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('visible');
            el.style.transform = '';
            el.style.opacity = '';
        }, 300 + i * 180);
    });
});