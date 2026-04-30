# PixelsSuite Playwright Automation

Playwright end-to-end automation project for testing the **PixelsSuite** web application.

This project was created for the **IT4100 – Software Quality Assurance** assignment and focuses on automating key workflows of the system using **Playwright**.

## Project Objective

The purpose of this project is to automate the testing of the PixelsSuite web application by validating its essential functionalities using Playwright. The automation covers multiple feature areas of the system, excluding the **Transliteration** feature.

## System Under Test

**Application:** PixelsSuite  
**Website:** https://www.pixelssuite.com/

## Automation Tool Used

**Playwright**

Playwright was selected because it provides:
- built-in test runner
- auto-waiting
- browser automation for modern web applications
- support for file upload and file download workflows
- easy screenshot capturing
- HTML report generation
- Codegen support for faster script creation

## Features Covered

The Playwright automation in this repository covers the following feature areas:

### 1. Document Converter
- Image → PDF
- PDF → Word
- Word → PDF

### 2. Resize
- Resize
- Batch Resize
- Image Enlarger

### 3. Crop
- To JPG
- To PNG
- To WebP

### 4. Compress
- Compress Image
- To GIF
- To PNG

### 5. Image Converter
- To JPG
- To PNG
- To WebP

### 6. PDF Editor
- Open editor with valid PDF
- Add text and download edited PDF
- Initial state validation
- Empty submission validation

### 7. More Tools
- Rotate
- Flip
- Meme
- Color Picker
- Image → Text

## Test Types Covered

The automated tests mainly focus on:
- positive test scenarios
- file upload validation
- output generation
- download validation
- empty submission validation
- initial UI state verification

## Project Structure

```text
pixelssuite-playwright-automation/
│
├── tests/
│   ├── document-converter.spec.js
│   ├── resize.spec.js
│   ├── crop.spec.js
│   ├── compress.spec.js
│   ├── image-converter.spec.js
│   ├── pdf-editor.spec.js
│   └── more-tools.spec.js
│
├── test-data/
│   ├── img_valid1.jpg
│   ├── pdf_valid_simple.pdf
│   ├── word_valid.docx
│   ├── resize_valid1.jpg
│   ├── resize_valid2.jpg
│   ├── crop_valid.jpg
│   ├── crop_valid.png
│   ├── crop_valid.webp
│   ├── compress_valid.jpg
│   ├── compress_valid.gif
│   ├── compress_valid.png
│   ├── convert_valid.jpg
│   ├── convert_valid.png
│   ├── editor_valid.pdf
│   ├── ocr_valid.png
│   ├── meme_base.jpg
│   └── img_valid1.jpg
│
├── downloads/
├── screenshots/
├── playwright.config.ts
├── package.json
└── README.md


Prerequisites

Make sure the following are installed before running the project:

Node.js
npm
Visual Studio Code
Playwright
Installation

Clone the repository and install dependencies:

git clone <your-repository-url>
cd pixelssuite-playwright-automation
npm install
npx playwright install
Running the Tests

Run all tests:

npx playwright test

Run a specific test file:

npx playwright test tests/document-converter.spec.js --project=chromium --workers=1 --headed --reporter=html

Example commands for other features:

npx playwright test tests/resize.spec.js --project=chromium --workers=1 --headed --reporter=html
npx playwright test tests/crop.spec.js --project=chromium --workers=1 --headed --reporter=html
npx playwright test tests/compress.spec.js --project=chromium --workers=1 --headed --reporter=html
npx playwright test tests/image-converter.spec.js --project=chromium --workers=1 --headed --reporter=html
npx playwright test tests/pdf-editor.spec.js --project=chromium --workers=1 --headed --reporter=html
npx playwright test tests/more-tools.spec.js --project=chromium --workers=1 --headed --reporter=html
Viewing the HTML Report

After execution, open the Playwright HTML report using:

npx playwright show-report
Output Artifacts

The project stores automation artifacts in these folders:

downloads/ → downloaded output files from test execution
screenshots/ → screenshots captured during test execution
playwright-report/ → Playwright HTML report
test-results/ → Playwright execution results
Notes
This project is intended for academic use as part of the IT4100 SQA assignment.
The Transliteration feature is not included in testing.
Some tests validate initial state and empty submission behavior instead of deep visual comparison.
Generated screenshots and reports can be used as evidence in the assignment documentation.

Author
Abheetha Dhananjaya
Playwright Automation
IT4100 – Software Quality Assurance
BSc (Hons) in Information Technology

License

This project is created for educational purposes.


Also add this `.gitignore` file to keep the repo clean:

```gitignore
node_modules/
playwright-report/
test-results/
downloads/
downloads/
