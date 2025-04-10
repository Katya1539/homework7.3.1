const { test, expect } = require("@playwright/test");

test("successful login and password", async ({ page }) => { 
  await page.goto('https://netology.ru/?modal=sign_in');
  await page.fill('[placeholder="Email"]', 'erkenovakatya@mail.ru');
  await page.fill('[placeholder="Пароль"]', 'Loki1969');
  await page.click('[data-testid="login-submit-btn"]');
  await expect(page.url('https://netology.ru/profile/7858212')).toContain('/profile/');
  await expect(page.locator('h2:has-text("Мои курсы")')).toBeVisible();
});

test('Incorrect login or password', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
  await page.fill('[placeholder="Email"]', 'erkenovakatya@mail.ru');
  await page.fill('[placeholder="Пароль"]', 'Loki');
  await page.click('[data-testid="login-submit-btn"]');
  await expect(page.locator('[data-testid="login-error-hint"]')).toBeVisible();
  await expect(page.locator('[data-testid="login-error-hint"]')).toContainText('Вы ввели неправильно логин или пароль');
});
