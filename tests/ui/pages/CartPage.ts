import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyItemInCart(productName: string) {
    await expect(
      this.page.locator('[data-test="inventory-item-name"]').filter({ hasText: productName })
    ).toBeVisible();
  }

  async verifyItemNotInCart(productName: string) {
    await expect(
      this.page.locator('[data-test="inventory-item-name"]').filter({ hasText: productName })
    ).not.toBeVisible();
  }

  async proceedToCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }
}
