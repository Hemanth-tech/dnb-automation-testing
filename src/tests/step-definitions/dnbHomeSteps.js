const { Given, When, Then } = require('@cucumber/cucumber');

When('User navigates to DNB Home Page', { timeout: 100_000 }, async function () {
  await this.poManager.getDNBHomePage().goTo();
});

Given('User launches DNB home page', { timeout: 100_000 }, async function () {
  await this.poManager.getDNBHomePage().goTo();
});

Then('User cannot click the menu before cookie acceptance', async function () {
  await this.poManager.getDNBHomePage().assertMenuIsBlockedByCookieBanner();
});

When('User opens the menu after cookie acceptance', async function () {
  await this.poManager.getDNBHomePage().openMenu();
});

Then('User sees the home page menu items', async function () {
  await this.poManager.getDNBHomePage().assertMenuItemsAreDisplayed();
});