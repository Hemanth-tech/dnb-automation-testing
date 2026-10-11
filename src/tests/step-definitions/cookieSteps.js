const { When, Then } = require('@cucumber/cucumber');

Then('User sees the cookie banner', async function () {
  await this.poManager.getCookiePage().assertCookiePopUpIsDisplayed();
});

Then('User sees accept all and necessary only buttons in the cookie banner', async function () {
  await this.poManager.getCookiePage().assertConsentButtonsAreDisplayed();
});

When('User accepts {string} cookies', async function (consent) {
  const cookiePage = this.poManager.getCookiePage();
  if (consent === 'all') {
    await cookiePage.acceptAll();
  } else if (consent === 'necessary only') {
    await cookiePage.acceptNecessary();
  } else {
    throw new Error(`Unsupported cookie consent choice: ${consent}`);
  }
});

Then('User verifies the cookie banner is closed', async function () {
  await this.poManager.getCookiePage().assertCookiePopUpIsClosed();
});