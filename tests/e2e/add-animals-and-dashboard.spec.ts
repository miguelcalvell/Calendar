import { test, expect } from '@playwright/test'
test('añadir gallinas y ver cálculo en Dashboard', async ({ page }) => {
  await page.goto('/calendar/')
  await page.getByRole('button', { name: /Añadir animales/i }).click()
  await expect(page.getByText('Añadir animales')).toBeVisible()
  const countInput = page.getByLabel('Cantidad')
  await countInput.fill('3')
  await page.getByRole('button', { name: 'Guardar' }).click()
  await expect(page.getByText('Animales activos')).toBeVisible()
  await expect(page.getByText(/^3$/)).toBeVisible()
  await expect(page.getByText(/360 g/)).toBeVisible()
  await expect(page.getByText(/0.75 L/)).toBeVisible()
})
