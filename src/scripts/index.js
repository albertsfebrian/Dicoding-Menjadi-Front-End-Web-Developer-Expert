import 'regenerator-runtime'; /* for async await transpile */
import DATA from '../DATA.json';
import '../styles/main.scss';

function processData() {
  const restaurant = DATA.restaurants;
  const city = [...new Set(restaurant.map(item => item.city))];
  return { restaurant, city };
}

function renderCityList(cityData) {
  const cityContainer = document.querySelector('#city-list');
  let innerHtml = '';
  cityData.forEach(item => {
    innerHtml += `
      <div class="card" tabindex="0" aria-label="Kota ${item}">
        <div class="card-body">
          <span>${item}</span>
        </div>
      </div>
    `
  })
  cityContainer.innerHTML = innerHtml;
}

function renderRestaurantList(restaurantData) {
  const restaurantContainer = document.querySelector('#restaurant-list');
  let innerHTML = '';
  restaurantData.forEach(item => {
    const { name , description, pictureId, city, rating } = item;
    const altImage = `Foto-${name}`
    innerHTML += `
      <div class="card">
        <div class="card-image">
          <div class="card-location">
            <i class="fas fa-map-marker-alt"></i>
            <span tabindex="0">${city}</span>
          </div>
          <img src=${pictureId} class="card-img-top" alt=${altImage}>
        </div>
        <div class="card-body">
          <h2 class="card-title" tabindex="0">${name}</h2>
          <span tabindex="0">Rating: ${rating}</span>
          <p tabindex="0" class="card-text truncate">${description}</p>
        </div>
      </div>
    `
  })
  restaurantContainer.innerHTML = innerHTML;
}

const { restaurant, city } = processData();
const hamburgerBtn = document.querySelector('#hamburger-btn');
const closeBtn = document.querySelector('#close-btn');
const menuList = document.querySelector('#menu-list');

hamburgerBtn.addEventListener('click', () => {
  menuList.classList.add('open');
})
closeBtn.addEventListener('click', () => {
  menuList.classList.remove('open');
})
renderCityList(city)
renderRestaurantList(restaurant)
