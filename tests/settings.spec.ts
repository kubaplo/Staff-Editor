import { test, expect, Page } from '@playwright/test';
import { hideCookiesBanner } from './utils';

test('side menu with settings is not visible after page load', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await hideCookiesBanner(page);

  const button = await page.getByTitle("Settings");
  await expect(button).toBeVisible();

  await expect(page.getByText("Settings")).not.toBeVisible();
});

test('side menu with settings shows after clicking settings button', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await hideCookiesBanner(page);

  const button = await page.getByTitle("Settings");

  await expect(button).toBeVisible();
  
  await button.click();

  await expect(page.getByText("Settings")).toBeInViewport();
});