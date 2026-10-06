# FINDINGS

Judgement is exactly one of: **my test is wrong** or **the application has a bug**.

## Search by company name and Count text after a search

Test 1: Searching by a company name narrows the list
Result: Failed
Judgement: The application has a bug
Reasoning: Searching "Daraz", a company that exists in the data, returns no rows, so the search ignores the company field.

Test 2: Count text reflects how many leads are shown after a search
Result: Failed
Judgement: The application has a bug
Reasoning: After a search leaves 1 row, the count text still shows the full total instead of the number shown.


### Add a lead
Test: Adding a lead with status "Contacted" / "Qualified" / "Lost" saves that status
Result: Failed (3 tests)
Judgement: The application has a bug
Reasoning: The request sends the chosen status but every saved lead shows "New", while the "New" test passes, so the backend ignores the status.