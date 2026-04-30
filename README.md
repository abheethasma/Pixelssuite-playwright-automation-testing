<div align="center">

<img src="https://capsule-render.vercel.app/api?type=slice&color=0:0D9488,100:065F46&height=180&section=header&text=PixelsSuite%20Playwright%20Automation&fontSize=34&fontColor=ffffff&fontAlignY=45&desc=End-to-End%20Test%20Automation%20%7C%20IT4100%20SQA&descAlignY=68&descSize=15&fontAlign=35&descAlign=35" width="100%"/>

<!-- BADGES ROW 1 -->
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Chromium](https://img.shields.io/badge/Chromium-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)

<!-- BADGES ROW 2 -->
![Status](https://img.shields.io/badge/Status-✅%20Active-brightgreen?style=flat-square&labelColor=1a1a2e)
![Tests](https://img.shields.io/badge/Test%20Files-7%20Specs-EC4899?style=flat-square&labelColor=1a1a2e)
![Features](https://img.shields.io/badge/Features-7%20Areas-06B6D4?style=flat-square&labelColor=1a1a2e)
![License](https://img.shields.io/badge/License-Educational-F59E0B?style=flat-square&labelColor=1a1a2e)

<br/>

**[🌐 View Application](https://www.pixelssuite.com/)** &nbsp;•&nbsp; **[📊 HTML Report](#-viewing-the-html-report)** &nbsp;•&nbsp; **[🚀 Get Started](#-installation)**

</div>

---

## 📌 Table of Contents

| # | Section |
|---|---------|
| 1 | [🎯 Project Objective](#-project-objective) |
| 2 | [🖥️ System Under Test](#️-system-under-test) |
| 3 | [⚡ Why Playwright?](#-why-playwright) |
| 4 | [🗂️ Features Covered](#️-features-covered) |
| 5 | [🧪 Test Types Covered](#-test-types-covered) |
| 6 | [📂 Project Structure](#-project-structure) |
| 7 | [⚙️ Prerequisites](#️-prerequisites) |
| 8 | [🚀 Installation](#-installation) |
| 9 | [▶️ Running the Tests](#️-running-the-tests) |
| 10 | [📊 Viewing the HTML Report](#-viewing-the-html-report) |
| 11 | [📦 Output Artifacts](#-output-artifacts) |
| 12 | [📝 Notes](#-notes) |
| 13 | [👤 Author](#-author) |

---

## 🎯 Project Objective

> This project automates the testing of the **PixelsSuite** web application by validating its essential functionalities using **Playwright**.

Created for the **Software Quality Assurance** assignment, the automation covers **7 major feature areas**, ensuring reliable, repeatable test execution with full evidence capture — including screenshots, downloads, and HTML reports.

---

## 🖥️ System Under Test

<div align="center">

| 🔑 Property | 📋 Details |
|:---:|:---:|
| 🌐 **Application** | PixelsSuite |
| 🔗 **Website** | [pixelssuite.com](https://www.pixelssuite.com/) |
| 🛠️ **Automation Tool** | Playwright |
| 📁 **Total Test Files** | 7 Spec Files |
| 🗂️ **Feature Areas** | 7 Areas Covered |
| 🌍 **Browser** | Chromium |

</div>

---

## ⚡ Why Playwright?

<div align="center">

| ⚡ Feature | 💡 Benefit |
|:---|:---|
| ⏱️ **Auto-Waiting** | No flaky sleeps — waits for elements automatically |
| 📤 **File Workflows** | Built-in upload & download testing support |
| 📷 **Screenshots** | Easy capture at any point during test execution |
| 📊 **HTML Reports** | Rich built-in report generation out of the box |
| 🎬 **Codegen** | Record interactions to auto-generate test scripts |
| 🧩 **Multi-Browser** | Run across Chromium, Firefox & WebKit |

</div>

---

## 🗂️ Features Covered

<div align="center">

| 🎯 Feature | 📋 Sub-Tests |
|:---|:---|
| 📄 **Document Converter** | Image → PDF &nbsp;\|&nbsp; PDF → Word &nbsp;\|&nbsp; Word → PDF |
| 🔲 **Resize** | Resize &nbsp;\|&nbsp; Batch Resize &nbsp;\|&nbsp; Image Enlarger |
| ✂️ **Crop** | To JPG &nbsp;\|&nbsp; To PNG &nbsp;\|&nbsp; To WebP |
| 🗜️ **Compress** | Compress Image &nbsp;\|&nbsp; To GIF &nbsp;\|&nbsp; To PNG |
| 🔄 **Image Converter** | To JPG &nbsp;\|&nbsp; To PNG &nbsp;\|&nbsp; To WebP |
| 📝 **PDF Editor** | Open PDF &nbsp;\|&nbsp; Add Text & Download &nbsp;\|&nbsp; State Validation &nbsp;\|&nbsp; Empty Submission |
| 🛠️ **More Tools** | Rotate &nbsp;\|&nbsp; Flip &nbsp;\|&nbsp; Meme &nbsp;\|&nbsp; Color Picker &nbsp;\|&nbsp; Image → Text |

</div>

> ⚠️ **Note:** The **Transliteration** feature is intentionally excluded from this test suite.

---

## 🧪 Test Types Covered

<div align="center">

| 🧪 Test Type | 📝 Description |
|:---|:---|
| ✅ **Positive Scenarios** | Happy path flows for all features |
| 📤 **File Upload Validation** | Verifying correct file input handling |
| 📦 **Output Generation** | Confirming expected output is produced |
| ⬇️ **Download Validation** | Checking downloaded file availability |
| 🚫 **Empty Submission** | Handling forms submitted without input |
| 🖥️ **Initial UI State** | Verifying UI elements on page load |

</div>

---

## 📂 Project Structure

```
📦 Pixelssuite-playwright-automation-testing/
│
├── 📁 tests/
│   ├── 📄 document-converter.spec.js
│   ├── 📄 resize.spec.js
│   ├── 📄 crop.spec.js
│   ├── 📄 compress.spec.js
│   ├── 📄 image-converter.spec.js
│   ├── 📄 pdf-editor.spec.js
│   └── 📄 more-tools.spec.js
│
├── 📁 test-data/
│   ├── 🖼️  img_valid1.jpg            🖼️  resize_valid1.jpg
│   ├── 📄 pdf_valid_simple.pdf       🖼️  resize_valid2.jpg
│   ├── 📝 word_valid.docx            🖼️  crop_valid.jpg / .png / .webp
│   ├── 🖼️  compress_valid.jpg / .gif  🖼️  convert_valid.jpg / .png
│   ├── 📄 editor_valid.pdf           🖼️  ocr_valid.png
│   └── 🖼️  meme_base.jpg
│
├── 📁 downloads/           ← 📥 downloaded output files
├── 📁 screenshots/          ← 📸 test execution screenshots
├── 📁 playwright-report/    ← 📊 HTML report
├── 📁 test-results/         ← 📋 execution results
│
├── ⚙️  playwright.config.ts
├── 📦 package.json
└── 📖 README.md
```

---

## ⚙️ Prerequisites

Make sure the following are installed before running the project:

![Node.js](https://img.shields.io/badge/Node.js-Required-339933?style=flat-square&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-Required-CB3837?style=flat-square&logo=npm&logoColor=white)
![VS Code](https://img.shields.io/badge/VS%20Code-Recommended-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-Required-2EAD33?style=flat-square&logo=playwright&logoColor=white)

---

## 🚀 Installation

**① Clone the repository**
```bash
git clone <your-repository-url>
cd Pixelssuite-playwright-automation-testing
```

**② Install project dependencies**
```bash
npm install
```

**③ Install Playwright browsers**
```bash
npx playwright install
```

---

## ▶️ Running the Tests

**🔁 Run all tests at once:**
```bash
npx playwright test
```

**🎯 Run a specific feature:**
```bash
# 📄 Document Converter
npx playwright test tests/document-converter.spec.js --project=chromium --workers=1 --headed --reporter=html

# 🔲 Resize
npx playwright test tests/resize.spec.js --project=chromium --workers=1 --headed --reporter=html

# ✂️ Crop
npx playwright test tests/crop.spec.js --project=chromium --workers=1 --headed --reporter=html

# 🗜️ Compress
npx playwright test tests/compress.spec.js --project=chromium --workers=1 --headed --reporter=html

# 🔄 Image Converter
npx playwright test tests/image-converter.spec.js --project=chromium --workers=1 --headed --reporter=html

# 📝 PDF Editor
npx playwright test tests/pdf-editor.spec.js --project=chromium --workers=1 --headed --reporter=html

# 🛠️ More Tools
npx playwright test tests/more-tools.spec.js --project=chromium --workers=1 --headed --reporter=html
```

---

## 📊 Viewing the HTML Report

After test execution, open the Playwright HTML report with:

```bash
npx playwright show-report
```

---

## 📦 Output Artifacts

<div align="center">

| 📁 Folder | 📋 Contents |
|:---|:---|
| `downloads/` | 📥 Downloaded output files from test execution |
| `screenshots/` | 📸 Screenshots captured during test runs |
| `playwright-report/` | 📊 Playwright generated HTML report |
| `test-results/` | 📋 Raw Playwright execution results |

</div>

---

## 📝 Notes

> 💡 This project is intended for **academic use** as part of the IT4100 SQA assignment.

- ⚠️ The **Transliteration** feature is **not** included in this test suite.
- 🧪 Some tests validate **initial UI state** and **empty submission behavior** rather than visual comparison.
- 📸 Generated **screenshots** and **HTML reports** serve as evidence in the assignment documentation.
- 🎓 All test data files are stored in the `test-data/` folder for reproducibility.

---

## 👤 Author

<div align="center">

<br/>

![Author](https://img.shields.io/badge/✨%20Abheetha%20Dhananjaya-Playwright%20Automation%20Engineer-7C3AED?style=for-the-badge&labelColor=1a1a2e)

<br/>

![Course](https://img.shields.io/badge/Software%20Quality%20Assurance-EC4899?style=flat-square&labelColor=1a1a2e)
&nbsp;
![Degree](https://img.shields.io/badge/Degree-BSc%20(Hons)%20in%20IT-06B6D4?style=flat-square&labelColor=1a1a2e)

<br/><br/>

*🎓 Created for educational purposes · No commercial use intended*

<br/>

<!-- FOOTER WAVE BANNER -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:06B6D4,50:EC4899,100:7C3AED&height=120&section=footer&animation=fadeIn" width="100%"/>

</div>
