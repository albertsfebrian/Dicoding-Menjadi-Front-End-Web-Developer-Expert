import API_ENDPOINT from '../globals/api-endpoint'

class RestaurantSource {
  static async restaurantList () {
    const response = await fetch(API_ENDPOINT.LIST)
    const responseJson = await response.json()
    return responseJson.restaurants
  }

  static async restaurantDetail (id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id))
    const responseJson = await response.json()
    return responseJson.restaurant
  }

  static async addReview (data) {
    const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const responseJson = await response.json()
    return responseJson
  }
}

export default RestaurantSource
