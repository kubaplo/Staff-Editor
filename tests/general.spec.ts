import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expect a specific tab title
  await expect(page).toHaveTitle(/Staff Editor/);
});

test('cookie banner is present', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page.getByText("This website uses cookies")).toBeVisible();
});

test('cookie banner can be hidden using "Accept necessary" button', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const button = await page.getByText("Accept necessary");

  await expect(button).toBeVisible();

  await button.click();

  await expect(page.getByText("This website uses cookies")).not.toBeVisible();
});

test('cookie banner can be hidden using "Accept all" button', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const button = await page.getByText("Accept all");

  await expect(button).toBeVisible();

  await button.click();

  await expect(page.getByText("This website uses cookies")).not.toBeVisible();
});

test('cookie banner cannot be hidden by clicking beyond the banner', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const blur = await page.getByLabel("background blur");
  await expect(blur).toBeVisible();

  await page.mouse.click(10, 10);

  await expect(page.getByText("This website uses cookies")).toBeVisible();
});