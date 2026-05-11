import { Page, expect } from '@playwright/test';

export class MenuPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openMenu() {
    await this.page.click('#react-burger-menu-btn');
  }

  async clickLogout() {
    await this.page.click('#logout_sidebar_link');
  }

  async logout() {
    await this.openMenu();
    await this.clickLogout();
    await expect(this.page).toHaveURL('/');
  }
}
