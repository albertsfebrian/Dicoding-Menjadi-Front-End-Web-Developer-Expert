import CONFIG from '../../globals/config'
import { categoryStringGenerator } from '../../utils/helper/category-generator'

export const createRestaurantCardTemplate = (restaurant) => {
  const { id, name, description, pictureId, city, rating } = restaurant
  const imageUrl = `${CONFIG.BASE_IMAGE_URL_SMALL}${pictureId}`
  const altImage = `Foto-${name}`

  return `
    <div class="card">
      <a href="#/detail/${id}">
        <div class="card-image">
          <div class="card-location">
            <i class="fas fa-map-marker-alt"></i>
            <span tabindex="0">${city}</span>
          </div>
          <img crossorigin="anonymous" src=${imageUrl} class="card-img-top" alt=${altImage}>
        </div>
        <div class="card-body">
          <span class="card-title" tabindex="0">${name}</span>
          <span tabindex="0">Rating: ${rating}</span>
          <p tabindex="0" class="card-text truncate">${description}</p>
        </div>
      </a>
    </div>
  `
}

export const createRestaurantDetail = (restaurant) => {
  const { name, description, pictureId, address, city, rating, categories } = restaurant
  const imageUrl = `${CONFIG.BASE_IMAGE_URL_LARGE}${pictureId}`
  const altImage = `Foto-${name}`
  const category = categoryStringGenerator(categories)

  return `
    <img crossorigin="anonymous" src=${imageUrl} alt=${altImage}>
    <span class="title" tabindex="0">${name}</span>
    <div class="card">
      <div class="card-body">
        <p tabindex="0"><b>Rating:</b> ${rating}</p>
        <p tabindex="0"><b>Kategori:</b> ${category}</p>
        <p tabindex="0"><b>Lokasi:</b> ${address}, ${city}</p>
        <p tabindex="0"><b>Deskripsi: </b></p>
        <p tabindex="0">${description}</p>
      </div>
    </div>        
  `
}

export const createRestaurantMenuCard = (foodName) => {
  return `
    <div class="card" tabindex="0" aria-label=${foodName}>
      <div class="card-body">
        <span>${foodName}</span>
      </div>
    </div>    
  `
}

export const createRestaurantReview = (reviewItem) => {
  const { name, review, date } = reviewItem
  return `
    <div class="card" tabindex="0">
      <div class="card-body">
        <span class="card-title" tabindex="0">${name}</span>
        <p tabindex="0">${review}</p>
        <p tabindex="0" class="review-date">${date}</p>
      </div>
    </div>
  `
}

export const createLikeButton = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like-button">
    <i class="far fa-heart fa-2x"></i>
  </button>
`

export const createLikedButton = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like-button">
    <i class="fas fa-heart fa-2x"></i>
  </button>
`
