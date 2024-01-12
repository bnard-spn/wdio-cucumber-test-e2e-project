Feature: Cucumber Demo

    I can have more info about the feature

    Background: Launch google
        Given Google page is opened

    Scenario: Google search
        When Search with WDIO
        Then Click on the first search result
        And URL should match https://webdriver.io/

    Scenario: Google search
        When Search with webdriverio
        Then Click on the first search result
        And URL should match https://webdriver.io/