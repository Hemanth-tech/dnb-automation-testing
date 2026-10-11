const {resolve} = require('node:path')
const dotenv = require('dotenv');
const{BeforeAll,Before,After,AfterStep,setDefaultTimeout}= require('@cucumber/cucumber');
const{chromium} = require('@playwright/test')
const { POManager } = require('../pages/poManager');
const { ScreenshotUtils } = require('../helper/util/screenshotUtils');
const loggerUtils = require('../helper/util/loggerUtils');

const environment = process.env.NODE_ENV || 'dnb.prod';
dotenv.config({path:resolve(__dirname, `../../test-env-config/.env.${environment}`)});

const browserChannel = process.env.BROWSER_CHANNEL || 'msedge';
if (!['chrome', 'msedge'].includes(browserChannel)) {
  throw new Error('BROWSER_CHANNEL must be chrome or msedge.');
}
const screenshotUtils = new ScreenshotUtils();
let logger;

setDefaultTimeout(30_000);
BeforeAll({ timeout: 30_000 }, async function () {
  await screenshotUtils.cleanDirectory();
  logger = await loggerUtils.initialize({ clean: true });
});

Before({ timeout: 100_000 }, async function () {
  const runHeadless = process.env.HEADLESS?.toLowerCase() === 'true';

  this.browser = await chromium.launch({
    channel: browserChannel,
    headless: runHeadless,
    args: ['--disable-features=Translate']
  });
  this.context = await this.browser.newContext({
    baseURL: process.env.BASE_URL || undefined,
  });
  this.page = await this.context.newPage();
  this.poManager = new POManager(this.page);

  this.logger = logger;
});

AfterStep({ timeout: 30_000 }, async function ({ result }) {
  const screenshotMode = (process.env.SCREENSHOT_MODE || 'all').toLowerCase();
  if (screenshotMode === 'off' || !this.page || this.page.isClosed()) {
    return;
  }
  if (screenshotMode === 'failed' && result?.status !== Status.FAILED) {
    return;
  }

  try {
    await this.attach(await screenshotUtils.capture(this.page), 'image/png');
  } catch (error) {
    console.warn(`Unable to attach step screenshot: ${error.message}`);
  }
});

After({ timeout: 100_000 }, async function () {
  try {
    await this.context?.close();
  } finally {
    await this.browser?.close();
  }
});
