const assert = require('assert');

const emptyWording = 'Kamu belum mempunyai restoran favorit';
const urlFavorite = '/#/favorite';
const urlHome = '/';

Feature('Restaurant Favorite');

Before(({ I }) => {
  I.amOnPage(urlFavorite);
});

Scenario('showing empty favorite restaurant', ({ I }) => {
  I.seeElement('#restaurant-list');
  I.see(emptyWording, '#restaurant-list');
});

Scenario('should perform correctly for like and unlike a restaurant', async ({ I }) => {
  //Like Process
  I.see(emptyWording, '#restaurant-list');
  I.amOnPage(urlHome);
  I.seeElement('.card a');
  const firstCard = locate('.card a').first();
  const firstCardTitle = locate('.card-title').first();
  const firstCardTitleText = await I.grabTextFrom(firstCardTitle);
  I.click(firstCard);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage(urlFavorite);
  I.seeElement('.card a');
  const favoriteCard = locate('.card a')
  const favoriteRestaurantTitle = await I.grabTextFrom('.card-title');

  assert.strictEqual(firstCardTitleText, favoriteRestaurantTitle);

  //Unlike Proccess
  I.click(favoriteCard);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage(urlFavorite);
  I.seeElement('#restaurant-list');
  I.see(emptyWording, '#restaurant-list');
});

