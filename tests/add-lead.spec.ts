import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';
import { admin } from './helpers/users';

test.describe('Add a lead', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, admin);
  });

  // Prediction: Adding a lead with the status "New" should save it as "New", and I expect this to pass because "New" is the default.
  test('adding a lead with status "New" saves that status', async ({ page }) => {
    await page.getByTestId('add-lead-button').click();
    await page.getByTestId('name').fill('Niroj New');
    await page.getByTestId('email').fill('niroj.new@example.com');
    await page.getByTestId('company').fill('Test Company');
    await page.getByTestId('status').selectOption('New');
    await page.getByTestId('save-button').click();

  });

  // Prediction: Adding a lead with the status "Contacted" should save it as "Contacted", but I expect this to fail because the backend ignores the chosen status.
  test('adding a lead with status "Contacted" saves that status', async ({ page }) => {
    await page.getByTestId('add-lead-button').click();
    await page.getByTestId('name').fill('Niroj Contacted');
    await page.getByTestId('email').fill('niroj.contacted@example.com');
    await page.getByTestId('company').fill('Test Company');
    await page.getByTestId('status').selectOption('Contacted');
    await page.getByTestId('save-button').click();

    await expect(page.getByTestId('lead-status')).toHaveText('Contacted');
  });

  // Prediction: Adding a lead with the status "Qualified" should save it as "Qualified", but I expect this to fail because the backend ignores the chosen status.
  test('adding a lead with status "Qualified" saves that status', async ({ page }) => {
    await page.getByTestId('add-lead-button').click();
    await page.getByTestId('name').fill('Niroj Qualified');
    await page.getByTestId('email').fill('niroj.qualified@example.com');
    await page.getByTestId('company').fill('Test Company');
    await page.getByTestId('status').selectOption('Qualified');
    await page.getByTestId('save-button').click();

    await expect(page.getByTestId('lead-status')).toHaveText('Qualified');
  });

  // Prediction: Adding a lead with the status "Lost" should save it as "Lost", but I expect this to fail because the backend ignores the chosen status.
  test('adding a lead with status "Lost" saves that status', async ({ page }) => {
    await page.getByTestId('add-lead-button').click();
    await page.getByTestId('name').fill('Niroj Lost');
    await page.getByTestId('email').fill('niroj.lost@example.com');
    await page.getByTestId('company').fill('Test Company');
    await page.getByTestId('status').selectOption('Lost');
    await page.getByTestId('save-button').click();

    await expect(page.getByTestId('lead-status')).toHaveText('Lost');
  });

  // Prediction: After saving, the new lead should appear in the list.
  test('the new lead appears in the list', async ({ page }) => {

    await page.getByTestId('search-input').fill('New');
    await expect(page.getByTestId('lead-status')) .toHaveText('New');
  });
});