import { Page, expect } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyOrderConfirmation() {
    await expect(this.page).toHaveURL('/checkout-complete.html');
  }

  async returnToHome() {
    await this.page.locator('[data-test="back-to-products"]').click();
  }
}
