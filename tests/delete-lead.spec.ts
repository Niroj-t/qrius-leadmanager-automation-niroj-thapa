import { test, expect } from '@playwright/test';
import { LeadsPage } from '../pages/leadsPage';
import { loginAsAdmin, loginAsAgent } from '../test-data/auth';
import { deletableLead, totalSeededLeads } from '../test-data/leads';

test.describe('Delete a lead', () => {
  test('an admin can delete a lead and the row disappears', async ({ page }) => {
    // prediction: after deleting a lead the admin just added, no row contains its name and the list is back to 12.
    // The test adds its own lead, so the seeded leads are never touched and the test can be run again.
    const leads = new LeadsPage(page);
    await loginAsAdmin(page);
    await expect(leads.rows).toHaveCount(totalSeededLeads);

    await leads.addLead(deletableLead);
    await expect(leads.rowFor(deletableLead.name)).toHaveCount(1);
    await expect(leads.rows).toHaveCount(totalSeededLeads + 1);

    await leads.deleteLead(deletableLead.name);

    await expect(leads.rowFor(deletableLead.name)).toHaveCount(0);
    await expect(leads.rows).toHaveCount(totalSeededLeads);
  });

  test('an agent does not see a delete button', async ({ page }) => {
    // prediction: agent sees the lead rows, and there are 0 delete buttons on the page
    const leads = new LeadsPage(page);
    await loginAsAgent(page);
    await expect(leads.rows.first()).toBeVisible();

    await expect(leads.deleteButtons).toHaveCount(0);
  });
});
