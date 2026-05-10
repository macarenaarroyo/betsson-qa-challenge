import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async fillUsername(username: string) {
    await this.page.fill('[data-test=username]', username);
  }

  async fillPassword(password: string) {
    await this.page.fill('[data-test=password]', password);
  }

  async clickLogin() {
    await this.page.click('[data-test=login-button]');
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async getErrorMessage() {
    return this.page.locator('[data-test="error"]').textContent();
  }
}
