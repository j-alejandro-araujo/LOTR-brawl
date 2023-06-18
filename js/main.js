// Mobile Dropdown Menu
const $navLinks = document.querySelector('#nav-links');
const $navBars = document.querySelector('#nav-bars');

document.addEventListener('DOMContentLoaded', function () {

  function navDropdown() {
    if ($navLinks.style.display === 'none') {
      $navLinks.style.display = 'block';
    } else {
      $navLinks.style.display = 'none';
    }
  }

  $navBars.addEventListener('click', navDropdown);
  $navLinks.style.display = 'none';
  $navLinks.addEventListener('click', navDropdown);
  $navLinks.style.display = 'none';

  hideImage();
});

// Modal Functionality
const $modal = document.querySelector('.modal-container');
const $cancelButton = document.querySelector('#cancel');
const $confirmButton = document.querySelector('#confirm');
const $signButton = document.querySelector('#sign-button');

const openModal = function () {
  $modal.classList.remove('hidden');
};

$signButton.addEventListener('click', openModal);

const closeModal = function () {
  $modal.classList.add('hidden');
};

$cancelButton.addEventListener('click', closeModal);
$confirmButton.addEventListener('click', closeModal);

// Hide About-Us Image
const $aboutImage = document.querySelector('.about-us-image');

function hideImage() {
  if (window.innerWidth <= 768) {
    $aboutImage.style.display = 'none';
  } else {
    $aboutImage.style.display = 'flex';
  }
}

window.addEventListener('resize', function () {
  hideImage();
});

// Character Carousel Functionality
const $slides = document.querySelectorAll('.character-carousel-slides li');
const $prevBtn = document.querySelector('.controls.prev');
const $nextBtn = document.querySelector('.controls.next');

let currentSlide = 0;

for (let i = 0; i < $slides.length; i++) {
  const slide = $slides[i];
  if (i !== currentSlide) {
    slide.style.display = 'none';
  }
}

function showSlide(index) {
  for (let i = 0; i < $slides.length; i++) {
    $slides[i].style.display = 'none';
  }
  $slides[index].style.display = 'block';
}

function nextSlide() {
  currentSlide++;
  if (currentSlide === $slides.length) {
    currentSlide = 0;
  }
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = $slides.length - 1;
  }
  showSlide(currentSlide);
}

let interval = setInterval(nextSlide, 5000);

$nextBtn.addEventListener('click', () => {
  nextSlide();
  clearInterval(interval);
  interval = setInterval(nextSlide, 5000);
});

$prevBtn.addEventListener('click', () => {
  prevSlide();
  clearInterval(interval);
  interval = setInterval(nextSlide, 5000);
});
