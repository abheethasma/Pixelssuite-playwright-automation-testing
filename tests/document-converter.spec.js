const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const DOWNLOAD_DIR = path.join(process.cwd(), 'downloads');
const SCREENSHOT_DIR = path.join(process.cwd(), 'screenshots');

const IMG_FILE = path.join(process.cwd(), 'test-data', 'img_valid1.jpg');
const PDF_FILE = path.join(process.cwd(), 'test-data', 'pdf_valid_simple.pdf');
const DOCX_FILE = path.join(process.cwd(), 'test-data', 'word_valid.docx');

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

test.describe('PixelsSuite - Document Converter', () => {
  test('AT_DC_01 - Image to PDF valid conversion', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');

    await page.getByRole('button', { name: 'Image → PDF' }).click();

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('div').filter({ hasText: /^Select Images$/ }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(IMG_FILE);

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Create PDF' }).click();
    const download = await downloadPromise;

    const suggestedFileName = download.suggestedFilename();
    await download.saveAs(path.join(DOWNLOAD_DIR, `AT_DC_01_${suggestedFileName}`));

    // Verify the downloaded file exists
    const savedPath = path.join(DOWNLOAD_DIR, `AT_DC_01_${suggestedFileName}`);
    expect(fs.existsSync(savedPath)).toBeTruthy();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'AT_DC_01_result.png'),
      fullPage: true,
    });
  });

  test('AT_DC_02 - PDF to Word valid conversion', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');

    await page.getByRole('button', { name: 'PDF → Word' }).click();

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('div').filter({ hasText: /^Select PDF$/ }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(PDF_FILE);

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Convert to Word' }).click();
    const download = await downloadPromise;

    const suggestedFileName = download.suggestedFilename();
    await download.saveAs(path.join(DOWNLOAD_DIR, `AT_DC_02_${suggestedFileName}`));

    const savedPath = path.join(DOWNLOAD_DIR, `AT_DC_02_${suggestedFileName}`);
    expect(fs.existsSync(savedPath)).toBeTruthy();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'AT_DC_02_result.png'),
      fullPage: true,
    });
  });

  test('AT_DC_03 - Word to PDF valid conversion', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');

    await page.getByRole('button', { name: 'Word → PDF' }).click();

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('div').filter({ hasText: /^Select Word$/ }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(DOCX_FILE);

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Convert to PDF' }).click();
    const download = await downloadPromise;

    const suggestedFileName = download.suggestedFilename();
    await download.saveAs(path.join(DOWNLOAD_DIR, `AT_DC_03_${suggestedFileName}`));

    const savedPath = path.join(DOWNLOAD_DIR, `AT_DC_03_${suggestedFileName}`);
    expect(fs.existsSync(savedPath)).toBeTruthy();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'AT_DC_03_result.png'),
      fullPage: true,
    });
  });

  test('AT_DC_04 - empty submission validation', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');

    await page.getByRole('button', { name: 'Image → PDF' }).click();

    const createPdfButton = page.getByRole('button', { name: 'Create PDF' });

    // Verify button is disabled when no file is uploaded
    await expect(createPdfButton).toBeDisabled();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'AT_DC_04_validation.png'),
      fullPage: true,
    });
  });
});