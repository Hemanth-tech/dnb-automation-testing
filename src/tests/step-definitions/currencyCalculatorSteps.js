const { Given, Then } = require('@cucumber/cucumber');

Given('User opens the currency calculator', { timeout: 60_000 }, async function () {
  await this.poManager.getCurrencyCalculatorPage().goTo();
});

Then('User verifies currency conversions and doubling the amount', { timeout: 120_000 }, async function (dataTable) {
  const calculator = this.poManager.getCurrencyCalculatorPage();
  for (const row of dataTable.hashes()) {
    await calculator.verifyConversion(row.from, row.to, row.amount);
  }
});