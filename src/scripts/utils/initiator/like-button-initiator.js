import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb'
import { createLikeButton, createLikedButton } from '../../views/templates/template-creator'

const LikeButtonInitiator = {
  async init ({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer
    this._restaurant = restaurant

    await this._renderButton()
  },

  async _renderButton () {
    const { id } = this._restaurant

    if (await this._isRestaurantExist(id)) {
      this._renderLiked()
    } else {
      this._renderLike()
    }
  },

  async _isRestaurantExist (id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id)
    return !!restaurant
  },

  _renderLike () {
    this._likeButtonContainer.innerHTML = createLikeButton()

    const likeButton = document.querySelector('#likeButton')
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurant)
      this._renderButton()
    })
  },

  _renderLiked () {
    this._likeButtonContainer.innerHTML = createLikedButton()

    const likeButton = document.querySelector('#likeButton')
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id)
      this._renderButton()
    })
  }
}

export default LikeButtonInitiator
