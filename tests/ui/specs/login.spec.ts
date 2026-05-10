import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

const validUsers = [
  'standard_user',
  'problem_user',
  'performance_glitch_user',
  'error_user',
  'visual_user',
];

test.describe('Authentication Feature', () => {
  for (const username of validUsers) {
    test(`TC_UI_01: Successful login - ${username}`, async ({ page }) => {
      //Arrange
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      //Act
      await loginPage.goto();
      await loginPage.login(username, 'secret_sauce');

      //Assert
      await inventoryPage.isOnInventoryPage();
    });
  }

  test('TC_UI_02: Login failure to Swag Labs (invalid credentials)', async ({ page }) => {
    //Arrange
    const loginPage = new LoginPage(page);

    //Act
    await loginPage.goto();
    await loginPage.login('invalid_user', 'invalid_password');

    //Assert
    expect(await loginPage.getErrorMessage()).toContain(
      'Username and password do not match any user in this service'
    );
  });

  test('TC_UI_03: Login failure to Swag Labs (locked out user)', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);

    //Act
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    //Assert
    expect(await loginPage.getErrorMessage()).toContain('Sorry, this user has been locked out.');
  });
});
