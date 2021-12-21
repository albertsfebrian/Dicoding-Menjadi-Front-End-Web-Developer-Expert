import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb'
import * as TestFactories from './helpers/testFactories'

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>'
}

const restaurantMock = {
  id: 1
}

describe('Liking A Restaurant', () => {
  beforeEach(() => {
    addLikeButtonContainer()
  })

  it('should display like button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant(restaurantMock)
    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy()
  })

  it('should not display unlike button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant(restaurantMock)
    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy()
  })

  it('should be able to like the restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant(restaurantMock)
    document.querySelector('#likeButton').dispatchEvent(new Event('click'))
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1)
    expect(restaurant).toEqual(restaurantMock)
    FavoriteRestaurantIdb.deleteRestaurant(1)
  })

  it('should not add a restaurant when its already been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant(restaurantMock)
    await FavoriteRestaurantIdb.putRestaurant(restaurantMock)
    document.querySelector('#likeButton').dispatchEvent(new Event('click'))
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([restaurantMock])
    FavoriteRestaurantIdb.deleteRestaurant(1)
  })

  it('should not add a restaurant when it has no restaurant id', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({})
    document.querySelector('#likeButton').dispatchEvent(new Event('click'))
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([])
  })
})
