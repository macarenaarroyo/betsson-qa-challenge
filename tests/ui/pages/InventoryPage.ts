import { Page, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isOnInventoryPage() {
    await expect(this.page).toHaveURL('/inventory.html');
  }

  async addProductToCart(productName: string) {
    const slug = productName.toLowerCase().replace(/ /g, '-');
    const locator = `[data-test="add-to-cart-${slug}"]`;
    await this.page.locator(locator).click();
  }

  async removeItemFromCart(productName: string) {
    const slug = productName.toLowerCase().replace(/ /g, '-');
    const locator = `[data-test="remove-${slug}"]`;
    await this.page.locator(locator).click();
  }

  async verifyCartBadgeCount(expectedCount: number) {
    if (expectedCount > 0) {
      // Badge should be visible and show correct count
      await expect(this.page.locator('[data-test="shopping-cart-badge"]')).toBeVisible();
      await expect(this.page.locator('[data-test="shopping-cart-badge"]')).toHaveText(
        String(expectedCount)
      );
    } else {
      // Badge should not be visible when cart is empty
      await expect(this.page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
    }
  }

  async openShoppingCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}
