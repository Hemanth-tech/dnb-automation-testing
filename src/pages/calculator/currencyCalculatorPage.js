const {BasePage} = require('../basePage');
const{expect}=require('@playwright/test');
 const dnbTestErrorMsgs=require('../../test-error-msgs/dnbTestErrorMsgs')

class CurrencyCalculatorPage extends BasePage {


    constructor(page){
        super(page);
        this.expectedPath = '/markets/valuta-og-renter/valutakalkulator';
        this.fromAmount = page.locator('input[name="fromValue"]');
        this.toAmount = page.locator('input[name="toValue"]');
        this.fromCurrency = page.getByRole('combobox').nth(0);
        this.toCurrency = page.getByRole('combobox').nth(1);
    }

  async goTo(){
    const configuredUrl = process.env.URL;
    if(!configuredUrl){
        throw new Error('Set URL before openning calculator');
    }
     const methodName = 'CurrencyCalculatorPage_goTo';
    this.logger.info(`${methodName}: opennig calculator`);
    await this.page.goto(new URL(this.expectedPath, configuredUrl).href, {waitUntil: 'domcontentloaded'});
    await this.assertUrlIsExpected();
    this.logger.info(`${methodName}: opened calculator`);
  }

  async selectCurrency(dropdown, currency) {
    const methodName = 'CurrencyCalculatorPage_selectCurrency';
    this.logger.info(`${methodName}: selecting ${currency}`);
    await dropdown.click({timeout :3_000});
    await expect(dropdown, dnbTestErrorMsgs.CURRENCY_DROPDOWN_NOT_OPENED).toHaveAttribute('aria-expanded', 'true');
    const dropdownId = await dropdown.getAttribute('id');
    const option = this.page.locator(`[role="option"][id^="option-${dropdownId}"]`).filter({ has: this.page.getByText(currency,{exact:true}) });
    await option.click();
    await expect(dropdown, dnbTestErrorMsgs.CURRENCY_DROPDOWN_NOT_CLOSED).toHaveAttribute('aria-expanded', 'false');
    this.logger.info(`${methodName}: selected ${currency}`);
  }

  async setAmount(amount) {
    await this.fromAmount.fill(String(amount));
  }

  async readResult() {
    const text = await this.toAmount.inputValue();
    const normalized = text.split(' ').join('').replace(',', '.');
    if (!normalized) {
      return NaN;
    }
    return Number(normalized);
  }

  async assertResultIsPositive() {
    await expect(this.toAmount, dnbTestErrorMsgs.CALCULATOR_RESULT_NOT_DISPLAYED).toBeVisible();
    const result = await this.readResult();
    expect(Number.isFinite(result), dnbTestErrorMsgs.CALCULATOR_RESULT_NOT_NUMERIC).toBe(true);
    expect(result, dnbTestErrorMsgs.CALCULATOR_RESULT_NOT_POSITIVE).toBeGreaterThan(0);
    return result;
  }

  async assertDoubledResult(originalResult) {
    const doubledResult = await this.assertResultIsPositive();
    const expectedResult = originalResult * 2;
    const tolerance = Math.max(0.02, expectedResult * 0.01);
    const difference = Math.abs(doubledResult - expectedResult);
    expect(difference, dnbTestErrorMsgs.CALCULATOR_DOUBLING_MISMATCH).toBeLessThanOrEqual(tolerance);
  }

  async verifyConversion(from, to, amount) {
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      throw new Error('Calculator amount must be a positive number.');
    }
    this.logger.info(`CurrencyCalculatorPage_verifyConversion: ${from} to ${to}, amount ${amount}`);
    await this.selectCurrency(this.fromCurrency, from);
    await this.selectCurrency(this.toCurrency, to);
    await this.setAmount(numericAmount);
    const originalResult = await this.assertResultIsPositive();
    await this.setAmount(numericAmount * 2);
    await this.assertDoubledResult(originalResult);
    this.logger.info(`CurrencyCalculatorPage_verifyConversion: ${from} to ${to} passed result and doubling checks`);
  }
}

module.exports = { CurrencyCalculatorPage };