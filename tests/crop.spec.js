const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const DOWNLOAD_DIR = path.join(process.cwd(), 'downloads');
const SCREENSHOT_DIR = path.join(process.cwd(), 'screenshots');

const JPG_FILE = path.join(process.cwd(), 'test-data', 'crop_valid.jpg');
const PNG_FILE = path.join(process.cwd(), 'test-data', 'crop_valid.png');
const WEBP_FILE = path.join(process.cwd(), 'test-data', 'crop_valid.webp');

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

async function fillCropCoordinates(page, xValue, yValue) {
  await page.getByRole('spinbutton', { name: 'X' }).fill(String(xValue));
  await page.getByRole('spinbutton', { name: 'Y' }).fill(String(yValue));
}

test.describe('PixelsSuite - Crop', () => {
  test('AT_CR_01 - Crop to JPG valid image', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'To JPG' }).first().click();

    await uploadWithChooser(page, JPG_FILE);
    await fillCropCoordinates(page, 10, 20);

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;

    await saveDownloadedFile(download, 'AT_CR_01');
    await saveScreenshot(page, 'AT_CR_01_crop_to_jpg.png');
  });

  test('AT_CR_02 - Crop to PNG valid image', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'To PNG' }).first().click();

    await uploadWithChooser(page, PNG_FILE);
    await fillCropCoordinates(page, 7, 9);

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;

    await saveDownloadedFile(download, 'AT_CR_02');
    await saveScreenshot(page, 'AT_CR_02_crop_to_png.png');
  });

  test('AT_CR_03 - Crop to WebP valid image', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'To WebP' }).first().click();

    await uploadWithChooser(page, WEBP_FILE);
    await fillCropCoordinates(page, 30, 80);

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;

    await saveDownloadedFile(download, 'AT_CR_03');
    await saveScreenshot(page, 'AT_CR_03_crop_to_webp.png');
  });

  test('AT_CR_04 - Crop empty submission validation', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'To JPG' }).first().click();

    await expect(page.locator('div').filter({ hasText: /^Select files$/ }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Download' })).toHaveCount(0);

    await saveScreenshot(page, 'AT_CR_04_crop_empty_submission_validation.png');
  });
});