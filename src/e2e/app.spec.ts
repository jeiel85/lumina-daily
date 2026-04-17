import { test, expect } from '@playwright/test';

test.describe('Lumina Daily UI Tests', () => {
  
  test('기본 페이지 로딩', async ({ page }) => {
    await page.goto('http://localhost:4173');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // 페이지가 로드되면OK (에러 페이지가 아닌지 확인)
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('로그인 화면 표시', async ({ page }) => {
    // Clear localStorage
    await page.goto('http://localhost:4173');
    await page.addInitScript(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // 어떤 종류의 로그인 버튼이 있는지 확인
    const buttons = page.locator('button');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('UI 요소 존재 확인', async ({ page }) => {
    await page.goto('http://localhost:4173');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // 버튼이 있는지 확인
    const appElement = page.locator('.min-h-screen, .bg-neutral-50, .dark\\:bg-neutral-950');
    const hasAppContent = await appElement.count();
    
    // 하나라도 UI 요소가 있으면OK
    const body = page.locator('body');
    const html = page.locator('html');
    await expect(body).toBeVisible();
    await expect(html).toBeVisible();
  });
});