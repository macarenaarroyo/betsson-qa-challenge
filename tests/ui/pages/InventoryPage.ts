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

  async verifyCartBadgeCount() {
    return this.page.locator('[data-test="shopping_cart_badge"]').textContent();
  }

  async openShoppingCart() {
    await this.page.locator('[data-test="shopping_cart_link"]').click();
  }
}
