import { test, expect } from '@playwright/test'

test('blog page loads without error', async ({ page }) => {
  await page.goto('/blog')
  await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 10000 })
  await expect(page.locator('text=Something went wrong')).not.toBeVisible()
})

test('blog page has no JavaScript errors on load', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', e => errors.push(e.message))
  await page.goto('/blog')
  await page.waitForTimeout(2000)
  expect(errors.filter(e => !e.includes('hydration'))).toHaveLength(0)
})
