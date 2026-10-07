import { test, expect } from '@playwright/test';
import { LeadsPage } from '../pages/leadsPage';
import { loginAsAdmin } from '../test-data/auth';
import { seededLead, editedStatus, editedEmail } from '../test-data/leads';

test.describe('Edit a lead', () => {
  let leads: LeadsPage;

  test.beforeEach(async ({ page }) => {
    leads = new LeadsPage(page);
    await loginAsAdmin(page);
    await expect(leads.rows.first()).toBeVisible(); // the list has loaded
  });

  // Put Sita Sharma back to her seeded values so the tests can be run again.
  test.afterEach(async () => {
    await leads.editStatus(seededLead.name, seededLead.status);
    await leads.editEmail(seededLead.name, seededLead.email);
    const row = leads.rowFor(seededLead.name);
    await expect(row.getByRole('cell', { name: seededLead.email, exact: true })).toBeVisible();
    await expect(row.getByRole('cell', { name: seededLead.status, exact: true })).toBeVisible();
  });

  test("editing a lead's status updates it in the list", async () => {
    // prediction: Sita Sharma's status changes from "New" to "Contacted" in the list
    const row = leads.rowFor(seededLead.name);
    await expect(row.getByRole('cell', { name: seededLead.status, exact: true })).toBeVisible();

    await leads.editStatus(seededLead.name, editedStatus);

    await expect(row.getByRole('cell', { name: editedStatus, exact: true })).toBeVisible();
    await expect(row.getByRole('cell', { name: seededLead.status, exact: true })).toHaveCount(0);
  });

  test("editing a lead's email updates it in the list", async () => {
    // prediction: Sita Sharma's email changes from "sita@himalkart.com.np" to "sita.sharma@himalkart.com.np"
    const row = leads.rowFor(seededLead.name);
    await expect(row.getByRole('cell', { name: seededLead.email, exact: true })).toBeVisible();

    await leads.editEmail(seededLead.name, editedEmail);

    await expect(row.getByRole('cell', { name: editedEmail, exact: true })).toBeVisible();
    await expect(row.getByRole('cell', { name: seededLead.email, exact: true })).toHaveCount(0);
  });
});
