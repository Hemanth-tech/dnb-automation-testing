const dnbTestErrorMsgs = Object.freeze({
  CURRENCY_DROPDOWN_NOT_OPENED: 'Currency dropdown did not open',
  CURRENCY_DROPDOWN_CLOSED: 'Currency dropdown did not close after selection',
  CALCULATOR_RESULT_NOT_DISPLAYED: 'Calculated result is not displayed',
  CALCULATOR_RESULT_NOT_NUMERIC: 'Calculated result is not numeric',
  CALCULATOR_RESULT_NOT_POSITIVE: 'Calculated result must be greater than zero',
  CALCULATOR_DOUBLING_MISMATCH: 'Doubling the amount should approximately double the result',
  PAGE_URL_MISMATCH: 'Page URL does not match the expected URL',
  SEARCH_RESULTS_NOT_DISPLAYED: 'Search results are not displayed for a valid search',
  SEARCH_RESULTS_UNEXPECTEDLY_DISPLAYED: 'Search results are displayed when no results are expected',
  SEARCH_RESULTS_EMPTY: 'No search results were returned',
  SEARCH_RESULT_TITLE_EMPTY: 'Search result title is empty',
  SEARCH_RESULT_LINK_EMPTY: 'Search result link is missing or empty',
  SEARCH_RESULT_LINKS_NOT_UNIQUE: 'Search result links are not unique',
  COOKIE_POP_UP_NOT_DISPLAYED: 'Cookie pop up is not displayed',
  COOKIE_ACCEPT_ALL_NOT_DISPLAYED: 'Accept all cookies button is not displayed',
  COOKIE_NECESSARY_ONLY_NOT_DISPLAYED: 'Necessary only cookies button is not displayed',
  COOKIE_POP_UP_NOT_CLOSED: 'Cookie pop up is not closed',
  MENU_NOT_BLOCKED_BEFORE_CONSENT: 'Menu is clickable before cookie acceptance',
  MENU_NOT_OPENED: 'Menu did not open after cookie acceptance',
  MENU_ITEMS_NOT_DISPLAYED: 'Expected menu item is not displayed',
  BOLIGLAN_HEADER_NOT_DISPLAYED: 'Boliglån header is not displayed',
  KREDITTKORT_HEADER_NOT_DISPLAYED: 'Kredittkort header is not displayed'
});

module.exports = dnbTestErrorMsgs;