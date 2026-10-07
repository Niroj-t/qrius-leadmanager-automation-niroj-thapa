import { type Page, type Locator } from '@playwright/test';
import type { Lead } from '../test-data/leads';

export class LeadsPage {
  readonly page: Page;
  readonly navRole: Locator;
  readonly navUser: Locator;
  readonly rows: Locator;
  readonly dataRows: Locator;
  readonly searchInput: Locator;
  readonly countText: Locator;
  readonly emptyState: Locator;
  readonly deleteButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navRole = page.getByTestId('nav-role');
    this.navUser = page.getByTestId('nav-user');
    this.rows = page.getByTestId('lead-row');
    this.dataRows = page.getByRole('row').filter({ hasNot: page.getByRole('columnheader') });
    this.searchInput = page.getByTestId('search-input');
    this.countText = page.getByTestId('lead-count');
    this.emptyState = page.getByTestId('empty-state');
    this.deleteButtons = page.getByTestId('delete-button');
  }

  // The row(s) containing the given text (a name, a company, ...).
  rowFor(text: string): Locator {
    return this.rows.filter({ hasText: text });
  }

  async search(term: string) {
    await this.searchInput.fill(term);
  }

  async addLead(lead: Lead) {
    await this.page.getByTestId('add-lead-button').click();
    await this.page.getByTestId('name').fill(lead.name);
    await this.page.getByTestId('email').fill(lead.email);
    await this.page.getByTestId('company').fill(lead.company);
    await this.page.getByTestId('status').selectOption(lead.status);
    await this.page.getByTestId('save-button').click();
  }

  async editStatus(name: string, status: string) {
    await this.rowFor(name).getByTestId('edit-button').click();
    await this.page.getByTestId('status').selectOption(status);
    await this.page.getByTestId('save-button').click();
  }

  async editEmail(name: string, email: string) {
    await this.rowFor(name).getByTestId('edit-button').click();
    await this.page.getByTestId('email').fill(email);
    await this.page.getByTestId('save-button').click();
  }

  // The app deletes straight away, there is no confirmation dialog.
  async deleteLead(name: string) {
    await this.rowFor(name).getByTestId('delete-button').click();
  }
}
