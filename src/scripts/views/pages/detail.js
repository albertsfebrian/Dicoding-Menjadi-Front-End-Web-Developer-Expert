import UrlParser from '../../routes/url-parser'
import RestaurantSource from '../../data/restaurant-source'
import { createMenuSectionLoader, createRestaurantDetail, createRestaurantDetailLoader, createRestaurantMenuCard, createRestaurantReview, createReviewSectionLoader } from '../templates/template-creator'
import AddReview from '../../utils/helper/add-review'
import LikeButtonPresenter from '../../utils/presenter/like-button-presenter'
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb'

const Detail = {
  async render () {
    return `
      <article>
        <div id="likeButtonContainer"></div>
        <section id="restaurant-detail"></section>
        <section id="loading-restaurant-detail">${createRestaurantDetailLoader()}</section>
        <section id="foods-section">
          <span class="title" tabindex="0">Menu Makanan</span>
          <div class="restaurant-menu" id="restaurant-foods"></div>
        </section>
        <section class="loading-menu-section" id="loading-foods">${createMenuSectionLoader('Menu Makanan', 10)}</section>
        <section id="drinks-section">
          <span class="title" tabindex="0">Menu Minuman</span>
          <div class="restaurant-menu" id="restaurant-drinks"></div>
        </section>
        <section class="loading-menu-section" id="loading-drinks">${createMenuSectionLoader('Menu Minuman', 10)}</section>
        <section id="reviews-section">
          <span class="title" tabindex="0">Review</span>
          <div class="restaurant-review" id="restaurant-reviews"></div>
        </section>
        <section id="loading-reviews-section">${createReviewSectionLoader(10)}</section>
        <section id="add-review-section">
          <span class="title" tabindex="0">Add Your Review</span>
          <div class="card">
            <div class="card-body">
              <form>
                <div class="input-form-group">
                  <label for="name">Name</label>
                  <input type="text" name="name" id="input-name">
                </div>
                <div class="input-form-group">
                  <label for="review">Review</label>
                  <input type="text" name="review" id="input-review">
                </div>
                <button type="submit" id="add-review">Add Review</button>
              </form>
            </div>
          </div>
        </section>
      </article>
    `
  },

  disableLoader () {
    document.querySelector('#loading-restaurant-detail').style.display = 'none'
    document.querySelector('#loading-foods').style.display = 'none'
    document.querySelector('#loading-drinks').style.display = 'none'
    document.querySelector('#loading-reviews-section').style.display = 'none'
  },

  disableContent () {
    document.querySelector('#foods-section').style.display = 'none'
    document.querySelector('#drinks-section').style.display = 'none'
    document.querySelector('#reviews-section').style.display = 'none'
    document.querySelector('#add-review-section').style.display = 'none'
  },

  async afterRender () {
    const url = UrlParser.parseActiveUrlWithoutCombiner()
    const restaurantDetailContainer = document.querySelector('#restaurant-detail')
    const restaurantFoodsContainer = document.querySelector('#restaurant-foods')
    const restaurantDrinksContainer = document.querySelector('#restaurant-drinks')
    const restaurantReviewContainer = document.querySelector('#restaurant-reviews')

    try {
      const restaurant = await RestaurantSource.restaurantDetail(url.id)
      const { menus, customerReviews } = restaurant
      const { foods, drinks } = menus
      restaurantDetailContainer.innerHTML = createRestaurantDetail(restaurant)
      foods.forEach((food) => {
        restaurantFoodsContainer.innerHTML += createRestaurantMenuCard(food.name)
      })
      drinks.forEach((drink) => {
        restaurantDrinksContainer.innerHTML += createRestaurantMenuCard(drink.name)
      })
      customerReviews.forEach((review) => {
        restaurantReviewContainer.innerHTML += createRestaurantReview(review)
      })
      this.disableLoader()

      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: restaurant,
        favoriteRestaurantsIdb: FavoriteRestaurantIdb
      })

      const buttonSubmit = document.querySelector('#add-review')
      const name = document.querySelector('#input-name')
      const review = document.querySelector('#input-review')

      buttonSubmit.addEventListener('click', (e) => {
        e.preventDefault()
        if (name.value === '' || review.value === '') {
          alert('Nama dan Review harus dilengkapi')
        } else {
          AddReview({
            id: url.id,
            name: name.value,
            review: review.value,
            reviewContainer: restaurantReviewContainer
          })
          name.value = ''
          review.value = ''
        }
      })
    } catch (error) {
      restaurantDetailContainer.innerHTML = `Sorry, failed to fetch data, ${error}`
      this.disableContent()
      this.disableLoader()
    }
  }
}

export default Detail
