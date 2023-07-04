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

$nextBtn.addEventListener('click', () => {
  nextSlide();
});

$prevBtn.addEventListener('click', () => {
  prevSlide();
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
          <h3 class="bio-title">${character.name}</h3>
          <p>Race: ${character.race}</p>
          <p>Realm: ${character.realm}</p>
          <p>Gender: ${character.gender}</p>
          <p>Birth: ${character.birth}</p>
          <p>Death: ${character.death}</p>
          <p>Spouse: ${character.spouse}</p>
          <p>Wiki Link: <a href="${character.wikiUrl}" target="_blank" class="wiki-url">Learn More</a></p>
        `;
      } else {
        $characterBioContainer.innerHTML = 'Sorry for the inconvenience, it appears there is an error.';
      }
    }
  };

  xhr.send();
}

// Location Carousel
const $locationSlides = document.querySelectorAll('.locations-carousel-slides li');
const $locationPrevBtn = document.querySelector('.loc-controls.loc-prev');
const $locationNextBtn = document.querySelector('.loc-controls.loc-next');

let currentLocSlide = 0;

for (let i = 0; i < $locationSlides.length; i++) {
  const slide = $locationSlides[i];
  if (i !== currentLocSlide) {
    slide.style.display = 'none';
  }
}

function showLocationSlide(index) {
  for (let i = 0; i < $locationSlides.length; i++) {
    $locationSlides[i].style.display = 'none';
  }
  $locationSlides[index].style.display = 'block';
  updateLocationInfo($locationSlides[index]);
}

function nextLocationSlide() {
  currentLocSlide++;
  if (currentLocSlide === $locationSlides.length) {
    currentLocSlide = 0;
  }
  showLocationSlide(currentLocSlide);
  addCharacterBio();
}

function prevLocationSlide() {
  currentLocSlide--;
  if (currentLocSlide < 0) {
    currentLocSlide = $locationSlides.length - 1;
  }
  showLocationSlide(currentLocSlide);
  addCharacterBio();
}

$locationNextBtn.addEventListener('click', () => {
  nextLocationSlide();
});

$locationPrevBtn.addEventListener('click', () => {
  prevLocationSlide();
});

const $locationInfoElements = document.querySelectorAll('.location-info li');

function updateLocationInfo(slide) {
  const selectedLocation = slide.querySelector('img').alt.toLowerCase();

  $locationInfoElements.forEach(function (info) {
    const locationName = info.querySelector('p').id.split('-')[0];

    if (locationName === selectedLocation) {
      info.style.display = 'block';
    } else {
      info.style.display = 'none';
    }
  });
}

$locationInfoElements.forEach(function (info, index) {
  if (index !== 0) {
    info.style.display = 'none';
  }
});

// Quote API Function
const $quoteTextElement = document.querySelector('.quote-text');
const $quoteButton = document.querySelector('#quote-btn');

function getRandomQuote() {
  const quotesRequest = new XMLHttpRequest();
  quotesRequest.open('GET', 'https://the-one-api.dev/v2/quote', true);
  quotesRequest.setRequestHeader('Authorization', 'Bearer 11h7XFXlBURcYxWJr0dh');

  quotesRequest.onreadystatechange = function () {
    if (quotesRequest.readyState === 4 && quotesRequest.status === 200) {
      const quotes = JSON.parse(quotesRequest.responseText);
      const quote = quotes.docs[Math.floor(Math.random() * quotes?.docs?.length)];
      const characterId = quote.character;

      const rawCharacterRequest = new XMLHttpRequest();
      rawCharacterRequest.open('GET', `https://the-one-api.dev/v2/character/${characterId}`, true);
      rawCharacterRequest.setRequestHeader('Authorization', 'Bearer 11h7XFXlBURcYxWJr0dh');

      rawCharacterRequest.onreadystatechange = function () {
        if (rawCharacterRequest.readyState === 4 && rawCharacterRequest.status === 200) {
          const character = JSON.parse(rawCharacterRequest.responseText);
          const characterName = character.docs[0].name;
          $quoteTextElement.innerHTML = `${quote.dialog}<br><br><span class="quote-name">- - ${characterName}`;
        }
      };

      rawCharacterRequest.send();
    }
  };

  quotesRequest.send();
}

$quoteButton.addEventListener('click', getRandomQuote);

// GIF Carousel

const $gifPrevButton = document.querySelector('.gif-prev');
const $gifNextButton = document.querySelector('.gif-next');
const $gifSlidesContainer = document.querySelector('.gif-carousel-slides');

const slidesPerView = 3;
const slideWidth = 100 / slidesPerView;

let slideIndex = 0;

function showGifSlide() {
  $gifSlidesContainer.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
}

$gifPrevButton.addEventListener('click', () => {
  if (slideIndex > 0) {
    slideIndex--;
    showGifSlide();
  }
});

$gifNextButton.addEventListener('click', () => {
  const slidesCount = $gifSlidesContainer.children.length;

  if (slideIndex < slidesCount - slidesPerView) {
    slideIndex++;
    showGifSlide();
  }
});
