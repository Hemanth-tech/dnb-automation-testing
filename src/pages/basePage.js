const { expect } = require('@playwright/test');
const { mkdir, rm } = require('node:fs/promises');
const { join, resolve } = require('node:path');
const { UtilManager } = require('../helper/util/utilManager');
const dnbTestErrorMsgs = require('../test-error-msgs/dnbTestErrorMsgs');

class BasePage {
  constructor(page) {
    this.page = page;
    this.utilManager = new UtilManager();
    this.logger = this.utilManager.getLogger();
    this.pageHeading = page.locator('h1');
  }

  matchesExpectedUrl(expectedUrl, actualUrl) {
    return actualUrl.origin === expectedUrl.origin && actualUrl.pathname === expectedUrl.pathname;
  }

  async assertSubMenuTitle(expectedTitle, timeout = 20_000) {
    this.logger.info(`${this.constructor.name}_assertSubMenuTitle: verifying ${expectedTitle}`);
    await expect(this.pageHeading, `Submenu heading is not displayed: ${expectedTitle}`).toBeVisible({ timeout });
    await expect(this.pageHeading, `Submenu heading does not match: ${expectedTitle}`).toHaveText(expectedTitle, { timeout });
    this.logger.info(`${this.constructor.name}_assertSubMenuTitle: title matches ${expectedTitle}`);
  }

  async assertUrlIsExpected(expectedPath = this.expectedPath, timeout = 30_000) {
    const configuredUrl = process.env.URL || process.env.BASE_URL;
    if (!configuredUrl || !expectedPath) {
      throw new Error('Set URL or BASE_URL and define expectedPath before asserting the page URL.');
    }

    const expectedUrl = new URL(expectedPath, configuredUrl);
    const methodName = `${this.constructor.name}_assertUrlIsExpected`;
    this.logger.info(`${methodName}: verifying URL ${expectedUrl.origin}${expectedUrl.pathname}`);
    await expect(this.page, `${dnbTestErrorMsgs.PAGE_URL_MISMATCH}: ${expectedUrl.origin}${expectedUrl.pathname}`).toHaveURL(
      this.matchesExpectedUrl.bind(this, expectedUrl),
      { timeout }
    );
    this.logger.info(`${methodName}: expected URL is displayed`);
  }
}

module.exports = { BasePage };
