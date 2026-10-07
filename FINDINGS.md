## Judgement is exactly one of: my test is wrong or the application has a bug.

## Admin signs in and reaches the Leads page (login.spec.ts)
- **Predicted:** the browser moves to /leads, the "Leads" heading is shown, and the role badge reads ADMIN
- **Actual:** passed, but the role badge was never checked
- **Verdict:** My test is wrong
- **Reasoning:** My prediction included the ADMIN role badge, but the test only checked the heading.

## Searching by company name narrows the list(search.spec.ts)
- **Predicted:** searching Daraz narrows the list to its lead(s)
- **Actual:** 0 rows shown, although the lead exists in the database
- **Verdict:** The application has a bug
- **Reasoning:** The same search by hand also returns nothing, the company is in the leads table, and the brief says company search should work.

## Count text reflects how many leads are shown after a search (search.spec.ts)
- **Predicted:** after a search leaves 1 row, the count text shows 1 of the total
- **Actual:** the count text still shows the full total
- **Verdict:** The application has a bug
- **Reasoning:** The list is filtered to 1 row, but the count text is not updated to the number of leads shown.

## adding a lead with a chosen status saves it with that status(add-lead.spec.ts)
- **Predicted:** after adding Niroj Qualified with status Qualified, her row shows status Qualified
- **Actual:** Niroj Qualified is added but her row shows status New
- **Verdict:** The application has a bug.
- **Reasoning:** The status is not changing.

## An admin can delete Sita Sharma and the row disappears (delete-lead.spec.ts)
- **Predicted:** the admin deletes  Sita Sharma and her row disappears from the list
- **Actual:** failed before the delete, because no row containing "Sita Sharma" was found
- **Verdict:** My test is wrong
- **Reasoning:** I did not reset the data, so Sita Sharma was already deleted by an earlier run.