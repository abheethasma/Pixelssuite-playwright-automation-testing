const path = require('path');
const fs = require('fs');
const { expect } = require('@playwright/test');

const DOWNLOAD_DIR = path.join(process.cwd(), 'downloads');
const SCREENSHOT_DIR = path.join(process.cwd(), 'screenshots');

if (!fs.existsSync(DOWNLOAD_DIR)) fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function firstVisible(page, texts) {
  for (const text of texts) {
    const re = new RegExp(escapeRegExp(text), 'i');

    const candidates = [
      page.getByRole('link', { name: re }).first(),
      page.getByRole('button', { name: re }).first(),
      page.getByText(re).first(),
    ];

    for (const locator of candidates) {
      try {
        const count = await locator.count();
        if (count > 0) {
          const visible = await locator.isVisible().catch(() => false);
          if (visible) return locator;
        }
      } catch {
        // ignore and continue
      }
    }
  }

  throw new Error(`Could not find a visible element for any of: ${texts.join(', ')}`);
}

async function clickAny(page, texts) {
  const locator = await firstVisible(page, texts);
  await locator.scrollIntoViewIfNeeded().catch(() => {});
  await locator.click();
}

async function uploadWithChooser(page, triggerTexts, files) {
  const chooserPromise = page.waitForEvent('filechooser');
  await clickAny(page, triggerTexts);
  const chooser = await chooserPromise;
  await chooser.setFiles(files);
}

async function runDownloadAfterAction(page, actionTexts, savePrefix) {
  const downloadPromise = page.waitForEvent('download', { timeout: 120000 });
  await clickAny(page, actionTexts);
  const download = await downloadPromise;

  const savedPath = path.join(DOWNLOAD_DIR, `${savePrefix}_${download.suggestedFilename()}`);
  await download.saveAs(savedPath);

  expect(fs.existsSync(savedPath)).toBeTruthy();
  return savedPath;
}

async function expectDisabledAny(page, actionTexts) {
  const locator = await firstVisible(page, actionTexts);
  await expect(locator).toBeDisabled();
}

async function saveScreenshot(page, fileName) {
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, fileName),
    fullPage: true,
  });
}

async function scrollToFeatureCards(page) {
  await page.mouse.wheel(0, 700);
}

async function fillFirstVisibleNumberInputs(page, values) {
  const inputs = page.locator('input[type="number"]');
  const count = await inputs.count();

  for (let i = 0; i < Math.min(count, values.length); i++) {
    await inputs.nth(i).fill(String(values[i])).catch(() => {});
  }
}

module.exports = {
  DOWNLOAD_DIR,
  SCREENSHOT_DIR,
  clickAny,
  uploadWithChooser,
  runDownloadAfterAction,
  expectDisabledAny,
  saveScreenshot,
  scrollToFeatureCards,
  fillFirstVisibleNumberInputs,
};