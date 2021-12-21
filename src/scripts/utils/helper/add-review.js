import RestaurantSource from '../../data/restaurant-source'
import { createRestaurantReview } from '../../views/templates/template-creator'

const AddReview = async ({ id, name, review, reviewContainer }) => {
  const payload = { id, name, review }
  try {
    const { error, customerReviews } = await RestaurantSource.addReview(payload)
    if (error) {
      alert('Terjadi Error Saat Menambahkan Review')
    } else {
      reviewContainer.innerHTML = ''
      customerReviews.forEach((review) => {
        reviewContainer.innerHTML += createRestaurantReview(review)
      })
    }
  } catch (error) {
    alert('Terjadi Error Saat Menambahkan Review')
  }
}

export default AddReview
