import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb'
import * as TestFactories from './helpers/testFactories'

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>'
}

const restaurantMock = {
  id: 1
}

describe('Unliking A Restaurant', () => {
  beforeEach(async () => {
    addLikeButtonContainer()
    await FavoriteRestaurantIdb.putRestaurant(restaurantMock)
  })

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1)
  })

  it('should display unlike button when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant(restaurantMock)
    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy()
  })

  it('should not display like button when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant(restaurantMock)
    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy()
  })

  it('should be able to remove liked restaurant from the idb', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant(restaurantMock)
    document.querySelector('#likeButton').dispatchEvent(new Event('click'))
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([])
  })

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant(restaurantMock)
    await FavoriteRestaurantIdb.deleteRestaurant(1)
    document.querySelector('#likeButton').dispatchEvent(new Event('click'))
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([])
  })

  it('should not remove any restaurant when it has no restaurant id', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({})
    await FavoriteRestaurantIdb.putRestaurant(restaurantMock)
    document.querySelector('#likeButton').dispatchEvent(new Event('click'))
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([restaurantMock])
    FavoriteRestaurantIdb.deleteRestaurant(1)
  })
})
