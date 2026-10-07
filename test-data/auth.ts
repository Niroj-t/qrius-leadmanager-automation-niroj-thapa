import type { Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { admin, agent, type User } from './users';

export async function loginAs(page: Page, user: User) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(user);
}

export async function loginAsAdmin(page: Page) {
  await loginAs(page, admin);
}

export async function loginAsAgent(page: Page) {
  await loginAs(page, agent);
}
