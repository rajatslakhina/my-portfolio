import { test, expect } from '@playwright/test'

test('contact page has a form with name, email, message fields', async ({ page }) => {
  await page.goto('/contact')
  await expect(page.locator('input[name="name"], input[placeholder*="name" i]').first()).toBeVisible()
  await expect(page.locator('input[name="email"], input[type="email"]').first()).toBeVisible()
  await expect(page.locator('textarea').first()).toBeVisible()
})

test('contact page has Calendly booking link', async ({ page }) => {
  await page.goto('/contact')
  const calendlyLink = page.locator('a[href*="calendly"]')
  await expect(calendlyLink).toBeVisible()
})

test('contact form submission shows success state', async ({ page }) => {
  await page.route('**/api/contact', route =>
    route.fulfill({ status: 200, body: JSON.stringify({ success: true }) })
  )
  await page.goto('/contact')
  await page.locator('input[name="name"], input[placeholder*="name" i]').first().fill('Test User')
  await page.locator('input[type="email"]').first().fill('test@example.com')
  await page.locator('textarea').first().fill('This is a test message')
  await page.locator('button[type="submit"]').click()
  await expect(page.locator(':text-matches("sent|success|thank you", "i")')).toBeVisible({ timeout: 5000 })
})
