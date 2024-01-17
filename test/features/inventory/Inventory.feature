Feature: Inventory

    Feature Description

    Scenario Outline: <TestID>: Demo Inventory
        Given As a standard user I login to inventory app
            | UserType | Username                |
            | StdUser  | standard_user           |
            | ProbUser | problem_user            |
            | PerfUser | performance_glitch_user |
        Then Inventory page should list <NumberofProducts>
        Then Validate all products have valid price

        Examples:
            | TestID     | NumberofProducts |
            | INTV_TC001 | 6                |