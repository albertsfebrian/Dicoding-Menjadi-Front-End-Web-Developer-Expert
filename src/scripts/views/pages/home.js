import RestaurantSource from '../../data/restaurant-source'
import { createRestaurantCardTemplate, createSkeletonList } from '../templates/template-creator'

const Home = {
  async render () {
    return `
      <article>
        <span class="title" tabindex="0">Rekomendasi Restoran</span>
        <section id="restaurant-list"></section>
        <section id="restaurant-loading-list">${createSkeletonList(20)}</section>
      </article>
    `
  },

  async afterRender () {
    const loadingContainer = document.querySelector('#restaurant-loading-list')
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
