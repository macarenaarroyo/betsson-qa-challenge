import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { MenuPage } from '../pages/MenuPage';

test.describe('Shopping Cart Feature', () => {
  test('TC_UI_04: Cart badge updates correctly when adding and removing products', async ({
    page,
  }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Act
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.verifyCartBadgeCount(1);
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await inventoryPage.verifyCartBadgeCount(2);
    await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');
    await inventoryPage.verifyCartBadgeCount(3);
    await inventoryPage.openShoppingCart();
    await cartPage.removeItemFromCart('Sauce Labs Bike Light');

    // Assert
    await inventoryPage.verifyCartBadgeCount(2);
    await cartPage.verifyItemInCart('Sauce Labs Backpack');
    await cartPage.verifyItemInCart('Sauce Labs Bolt T-Shirt');
    await cartPage.verifyItemNotInCart('Sauce Labs Bike Light');
  });

  test('TC_UI_05: Complete End-to-End Swag Labs checkout flow from product selection to order confirmation', async ({
    page,
  }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);
    const menuPage = new MenuPage(page);

    //Act
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await inventoryPage.openShoppingCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInformation('Eddie', 'Vedder', '98103');
    await checkoutPage.clickContinue();
    await checkoutOverviewPage.clickFinish();

    //Assert
    await checkoutCompletePage.verifyOrderConfirmation();

    //Cleanup
    await checkoutCompletePage.returnToHome();
    await menuPage.logout();
  });
});
