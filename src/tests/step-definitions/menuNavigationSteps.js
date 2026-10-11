const { When, Then } = require('@cucumber/cucumber');
const routes = require('../../config/menuNavigationConfig');

When('User selects the {string} menu category', async function (menu) {
  if (!Object.hasOwn(routes, menu)) {
    throw new Error(`Unsupported menu: ${menu}`);
  }
  this.navigationRoute = routes[menu];
  this.menuPage = this.poManager[this.navigationRoute.pageGetter]();
  this.submenuPage = undefined;
  await this.poManager.getDNBHomePage().openMenuCategory(menu);
});

Then('User verifies the menu page URL is {string}', async function (expectedPath) {
  await this.menuPage.assertUrlIsExpected(expectedPath);
});

When('User selects the {string} submenu', async function (submenu) {
  if (!this.navigationRoute || !Object.hasOwn(this.navigationRoute.submenus, submenu)) {
    throw new Error(`Unsupported submenu for selected menu: ${submenu}`);
  }
  const submenuRoute = this.navigationRoute.submenus[submenu];
  this.submenuPage = this.poManager[submenuRoute.pageGetter]();
  await this.menuPage[submenuRoute.open]();
});

Then('User verifies the submenu page URL is {string}', async function (expectedPath) {
  await this.submenuPage.assertUrlIsExpected(expectedPath);
});

Then('User verifies the submenu title is {string}', async function (title) {
  await this.submenuPage.assertSubMenuTitle(title);
});