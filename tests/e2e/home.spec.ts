import { test, expect } from '@playwright/test'

test('home page title contains Rajat Lakhina', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Rajat Lakhina/)
})

test('hero heading reads Engineering Leader', async ({ page }) => {
  await page.goto('/')
  const h1 = page.locator('h1')
  await expect(h1).toContainText('Rajat')
})

test('hero description contains leadership framing', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('text=Engineering Leader')).toBeVisible()
})

test('skip to content link is in the DOM', async ({ page }) => {
  await page.goto('/')
  const skipLink = page.locator('a[href="#main-content"]')
  await expect(skipLink).toBeAttached()
})

test('meta description targets EM roles', async ({ page }) => {
  await page.goto('/')
  const meta = page.locator('meta[name="description"]')
  await expect(meta).toHaveAttribute('content', /engineering leader|engineering management/i)
})
