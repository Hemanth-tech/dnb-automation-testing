@CurrencyCalculator
Feature: Currency calculator
    Scenario: Convert currencies and verify proportional results in one browser session
        Given User opens the currency calculator
        When User accepts "necessary only" cookies
        Then User verifies the cookie banner is closed
        Then User verifies currency conversions and doubling the amount
        | from | to  | amount |
        | NOK  | EUR | 1000   |
        | USD  | NOK | 250.50 |
        | EUR  | GBP | 2000   |