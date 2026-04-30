const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const DOWNLOAD_DIR = path.join(process.cwd(), 'downloads');
const SCREENSHOT_DIR = path.join(process.cwd(), 'screenshots');
const PDF_FILE = path.join(process.cwd(), 'test-data', 'editor_valid.pdf');

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

async function saveEditorTopAreaScreenshot(page, fileName) {
  const canvas = page.locator('canvas').nth(1);
  await expect(canvas).toBeVisible({ timeout: 60000 });

  const box = await canvas.boundingBox();
  if (!box) {
    throw new Error('Could not get editor canvas bounding box');
  }

  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, fileName),
    clip: {
      x: box.x,
      y: box.y,
      width: box.width,
      height: Math.min(260, box.height),
    },
  });
}

async function openEditor(page) {
  await page.goto('https://www.pixelssuite.com/');
  await page.getByRole('button', { name: 'Open Editor →' }).click();
}

async function uploadPdf(page) {
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByRole('button', { name: 'Choose File' }).click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(PDF_FILE);

  await expect(page.locator('canvas').nth(1)).toBeVisible({ timeout: 60000 });
}

async function saveDownloadedFile(download, prefix) {
  const savedPath = path.join(DOWNLOAD_DIR, `${prefix}_${download.suggestedFilename()}`);
  await download.saveAs(savedPath);
  expect(fs.existsSync(savedPath)).toBeTruthy();
}

test.describe('PixelsSuite - PDF Editor', () => {
  test('AT_PE_01 - Open Editor with valid PDF', async ({ page }) => {
    await openEditor(page);
    await uploadPdf(page);

    await expect(page.locator('canvas').nth(1)).toBeVisible({ timeout: 60000 });
    await saveScreenshot(page, 'AT_PE_01_open_editor_valid_pdf.png');
  });

  test('AT_PE_02 - Add bold text and download edited PDF', async ({ page }) => {
    await openEditor(page);
    await uploadPdf(page);

    const editorCanvas = page.locator('canvas').nth(1);

    await page.getByRole('button', { name: 'Text', exact: true }).click();

    await editorCanvas.click({
      position: { x: 321, y: 58 }
    });

    const textArea = page.locator('textarea');
    await expect(textArea).toBeVisible({ timeout: 10000 });

    await textArea.fill('Playwright automation testing');

    await page.getByRole('button', { name: 'Bold' }).click();

    // Commit the text to the editor area
    await page.keyboard.press('Escape').catch(() => {});
    await page.waitForTimeout(800);

    await editorCanvas.click({
      position: { x: 360, y: 95 },
      force: true
    });

    await page.waitForTimeout(1200);

    // Cropped screenshot of the top editor area so the text is clearer
    await saveEditorTopAreaScreenshot(page, 'AT_PE_02_add_bold_text_clear_view.png');

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;

    await saveDownloadedFile(download, 'AT_PE_02');
  });

  test('AT_PE_03 - PDF Editor initial state visible', async ({ page }) => {
    await openEditor(page);

    await expect(page.getByRole('button', { name: 'Choose File' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Download' })).toBeVisible();

    await saveScreenshot(page, 'AT_PE_03_editor_initial_state.png');
  });

  test('AT_PE_04 - PDF Editor empty submission validation', async ({ page }) => {
    await openEditor(page);

    const downloadButton = page.getByRole('button', { name: 'Download' });

    await expect(page.getByRole('button', { name: 'Choose File' })).toBeVisible();
    await expect(downloadButton).toBeVisible();
    await expect(downloadButton).toBeDisabled();

    await saveScreenshot(page, 'AT_PE_04_editor_empty_submission_validation.png');
  });
});