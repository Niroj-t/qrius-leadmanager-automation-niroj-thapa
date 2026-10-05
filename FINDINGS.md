# FINDINGS

Judgement is exactly one of: **my test is wrong** or **the application has a bug**.

## Failed tests

Test 1: Searching by a company name narrows the list
Result: Failed
Judgement: The application has a bug
Reasoning: Searching "Daraz", a company that exists in the data, returns no rows, so the search ignores the company field.

Test 2: Count text reflects how many leads are shown after a search
Result: Failed
Judgement: The application has a bug
Reasoning: After a search leaves 1 row, the count text still shows the full total instead of the number shown.


## Details

### 1. Search by company name

- Test: `search.spec.ts` › searching by a company name narrows the list
- Expected: Searching "Daraz" shows 1 row, Bikash Shrestha.
- Actual: 0 rows and the "No leads found." empty state. (confirm in trace)
  a row, so the filter works for the name column only.
- Why not my test: "Daraz" is a company in the seeded data, and the brief says
  searching by company name should narrow the list. My locators and assertions are correct.
- Judgement: the application has a bug.

### 2. Count text after a search

- Test: `search.spec.ts` › count text reflects how many leads are shown after a search
- Expected: "Showing 1 of 12 leads" after searching "Sita".
- Actual: "Showing 12 of 12 leads" with 1 row visible. (confirm in trace)
- Why not my test: The `toHaveCount(1)` assertion passes just before, so the
  list did narrow. Only the count text is wrong, and the brief says it should
  reflect how many leads are shown.
- Judgement: the application has a bug.
