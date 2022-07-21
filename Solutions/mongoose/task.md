# Task 1

## Instructions
1. View the `agents.csv` file of real estate agents.
2. Design a Schema for an `Agent` model
3. Write a script that populates the database using the csv file (use `csvtojson` to convert the `csv` to `json`).
4. Make these API endpoints (routes):
  * GET `/cities` - will respond with a list of all cities
  * GET `/agents/?city=<city>` - will respond with a list of all agents in that city
  * PUT `/agent/:id` - will update an agent

## Bonus
Implement a frontend application to consume this API.
