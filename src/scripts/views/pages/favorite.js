import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb'
import { createRestaurantCardTemplate } from '../templates/template-creator'

const Favorite = {
  async render () {
    return `
      <article>
        <span class="title" tabindex="0">Restoran Favorit Kamu</span>
        <section id="restaurant-list"></section>
      </article>
    `
  },

  async afterRender () {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants()
    const restaurantContainer = document.querySelector('#restaurant-list')
    if (restaurants.length === 0) {
      restaurantContainer.innerHTML = 'Kamu belum mempunyai restoran favorit'
    } else {
      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML += createRestaurantCardTemplate(restaurant)
      })
    }
  }
}

export default Favorite
