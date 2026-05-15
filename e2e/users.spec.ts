import { test } from "@playwright/test";

test("E2E happy path users list -> user detail", async ({ page }) => {
  await page.goto("http://localhost:3000");
  
  await page.click('text=Open directory');
  await page.goto("http://localhost:3000/users");
});
