const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurant', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada film untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada film untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.waitForElement('.restaurant__name a', 30);
  I.seeElement('.restaurant__name a');
  const firstResto = locate('.restaurant__name a').first();
  const firstRestoName = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.waitForElement('#likeButton', 30);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  const likedRestoName = await I.grabTextFrom('.restaurant__name');
  assert.strictEqual(firstRestoName, likedRestoName);
});

Scenario('searching restaurant', async ({ I }) => {
  I.see('Tidak ada film untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.waitForElement('.restaurant__name a', 30);
  I.seeElement('.restaurant__name a');

  const name = [];

  for (let i = 1; i <= 3; i++) {
    const restaurantLink = locate('.restaurant__name a').at(i);
    const restaurantName = await I.grabTextFrom(restaurantLink);

    I.click(restaurantLink);
    I.waitForElement('#likeButton', 30);
    I.seeElement('#likeButton');
    I.click('#likeButton');

    name.push(restaurantName);
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const searchQuery = name[1].substring(1, 3);
  const matchingRestaurant = name.filter(
    (name) => name.indexOf(searchQuery) !== -1
  );

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleLikedRestaurant = await I.grabNumberOfVisibleElements(
    '.restaurant-item'
  );
  assert.strictEqual(matchingRestaurant.length, visibleLikedRestaurant);

  for (const [index, name] of matchingRestaurant.entries()) {
    const visibleName = await I.grabTextFrom(
      locate('.restaurant__name').at(index + 1)
    );
    assert.strictEqual(name, visibleName);
  }
});
