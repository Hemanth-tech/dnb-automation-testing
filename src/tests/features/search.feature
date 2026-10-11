@Search
Feature: DNB search
    Background:
        Given User launches DNB home page
        When User accepts "necessary only" cookies
        Then User verifies the cookie banner is closed
        When User opens the search page

    Scenario: Valid search returns unique results with titles and links
        When User searches for "Boliglå"
        Then User "should" see search results
        And User verifies at least one search result is returned
        And User verifies search result titles and links are not empty
        And User verifies search result links are unique

    Scenario: Invalid search returns no results
        When User searches for "asdfghjkl123456"
        Then User "shouldNot" see search results
