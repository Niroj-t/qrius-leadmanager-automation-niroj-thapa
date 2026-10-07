## Judgement is exactly one of: my test is wrong or the application has a bug.

## Admin signs in and sees the admin view (login.spec.ts)
- **Predicted:** after signing in as admin, the nav shows the ADMIN role badge and the leads table shows 12 rows
- **Actual:** the original test only checked the page heading and never looked at the role badge, so it would pass even if the session had the wrong role
- **Verdict:** My test was wrong
- **Reasoning:** The heading renders for any signed-in user, so it proves nothing about the role. The test now checks `nav-role` and the 12 rows.

## Count text reflects how many leads are shown after a search (search.spec.ts)
- **Predicted:** after searching "Sita Sharma" leaves 1 row, the count text shows "Showing 1 of 12 leads"
- **Actual:** the count text still shows "Showing 12 of 12 leads"
- **Verdict:** The application has a bug
- **Reasoning:** The list is filtered to 1 row, but the count text always shows the stored total instead of the number of leads on screen.

## Adding a lead with a chosen status saves it with that status (add-lead.spec.ts)
- **Predicted:** after adding a lead with status Qualified, its row shows status Qualified
- **Actual:** the lead is added but its row shows status New
- **Verdict:** The application has a bug
- **Reasoning:** The frontend sends the chosen status, but the backend ignores it and always saves "New".

## Admin deletes a lead (delete-lead.spec.ts)
- **Predicted:** after the admin deletes a lead, it no longer appears in the leads list
- **Actual:** the test deleted the seeded lead Sita Sharma, so it passed on the first run and failed on every run after, because the lead no longer existed
- **Verdict:** My test was wrong
- **Reasoning:** The app deleted the lead correctly. The test depended on seed data it destroyed. It now adds its own lead and deletes that one.