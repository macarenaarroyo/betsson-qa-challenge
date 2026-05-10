import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillFirstname(firstname: string) {
    await this.page.fill('[data-test=firstName]', firstname);
  }

  async fillLastname(lastname: string) {
    await this.page.fill('[data-test=lastName]', lastname);
  }

  async fillZipcode(zipcode: string) {
    await this.page.fill('[data-test=postalCode]', zipcode);
  }

  async clickContinue() {
    await this.page.click('[data-test=continue]');
  }

  async fillCheckoutInformation(firstname: string, lastname: string, zipcode: string) {
    await this.fillFirstname(firstname);
    await this.fillLastname(lastname);
    await this.fillZipcode(zipcode);
    await this.clickContinue();
  }
}
