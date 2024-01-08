Feature: Inventory

    Feature Description

    @demo
    Scenario Outline: Demo Inventory
        Given Login to inventory web app
        # Then Inventory page should list <NumberofProducts>
        # Then Validate all products have valid price

        Examples:
            | TestID     | NumberofProducts |
            | INTV_TC001 | 6                |