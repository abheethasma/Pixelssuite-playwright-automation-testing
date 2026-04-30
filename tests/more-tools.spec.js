const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const DOWNLOAD_DIR = path.join(process.cwd(), 'downloads');
const SCREENSHOT_DIR = path.join(process.cwd(), 'screenshots');

const ROTATE_FILE = path.join(process.cwd(), 'test-data', 'ocr_valid.png');
const FLIP_FILE = path.join(process.cwd(), 'test-data', 'ocr_valid.png');
const MEME_FILE = path.join(process.cwd(), 'test-data', 'meme_base.jpg');
const OCR_FILE = path.join(process.cwd(), 'test-data', 'img_valid1.jpg');

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

test.describe('PixelsSuite - More Tools', () => {
  test('AT_MT_01 - Rotate valid image to 180 degrees and download output', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'Rotate' }).click();

    await uploadWithChooser(
      page,
      page.locator('div').filter({ hasText: /^Select files$/ }).first(),
      ROTATE_FILE
    );

    await page.getByRole('slider').fill('180');

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download Rotated' }).click();
    const download = await downloadPromise;

    await saveDownloadedFile(download, 'AT_MT_01');
    await saveScreenshot(page, 'AT_MT_01_rotate_180_valid_image.png');
  });

  test('AT_MT_02 - Flip valid image and download PNG', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'Flip' }).click();

    await uploadWithChooser(
      page,
      page.locator('div').filter({ hasText: /^Select files$/ }).first(),
      FLIP_FILE
    );

    await page.getByText('Flip Horizontal').click();

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download PNG' }).click();
    const download = await downloadPromise;

    await saveDownloadedFile(download, 'AT_MT_02');
    await saveScreenshot(page, 'AT_MT_02_flip_valid_image.png');
  });

  test('AT_MT_03 - Create meme and download output', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'Meme' }).click();

    if (await page.getByText('Select an image to add meme').count()) {
      await page.getByText('Select an image to add meme').first().click().catch(() => {});
    }

    await uploadWithChooser(
      page,
      page.locator('div').filter({ hasText: /^Select files$/ }).first(),
      MEME_FILE
    );

    await page.getByRole('slider').nth(1).fill('8');
    await page.getByRole('slider').nth(2).fill('25');
    await page.getByRole('textbox', { name: 'Top text' }).fill('Hit YOU');

    await page.locator('canvas').click({
      position: { x: 156, y: 102 }
    });

    await page.getByRole('slider').first().fill('39');
    await page.getByRole('slider').nth(1).fill('9');
    await page.getByRole('slider').nth(2).fill('80');

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download Meme' }).click();
    const download = await downloadPromise;

    await saveDownloadedFile(download, 'AT_MT_03');
    await saveScreenshot(page, 'AT_MT_03_create_meme.png');
  });

  test('AT_MT_04 - Color Picker interaction and copy actions', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'Color Picker' }).click();

    await page.locator('canvas').nth(1).click({
      position: { x: 6, y: 113 }
    });

    await expect(page.getByRole('button', { name: 'Copy' }).first()).toBeVisible();

    await page.getByRole('button', { name: 'Copy' }).nth(1).click();
    await page.getByRole('button', { name: 'Copy' }).first().click();

    await saveScreenshot(page, 'AT_MT_04_color_picker.png');
  });

  test('AT_MT_05 - Image to Text OCR valid image', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'Image → Text' }).click();

    await uploadWithChooser(
      page,
      page.locator('div').filter({ hasText: /^Select image$/ }).first(),
      OCR_FILE
    );

    await page.getByRole('button', { name: 'Start OCR' }).click();
    await page.waitForTimeout(5000);

    await saveScreenshot(page, 'AT_MT_05_image_to_text_ocr.png');
  });

  test('AT_MT_06 - Image to Text empty submission validation', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    await page.getByRole('button', { name: 'Image → Text' }).click();

    const uploadPrompt = page.locator('div').filter({ hasText: /^Select image$/ }).first();

    await expect(uploadPrompt).toBeVisible();
    await expect(page.getByRole('button', { name: 'Start OCR' })).toHaveCount(0);

    await saveScreenshot(page, 'AT_MT_06_image_to_text_empty_validation.png');
  });
});