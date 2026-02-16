const slides = document.querySelectorAll('.carousel-slide');
let currentIndex = 0;

function nextSlide() {
  // Remove active class from current
  slides[currentIndex].classList.remove('active');

  // Increment index
  currentIndex = (currentIndex + 1) % slides.length;

  // Add active class to next
  slides[currentIndex].classList.add('active');
}

// Change image every 5 seconds
setInterval(nextSlide, 5000);