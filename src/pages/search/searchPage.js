const { BasePage } = require('../basePage');
const { expect } = require('@playwright/test');
const dnbTestErrorMsgs = require('../../test-error-msgs/dnbTestErrorMsgs');

class SearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.expectedPath = '/sok';
    this.searchInput = page.locator('#search-container-input');
    this.searchButton = page.locator('div:has(input#search-container-input) + button');
    this.searchResults = page.locator('div.search-results');
    this.searchResultsContent = page.locator('div.search-results-content');
    this.searchResultLinks = page.locator('div.search-results li h3 a');
  }

  async search(value) {
    const methodName = 'SearchPage_search';
    this.logger.info(`${methodName}: entering search text`);
    await this.searchInput.fill(value);
    await this.searchButton.click();
    this.logger.info(`${methodName}: search submitted`);
  }

  async assertAtLeastOneSearchResult(timeout = 20_000) {
    const methodName = 'SearchPage_assertAtLeastOneSearchResult';
    this.logger.info(`${methodName}: verifying at least one result is returned`);
    await expect(this.searchResultLinks.first(), dnbTestErrorMsgs.SEARCH_RESULTS_EMPTY).toBeVisible({ timeout });
    this.logger.info(`${methodName}: at least one result is returned`);
  }

  async assertSearchResultTitlesAndLinks(timeout = 20_000) {
    const methodName = 'SearchPage_assertSearchResultTitlesAndLinks';
    this.logger.info(`${methodName}: verifying result titles and links`);
    await this.assertAtLeastOneSearchResult(timeout);
    const count = await this.searchResultLinks.count();
    const uniqueLinks = new Set();
    for (let index = 0; index < count; index++) {
      const resultLink = this.searchResultLinks.nth(index);
      const title = (await resultLink.textContent({ timeout }) || '').trim();
      expect(title, `${dnbTestErrorMsgs.SEARCH_RESULT_TITLE_EMPTY}: result ${index + 1}`).not.toBe('');
      const href = (await resultLink.getAttribute('href', { timeout }) || '').trim();
      expect(href, `${dnbTestErrorMsgs.SEARCH_RESULT_LINK_EMPTY}: result ${index + 1}`).not.toBe('');
      uniqueLinks.add(new URL(href, this.page.url()).href);
    }
    this.logger.info(`${methodName}: all ${count} results have non-empty titles and links`);
    return { uniqueLinks, linkCount: count };
  }

  async assertSearchResultLinksAreUnique(uniqueLinks, linkCount) {
    const methodName = 'SearchPage_assertSearchResultLinksAreUnique';
    this.logger.info(`${methodName}: verifying result links are unique`);
    expect(uniqueLinks.size, dnbTestErrorMsgs.SEARCH_RESULT_LINKS_NOT_UNIQUE).toBe(linkCount);
    this.logger.info(`${methodName}: all ${linkCount} result links are unique`);
  }

  async assertSearchResultsVisibility(shouldBeDisplayed, timeout = 20_000) {
    const methodName = 'SearchPage_assertSearchResultsVisibility';
    this.logger.info(`${methodName}: verifying search results are ${shouldBeDisplayed ? 'displayed' : 'empty'}`);
    if (typeof shouldBeDisplayed !== 'boolean') {
      throw new Error('Expected search results visibility must be true or false.');
    }

    const expectedState = shouldBeDisplayed ? 'displayed' : 'empty';
    this.logger.info(`${methodName}: verifying search results are ${expectedState}`);
    if (shouldBeDisplayed) {
      await expect(this.searchResults, dnbTestErrorMsgs.SEARCH_RESULTS_NOT_DISPLAYED).toBeVisible({ timeout });
    } else {
      await expect(this.searchResultLinks, dnbTestErrorMsgs.SEARCH_RESULTS_UNEXPECTEDLY_DISPLAYED).toHaveCount(0, { timeout });
    }
    this.logger.info(`${methodName}: search results are ${expectedState}`);
  }
}

module.exports = { SearchPage };
