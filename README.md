# DNB Automation Testing

Browser tests using Playwright, Cucumber, JavaScript (CommonJS), and page objects

## Setup

1. Install Node.js and npm. This project has been tested with Node.js 20.11.1 and pins Cucumber to 11.3.0 for compatibility.
2. Install Google Chrome and Microsoft Edge locally. Tests use the installed browsers, not Playwright's downloaded Chromium.
3. Open a terminal in the project root and install dependencies

```powershell
node --version
npm --version
```
## Dependencies

| Package | Purpose |
| --- | --- |
| @cucumber/cucumber | Feature runner, steps, hooks, and reports |
| @playwright/test | Browser automation and assertions |
| cross-env | Cross-platform browser environment selection |
| npm-run-all2 | Sequential execution on both browsers |
| winston | Console and rotating file logs |
| moment-timezone | Europe/London log timestamps |
|dotenv|For setting env variables|

## Environment

Settings load from `test-env-config/.env.<NODE_ENV>`. If `NODE_ENV` is unset, `dnb.prod` is used. The selected file must exist and define `URL`, for example `URL=https://www.dnb.no`.

```powershell
$env:NODE_ENV = "dnb.prod"
$env:HEADLESS = "true"
```

Set `HEADLESS=false` for a visible browser. `SCREENSHOT_MODE` accepts `all` (default), `failed`, or `off`. These environment variables apply to the current terminal. 

## Execution

Run commands from the project root

```powershell
npm run dnbTest
npm run dnbTest:chrome
npm run dnbTest:edge
npm run dnbTest:allBrowsers
```

`dnbTest` defaults to Edge unless `BROWSER_CHANNEL` is set. The combined command runs Chrome first, then Edge, and continues after a failure. Its exit status fails if either browser fails.

Filter by tag or check step matching without browser execution:

```powershell
npm run dnbTest:allBrowsers -- --tags "@CookieConsent"
npm run dnbTest -- --tags "@MenuNavigation"
npm run dnbTest -- --tags "@Search"
npm run dnbTest -- --tags "@CurrencyCalculator"
npm run dnbTest:allBrowsers -- --dry-run
```

## Reports

HTML and JSON reports are generated under `test-results/reports/chrome/` and `test-results/reports/msedge/`. Each browser run overwrites its previous report. A dry run produces skipped results as evidence that browser tests passed.

```powershell
Start-Process "test-results/reports/msedge/cucumber_report.html"
Start-Process "test-results/reports/chrome/cucumber_report.html"
```

Expand image attachments in the HTML report. For Scenario Outlines, select an example-row link to inspect that execution. Background steps run for each example and may show multiple attachments in a grouped view.

Screenshots are saved under `test-results/screenshots/<browser>/`; logs under `logging/<browser>/`. Parallel workers use their own subfolders. Screenshots and logs are cleaned before each browser/worker and retained afterward. Generated artifact folders are Git-ignored.

## Browsers Tested

Full live suites have passed on installed Google Chrome (`chrome`) and Microsoft Edge (`msedge`).