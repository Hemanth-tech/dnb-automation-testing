const { BasePage } = require('../basePage');
const { expect, errors } = require('@playwright/test');
const dnbTestErrorMsgs = require('../../test-error-msgs/dnbTestErrorMsgs');

class DNBHomePage extends BasePage {
  constructor(page) {
    super(page);
    this.menuButton = page.locator('#menu-button');
    this.searchIcon = page.locator('a[href="/sok"]');
    this.navigation = page.locator('#navigation');
    this.privateTab = this.navigation.locator('button[role="tab"][data-tab-key="private-0"]');
    this.businessTab = this.navigation.locator('button[role="tab"][data-tab-key="corporate-1"]');
    this.becomeCustomerTab = this.navigation.locator('button[role="tab"][data-tab-key="private-2"]');
    this.loansLink = this.navigation.locator('a[title="Lån"]');
    this.savingsLink = this.navigation.locator('a[title="Sparing"]');
    this.insuranceLink = this.navigation.locator('a[title="Forsikring"]');
    this.pensionLink = this.navigation.locator('a[title="Pensjon"]');
    this.kortLink = this.navigation.locator('a[title="Kort"]');
  }

  async openSearch() {
    this.logger.info('DNBHomePage_openSearch: opening search page');
    await this.searchIcon.click();
    this.logger.info('DNBHomePage_openSearch: clicked search icon');
  }

  async assertMenuIsBlockedByCookieBanner(timeout = 2_000) {
    const methodName = 'DNBHomePage_assertMenuIsBlockedByCookieBanner';
    this.logger.info(`${methodName}: verifying menu is blocked before cookie acceptance`);
    await expect(this.menuButton).toBeVisible();
    await expect(this.menuButton).toHaveAttribute('aria-expanded', 'false');
    let blocked = false;
    try {
      await this.menuButton.click({ trial: true, timeout });
    } catch (error) {
      if (!(error instanceof errors.TimeoutError)) {
        throw error;
      }
      blocked = true;
    }
    expect(blocked, dnbTestErrorMsgs.MENU_NOT_BLOCKED_BEFORE_CONSENT).toBe(true);
    await expect(this.menuButton).toHaveAttribute('aria-expanded', 'false');
    this.logger.info(`${methodName}: menu is blocked and remains closed`);
  }

  async openMenu() {
    const methodName = 'DNBHomePage_openMenu';
    this.logger.info(`${methodName}: opening menu`);
    await this.menuButton.click();
    await expect(this.menuButton, dnbTestErrorMsgs.MENU_NOT_OPENED).toHaveAttribute('aria-expanded', 'true');
    this.logger.info(`${methodName}: menu openned`);

  }

  async openMenuCategory(menu) {
    this.logger.info(`DNBHomePage_openMenuCategory: opening ${menu}`);
    const menuLinks = {
      lan: this.loansLink,
      kort: this.kortLink,
      sparing: this.savingsLink
    };
    if (!Object.hasOwn(menuLinks, menu)) {
      throw new Error(`Unsupported menu: ${menu}`);
    }
    await menuLinks[menu].click();
    this.logger.info(`DNBHomePage_openMenuCategory: opened ${menu}`);
  }

  async assertMenuItemsAreDisplayed() {
    const methodName = 'DNBHomePage_assertMenuItemsAreDisplayed';
    this.logger.info(`${methodName}: verifying menu items are displayed`);
    const menuItems = {
      privateTab: this.privateTab,
      businessTab: this.businessTab,
      becomeCustomerTab: this.becomeCustomerTab,
      loansLink: this.loansLink,
      savingsLink: this.savingsLink,
      insuranceLink: this.insuranceLink,
      pensionLink: this.pensionLink
    };

    for (const [name, locator] of Object.entries(menuItems)) {
      await expect(locator, `${dnbTestErrorMsgs.MENU_ITEMS_NOT_DISPLAYED}: ${name}`).toBeVisible();
      this.logger.info(`${methodName}: ${name} is displayed`);
    }
    this.logger.info(`${methodName}: all menu items are displayed`);
  }

  async goTo() {
    const methodName = 'DNBHomePage_goTo';
    const url = process.env.URL || process.env.BASE_URL;
    this.logger.info(`${methodName}: navigating to ${url}`);
    if (!url) {
      throw new Error('Set URL or BASE_URL in the selected environment file before navigating to DNB.');
    }

    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    this.logger.info(`${methodName}: navigated to ${url}`);
  }
}

module.exports = { DNBHomePage };
