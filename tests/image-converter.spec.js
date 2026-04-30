const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const DOWNLOAD_DIR = path.join(process.cwd(), 'downloads');
const SCREENSHOT_DIR = path.join(process.cwd(), 'screenshots');

const PNG_FILE = path.join(process.cwd(), 'test-data', 'convert_valid.png');
const JPG_FILE = path.join(process.cwd(), 'test-data', 'convert_valid.jpg');

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

async function uploadWithChooser(page, filePath) {
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('div').filter({ hasText: /^Select files$/ }).first().click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(filePath);
}

async function saveDownloadedFile(download, prefix) {
  const savedPath = path.join(DOWNLOAD_DIR, `${prefix}_${download.suggestedFilename()}`);
  await download.saveAs(savedPath);
  expect(fs.existsSync(savedPath)).toBeTruthy();
}

test.describe('PixelsSuite - Image Converter', () => {
  test('AT_IC_01 - Convert to JPG valid image', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'To JPG' }).nth(1).click();

    await uploadWithChooser(page, PNG_FILE);

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;

    await saveDownloadedFile(download, 'AT_IC_01');
    await saveScreenshot(page, 'AT_IC_01_convert_to_jpg.png');
  });

  test('AT_IC_02 - Convert to PNG valid image', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'To PNG' }).nth(2).click();

    await uploadWithChooser(page, JPG_FILE);

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;

    await saveDownloadedFile(download, 'AT_IC_02');
    await saveScreenshot(page, 'AT_IC_02_convert_to_png.png');
  });

  test('AT_IC_03 - Convert to WebP valid image', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'To WebP' }).nth(1).click();

    await uploadWithChooser(page, PNG_FILE);

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;

    await saveDownloadedFile(download, 'AT_IC_03');
    await saveScreenshot(page, 'AT_IC_03_convert_to_webp.png');
  });

  test('AT_IC_04 - Image Converter empty submission validation', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'To JPG' }).nth(1).click();

    await expect(page.locator('div').filter({ hasText: /^Select files$/ }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Download' })).toHaveCount(0);

    await saveScreenshot(page, 'AT_IC_04_image_converter_empty_submission_validation.png');
  });
});