const { When, Then } = require('@cucumber/cucumber');

When('User opens the search page', async function () {
  await this.poManager.getDNBHomePage().openSearch();
  await this.poManager.getSearchPage().assertUrlIsExpected();
});

When('User searches for {string}', { timeout: 60_000 }, async function (value) {
  await this.poManager.getSearchPage().search(value);
});

Then('User {string} see search results', async function (expectation) {
  if (expectation !== 'should' && expectation !== 'shouldNot') {
    throw new Error('Search results expectation must be "should" or "shouldNot".');
  }
  const searchPage = this.poManager.getSearchPage();
  const shouldBeDisplayed = expectation === 'should';
  await searchPage.assertSearchResultsVisibility(shouldBeDisplayed);
});

Then('User verifies at least one search result is returned', async function () {
  await this.poManager.getSearchPage().assertAtLeastOneSearchResult();
});

Then('User verifies search result titles and links are not empty', async function () {
  this.searchResultData = await this.poManager.getSearchPage().assertSearchResultTitlesAndLinks();
});

Then('User verifies search result links are unique', async function () {
  if (!this.searchResultData) {
    throw new Error('Search result data is missing. Run title and link validation first.');
  }
  await this.poManager.getSearchPage().assertSearchResultLinksAreUnique(
    this.searchResultData.uniqueLinks,
    this.searchResultData.linkCount
  );
});