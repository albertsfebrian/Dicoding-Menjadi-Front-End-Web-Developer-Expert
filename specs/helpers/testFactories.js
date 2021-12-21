import LikeButtonPresenter from '../../src/scripts/utils/presenter/like-button-presenter'
import FavoriteRestaurantIdb from '../../src/scripts/data/favorite-restaurant-idb'

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    restaurant,
    favoriteRestaurantsIdb: FavoriteRestaurantIdb
  })
}

export { createLikeButtonPresenterWithRestaurant }
