import { test, expect } from "@playwright/test";

test("happy path: users list -> user detail from Open directory button", async ({ page }) => {
  await page.goto("http://localhost:3000");
  
  await page.click('text=Open directory');
  const userLink = page.getByRole("link", { name: "Leanne Graham" }).first();
  await expect(userLink).toBeVisible();
  await userLink.click();

  await expect(page).toHaveURL(/\/users\/\d+$/);
  await expect(page.getByText(/leanne graham/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /back to list/i })).toBeVisible();
});

test("happy path: users list -> user detail from Users Nav button", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.click('text=Users');
  const userLink = page.getByRole("link", { name: "Leanne Graham" }).first();
  await expect(userLink).toBeVisible();
  await userLink.click();

  await expect(page).toHaveURL(/\/users\/\d+$/);
  await expect(page.getByText(/leanne graham/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /back to list/i })).toBeVisible();
});