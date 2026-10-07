import { test, expect } from '@playwright/test';
import { LeadsPage } from '../pages/leadsPage';
import { loginAsAdmin } from '../test-data/auth';
import { statusLead, listLead } from '../test-data/leads';

test.describe('Add a lead', () => {
  let leads: LeadsPage;
  let createdName: string | null = null; // the lead this test added, removed in afterEach

  test.beforeEach(async ({ page }) => {
    leads = new LeadsPage(page);
    createdName = null;
    await loginAsAdmin(page);
    await expect(leads.rows.first()).toBeVisible(); // the list has loaded
  });

  // Remove the lead so the seeded data stays intact for the other specs.
  test.afterEach(async () => {
    if (!createdName) return;
    await leads.deleteLead(createdName);
    await expect(leads.rowFor(createdName)).toHaveCount(0);
  });

  test('adding a lead with a chosen status saves that lead with that status', async () => {
    // prediction: after adding a lead with status "Qualified", its row shows a cell "Qualified".
    // I expect this to FAIL because the backend ignores the chosen status and saves "New".
    await leads.addLead(statusLead);
    createdName = statusLead.name;

    const row = leads.rowFor(statusLead.name);
    await expect(row.getByRole('cell', { name: statusLead.status, exact: true })).toBeVisible();
  });

  test('the new lead appears in the list', async () => {
    // prediction: after adding a lead, the list grows by 1 and exactly one row contains its name
    const before = await leads.rows.count();
    await leads.addLead(listLead);
    createdName = listLead.name;

    await expect(leads.rowFor(listLead.name)).toHaveCount(1);
    await expect(leads.rows).toHaveCount(before + 1);
  });
});
