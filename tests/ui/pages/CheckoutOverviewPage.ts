import { Page, expect } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyCheckoutOverview(productName: string) {
    await expect(
      this.page.locator('[data-test="inventory-item-name"]').filter({ hasText: productName })
    ).toBeVisible();
  }

  async clickFinish() {
    await this.page.click('[data-test="finish"]');
  }
}
