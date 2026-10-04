import { expect, type Page } from '@playwright/test';
import type { User } from './users';

export async function login(page: Page, user: User): Promise<void> {
  await page.goto('/login');
  await page.getByTestId('username').fill(user.username);
  await page.getByTestId('password').fill(user.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL('/leads');
}