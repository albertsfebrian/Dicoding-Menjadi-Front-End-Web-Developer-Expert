const assert = require('assert')

const urlHome = '/'
const input = {
  name: 'Meong',
  review: 'Sangat direkomendasikan'
}

Feature('Restaurant Review')

Before(({ I }) => {
  I.amOnPage(urlHome)
})

Scenario('should perform correctly when giving a review', async ({ I }) => {
  I.seeElement('.card a')
  const firstCard = locate('.card a').first()
  I.click(firstCard)

  I.seeElement('#input-name')
  I.seeElement('#input-review')
  I.seeElement('#add-review')

  I.fillField('#input-name', input.name)
  I.fillField('#input-review', input.review)
  I.click('#add-review')

  const latestReview = locate('#restaurant-reviews .card-title').last()
  const reviewerName = await I.grabTextFrom(latestReview)

  assert.strictEqual(input.name, reviewerName)
})
