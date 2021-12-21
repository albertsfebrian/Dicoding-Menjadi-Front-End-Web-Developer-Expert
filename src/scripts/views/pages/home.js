import RestaurantSource from '../../data/restaurant-source'
import { createRestaurantCardTemplate } from '../templates/template-creator'

const Home = {
  async render () {
    return `
      <article>
        <span class="title" tabindex="0">Rekomendasi Restoran</span>
        <div class="loading-container" id="loading-home"><div class="loader"></div></div>
        <section id="restaurant-list"></section>
      </article>
    `
  },

  async afterRender () {
    const loadingContainer = document.querySelector('#loading-home')
    const restaurantContainer = document.querySelector('#restaurant-list')
    try {
      const restaurant = await RestaurantSource.restaurantList()
      restaurant.forEach((restaurant) => {
        restaurantContainer.innerHTML += createRestaurantCardTemplate(restaurant)
      })
      loadingContainer.style.display = 'none'
    } catch (error) {
      restaurantContainer.innerHTML = `Sorry, failed to fetch data, ${error}`
      loadingContainer.style.display = 'none'
    }
  }
}

export default Home
