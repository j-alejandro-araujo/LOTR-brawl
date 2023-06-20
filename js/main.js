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
  addCharacterBio();
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
  addCharacterBio();
}

function prevSlide() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = $slides.length - 1;
  }
  showSlide(currentSlide);
  addCharacterBio();
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

// Character Bio using API
const $characterBioContainer = document.querySelector('.character-bio');

function addCharacterBio() {
  const characterId = $slides[currentSlide].dataset.id;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://the-one-api.dev/v2/character/${characterId}`);
  xhr.responseType = 'json';
  xhr.setRequestHeader('Authorization', 'Bearer 11h7XFXlBURcYxWJr0dh');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const character = xhr.response.docs[0];

        $characterBioContainer.innerHTML = `
          <h3 class="content-titles">${character.name}</h3>
          <p>Race: ${character.race}</p>
          <p>Realm: ${character.realm}</p>
          <p>Gender: ${character.gender}</p>
          <p>Birth: ${character.birth}</p>
          <p>Death: ${character.death}</p>
          <p>Spouse: ${character.spouse}</p>
          <p>Wiki Link: <a href="${character.wikiUrl}" target="_blank">Learn More</a></p>
        `;
      }
    }
  };

  xhr.send();
}
