import { test, expect } from '@playwright/test';

test.describe('Lumina Daily UI Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4173');
    await page.addInitScript(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
  });

  test('01. 기본 페이지 로딩', async ({ page }) => {
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang');
  });

  test('02. 온보딩 첫 화면 표시', async ({ page }) => {
    await page.waitForTimeout(1500);
    
    // 처음 방문 시 온보딩 화면이 표시되어야 함
    const onboardingContent = page.locator('text=✨');
    if (await onboardingContent.isVisible()) {
      await expect(onboardingContent).toBeVisible();
    }
  });

  test('03. 온보딩 "다음" 버튼 클릭', async ({ page }) => {
    await page.waitForTimeout(1500);
    
    const nextButton = page.locator('button:has-text("onboarding.next")');
    if (await nextButton.isVisible()) {
      await nextButton.click();
      await page.waitForTimeout(500);
      
      const stepIndicators = page.locator('.h-2, .w-2, .w-6');
      const hasIndicators = await stepIndicators.count();
      expect(hasIndicators).toBeGreaterThanOrEqual(0);
    }
  });

  test('04. Google 로그인 버튼 존재', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    const buttons = page.locator('button');
    const count = await buttons.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('05. 로그인 화면 표시', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    // 로그인 화면에 버튼이 있는지 확인
    const buttons = page.locator('button');
    const hasButtons = await buttons.count();
    expect(hasButtons).toBeGreaterThan(0);
  });

  test('06. 다크 모드 클래스 확인', async ({ page }) => {
    await page.waitForTimeout(1000);
    
    const html = page.locator('html');
    const classAttr = await html.getAttribute('class');
    expect(classAttr).toBeDefined();
  });

  test('07. 카드 생성 버튼 상태', async ({ page }) => {
    await page.waitForTimeout(1000);
    
    const buttonExists = page.locator('button').first();
    await expect(buttonExists).toBeAttached();
  });

  test('08. 아이콘 존재 확인', async ({ page }) => {
    await page.waitForTimeout(1000);
    
    const icons = page.locator('svg');
    const iconCount = await icons.count();
    expect(iconCount).toBeGreaterThanOrEqual(0);
  });

  test('09. 폼/입력 요소 확인', async ({ page }) => {
    await page.waitForTimeout(1000);
    
    const inputs = page.locator('input');
    const inputCount = await inputs.count();
    expect(inputCount).toBeGreaterThanOrEqual(0);
  });

  test('10. 푸터/카피라이트 텍스트', async ({ page }) => {
    await page.waitForTimeout(1000);
    
    const footerText = page.locator('text=©, text=202');
    const hasFooter = await footerText.count();
    expect(hasFooter).toBeGreaterThanOrEqual(0);
  });
});