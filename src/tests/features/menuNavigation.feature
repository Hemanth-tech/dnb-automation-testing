@MenuNavigation
Feature: DNB menu navigation
    Background:
        Given User launches DNB home page
        When User accepts "necessary only" cookies
        Then User verifies the cookie banner is closed

    Scenario Outline: Navigate from <menu> to <submenu>
        When User opens the menu after cookie acceptance
        And User selects the "<menu>" menu category
        Then User verifies the menu page URL is "<menuUrl>"
        When User selects the "<submenu>" submenu
        Then User verifies the submenu page URL is "<submenuUrl>"
        And User verifies the submenu title is "<submenutitle>"
        
    Examples:
        | menu    | submenu     | submenutitle | menuUrl  | submenuUrl        |
        | lan     | boliglan    | Boliglån     | /lan     | /lan/boliglan     |
        | kort    | kredittkort | Kredittkort  | /kort    | /kort/kredittkort |
        | sparing | fond        | Fond         | /sparing | /sparing/fond     |