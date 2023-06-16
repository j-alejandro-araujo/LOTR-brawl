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
