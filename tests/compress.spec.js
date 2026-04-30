const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const DOWNLOAD_DIR = path.join(process.cwd(), 'downloads');
const SCREENSHOT_DIR = path.join(process.cwd(), 'screenshots');

const JPG_FILE = path.join(process.cwd(), 'test-data', 'compress_valid.jpg');
const GIF_FILE = path.join(process.cwd(), 'test-data', 'compress_valid.gif');
const PNG_FILE = path.join(process.cwd(), 'test-data', 'compress_valid.png');

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function saveScreenshot(page, fileName) {
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, fileName),
    fullPage: true,
  });
}

async function uploadWithChooser(page, triggerLocator, filePath) {
  const fileChooserPromise = page.waitForEvent('filechooser');
  await triggerLocator.click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(filePath);
}

async function saveDownloadedFile(download, prefix) {
  const savedPath = path.join(DOWNLOAD_DIR, `${prefix}_${download.suggestedFilename()}`);
  await download.saveAs(savedPath);
  expect(fs.existsSync(savedPath)).toBeTruthy();
}

test.describe('PixelsSuite - Compress', () => {
  test('AT_CM_01 - Compress Image valid JPG', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'Compress Image' }).click();

    await uploadWithChooser(
      page,
      page.locator('div').filter({ hasText: /^Select files$/ }).first(),
      JPG_FILE
    );

    await page.getByRole('slider').fill('0.52');

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;

    await saveDownloadedFile(download, 'AT_CM_01');
    await saveScreenshot(page, 'AT_CM_01_compress_image_jpg.png');
  });

  test('AT_CM_02 - Compress To GIF valid GIF', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'To GIF' }).click();

    await uploadWithChooser(
      page,
      page.locator('div').filter({ hasText: /^Select GIF$/ }).first(),
      GIF_FILE
    );

    await page.getByRole('radio', { name: 'O2' }).check();

    const colorsText = page.getByText('Colors128');
    if (await colorsText.count()) {
      await colorsText.first().click().catch(() => {});
    }

    await page.getByRole('slider').first().fill('169');
    await page.getByRole('slider').nth(1).fill('90');

    await page.getByRole('button', { name: 'Compress', exact: true }).click();

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download GIF' }).click();
    const download = await downloadPromise;

    await saveDownloadedFile(download, 'AT_CM_02');
    await saveScreenshot(page, 'AT_CM_02_compress_to_gif.png');
  });

  test('AT_CM_03 - Compress To PNG valid PNG', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'To PNG' }).nth(1).click();

    await uploadWithChooser(
      page,
      page.locator('div').filter({ hasText: /^Select files$/ }).first(),
      PNG_FILE
    );

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download PNG' }).click();
    const download = await downloadPromise;

    await saveDownloadedFile(download, 'AT_CM_03');
    await saveScreenshot(page, 'AT_CM_03_compress_to_png.png');
  });

  test('AT_CM_04 - Compress Image empty submission validation', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'Compress Image' }).click();

    await expect(page.locator('div').filter({ hasText: /^Select files$/ }).first()).toBeVisible();

    await expect(page.getByRole('button', { name: 'Download' })).toHaveCount(0);

    await saveScreenshot(page, 'AT_CM_04_compress_empty_submission_validation.png');
  });
});