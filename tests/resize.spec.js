const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const DOWNLOAD_DIR = path.join(process.cwd(), 'downloads');
const SCREENSHOT_DIR = path.join(process.cwd(), 'screenshots');

const FILE1 = path.join(process.cwd(), 'test-data', 'resize_valid1.jpg');
const FILE2 = path.join(process.cwd(), 'test-data', 'resize_valid2.jpg');

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

test.describe('PixelsSuite - Resize', () => {
  test('AT_RS_01 - Resize valid image', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'Resize', exact: true }).click();

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('div').filter({ hasText: /^Select files$/ }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(FILE1);

    await page.getByRole('spinbutton').first().fill('680');
    await page.getByRole('spinbutton').nth(1).fill('1500');

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download PNG' }).click();
    const download = await downloadPromise;

    const savedPath = path.join(DOWNLOAD_DIR, `AT_RS_01_${download.suggestedFilename()}`);
    await download.saveAs(savedPath);
    expect(fs.existsSync(savedPath)).toBeTruthy();

    await saveScreenshot(page, 'AT_RS_01_resize_valid_image.png');
  });

  test('AT_RS_02 - Batch Resize valid images', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'Batch Resize' }).click();

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('div').filter({ hasText: /^Select images$/ }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles([FILE1, FILE2]);

    await page.getByPlaceholder('Width').fill('1280');
    await page.getByPlaceholder('Height').fill('720');

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Process & Download' }).click();
    const download = await downloadPromise;

    const savedPath = path.join(DOWNLOAD_DIR, `AT_RS_02_${download.suggestedFilename()}`);
    await download.saveAs(savedPath);
    expect(fs.existsSync(savedPath)).toBeTruthy();

    await saveScreenshot(page, 'AT_RS_02_batch_resize_valid_images.png');
  });

  test('AT_RS_03 - Image Enlarger valid image', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'Image Enlarger' }).click();

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('div').filter({ hasText: /^Select files$/ }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(FILE2);

    await page.getByRole('slider').fill('250');

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download PNG' }).click();
    const download = await downloadPromise;

    const savedPath = path.join(DOWNLOAD_DIR, `AT_RS_03_${download.suggestedFilename()}`);
    await download.saveAs(savedPath);
    expect(fs.existsSync(savedPath)).toBeTruthy();

    await saveScreenshot(page, 'AT_RS_03_image_enlarger_valid_image.png');
  });

  test('AT_RS_04 - Resize empty submission validation', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'Resize', exact: true }).click();

    // Initial state should show the upload area
    await expect(page.locator('div').filter({ hasText: /^Select files$/ })).toBeVisible();

    // No output/download button should exist before uploading a file
    await expect(page.getByRole('button', { name: 'Download PNG' })).toHaveCount(0);

    await saveScreenshot(page, 'AT_RS_04_resize_empty_submission_validation.png');
  });
});