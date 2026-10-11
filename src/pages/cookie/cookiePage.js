const { BasePage } = require('../basePage');
const { expect } = require('@playwright/test');
const dnbTestErrorMsgs = require('../../test-error-msgs/dnbTestErrorMsgs');

class CookiePage extends BasePage {
  constructor(page) {
    super(page);
    this.acceptAllButton = page.locator('#cookie-popup-acceptAll');
    this.customizeButton = page.locator('#cookie-popup-custom');
    this.acceptNecessaryButton = page.locator('#cookie-popup-strictlyNecessary');
  }

  async waitForCookiePopUp(timeout = 30_000) {
    const methodName = 'CookiePage_waitForCookiePopUp';
    this.logger.info(`${methodName}: waiting for cookie pop up`);
    await this.acceptAllButton.waitFor({ state: 'visible', timeout });
    this.logger.info(`${methodName}: cookie pop up is visible`);
  }

  async assertCookiePopUpIsDisplayed(timeout = 30_000) {
    const methodName = 'CookiePage_assertCookiePopUpIsDisplayed';
    this.logger.info(`${methodName}: verifying cookie pop up is displayed`);
    await expect(this.acceptAllButton, dnbTestErrorMsgs.COOKIE_POP_UP_NOT_DISPLAYED).toBeVisible({ timeout });
    this.logger.info(`${methodName}: cookie pop up is displayed`);
  }

  async assertConsentButtonsAreDisplayed(timeout = 30_000) {
    const methodName = 'CookiePage_assertConsentButtonsAreDisplayed';
    this.logger.info(`${methodName}: verifying consent buttons are displayed`);
    await expect(this.acceptAllButton, dnbTestErrorMsgs.COOKIE_ACCEPT_ALL_NOT_DISPLAYED).toBeVisible({ timeout });
    await expect(this.acceptNecessaryButton, dnbTestErrorMsgs.COOKIE_NECESSARY_ONLY_NOT_DISPLAYED).toBeVisible({ timeout });
    this.logger.info(`${methodName}: accept all and necessary only buttons are displayed`);
  }

  async acceptAll() {
    const methodName = 'CookiePage_acceptAll';
    this.logger.info(`${methodName}: accepting all cookies`);
    await this.acceptAllButton.click();
    await this.acceptAllButton.waitFor({ state: 'hidden' });
    this.logger.info(`${methodName}: accepted all cookies`);
  }

  async acceptNecessary() {
    const methodName = 'CookiePage_acceptNecessary';
    this.logger.info(`${methodName}: accepting necessary cookies only`);
    await this.acceptNecessaryButton.click();
    await this.acceptNecessaryButton.waitFor({ state: 'hidden' });
    this.logger.info(`${methodName}: accepted necessary cookies only`);
  }

  async customize(){
    const methodName = 'CookiePage_customize';
    this.logger.info(`${methodName}: clicking customize`);
    await this.customize.click();
    this.logger.info(`${methodName}: accepting customize`);
  }

 async assertCookiePopUpIsClosed(timeout = 30_000) {
    const methodName = 'CookiePage_assertCookiePopUpIsClosed';
    this.logger.info(`${methodName}: verifying cookie pop up is closed`);
    await expect(this.acceptAllButton, dnbTestErrorMsgs.COOKIE_POP_UP_NOT_DISPLAYED).toBeHidden({ timeout });
    await expect(this.customizeButton, dnbTestErrorMsgs.COOKIE_POP_UP_NOT_DISPLAYED).toBeHidden({ timeout });
    await expect(this.acceptNecessaryButton, dnbTestErrorMsgs.COOKIE_POP_UP_NOT_DISPLAYED).toBeHidden({ timeout });
    this.logger.info(`${methodName}: verified cookie pop up is closed`);
  }

}

module.exports = { CookiePage };
