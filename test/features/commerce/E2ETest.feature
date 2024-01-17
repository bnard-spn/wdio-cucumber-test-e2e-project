Feature: Customer search

    @demo @smoke
    Scenario Outline: <TestID>: Search external customers
        Given a list of users from reqres.in
        When an Admin user login to nopcommerce site
        Then user can verify if all users exist in customers list

        Examples:
            | TestID    |
            | E2E_TC001 |