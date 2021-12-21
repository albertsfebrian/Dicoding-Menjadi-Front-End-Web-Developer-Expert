import { createLikeButton, createUnlikeButton } from '../../views/templates/template-creator'

const LikeButtonPresenter = {
  async init ({ likeButtonContainer, favoriteRestaurantsIdb, restaurant }) {
    this._likeButtonContainer = likeButtonContainer
    this._restaurant = restaurant
    this._favoriteRestaurantsIdb = favoriteRestaurantsIdb

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
    const restaurant = await this._favoriteRestaurantsIdb.getRestaurant(id)
    return !!restaurant
  },

  _renderLike () {
    this._likeButtonContainer.innerHTML = createLikeButton()

    const likeButton = document.querySelector('#likeButton')
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurantsIdb.putRestaurant(this._restaurant)
      this._renderButton()
    })
  },

  _renderLiked () {
    this._likeButtonContainer.innerHTML = createUnlikeButton()

    const likeButton = document.querySelector('#likeButton')
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurantsIdb.deleteRestaurant(this._restaurant.id)
      this._renderButton()
    })
  }
}

export default LikeButtonPresenter
