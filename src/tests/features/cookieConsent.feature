@CookieConsent
Feature: DNB cookie consent
    Visitors can choose which cookies to accept.
    Background:
        Given User launches DNB home page
        Then User sees the cookie banner
        And User sees accept all and necessary only buttons in the cookie banner
        And User cannot click the menu before cookie acceptance

    Scenario Outline: Close the cookie banner after choosing consent
        When User accepts "<consent>" cookies
        Then User verifies the cookie banner is closed
        When User opens the menu after cookie acceptance
        Then User sees the home page menu items
        
    Examples:
        | consent         |
        | all             |
        | necessary only  |