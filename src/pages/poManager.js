const { BasePage } = require('./basePage');
const { DNBHomePage } = require('./home/dnbHomePage');
const { CookiePage } = require('./cookie/cookiePage');
const { LanMenuPage } = require('./lan/lanMenuPage');
const { BoliganSubMenuPage } = require('./lan/boliganSubMenuPage');
const { KortMenuPage } = require('./kort/kortMenuPage');
const { KredittkortSubMenuPage } = require('./kort/kredittkortSubMenuPage');
const { SparingMenuPage } = require('./sparing/sparingMenuPage');
const { FondSubMenuPage } = require('./sparing/fondSubMenuPage');
const { SearchPage } = require('./search/searchPage');
const { CurrencyCalculatorPage } = require('./calculator/currencyCalculatorPage');

class POManager {
  constructor(page) {
    this.page = page;
    this.basePage = new BasePage(page);
    this.dnbHomePage = new DNBHomePage(page);
    this.cookiePage = new CookiePage(page);
    this.lanMenuPage = new LanMenuPage(page);
    this.boligansSubMenuPage = new BoliganSubMenuPage(page);
    this.kortMenuPage = new KortMenuPage(page);
    this.kredittkortSubMenuPage = new KredittkortSubMenuPage(page);
    this.sparingMenuPage = new SparingMenuPage(page);
    this.fondSubMenuPage = new FondSubMenuPage(page);
    this.searchPage = new SearchPage(page);
    this.currencyCalculatorPage = new CurrencyCalculatorPage(page);
  }

  getBasePage() {
    return this.basePage;
  }

  getDNBHomePage() {
    return this.dnbHomePage;
  }

  getCookiePage() {
    return this.cookiePage;
  }

  getLanMenuPage() {
    return this.lanMenuPage;
  }

  getBoliganSubMenuPage() {
    return this.boligansSubMenuPage;
  }

  getKortMenuPage() {
    return this.kortMenuPage;
  }

  getKredittkortSubMenuPage() {
    return this.kredittkortSubMenuPage;
  }

  getSparingMenuPage() {
    return this.sparingMenuPage;
  }

  getFondSubMenuPage() {
    return this.fondSubMenuPage;
  }

  getSearchPage() {
    return this.searchPage;
  }

  getCurrencyCalculatorPage() {
    return this.currencyCalculatorPage;
  }
}

module.exports = { POManager };
