const { mkdir, rm } = require('node:fs/promises');
const { join, resolve } = require('node:path');
const { randomUUID } = require('node:crypto');

class ScreenshotUtils {
  constructor() {
    const browserChannel = process.env.BROWSER_CHANNEL || 'msedge';
    if (!['chrome', 'msedge'].includes(browserChannel)) {
      throw new Error('BROWSER_CHANNEL must be chrome or msedge.');
    }
    const root = resolve(__dirname, '../../../test-results/screenshots', browserChannel);
    this.directory = process.env.CUCUMBER_WORKER_ID === undefined
      ? root
      : join(root, `worker-${process.env.CUCUMBER_WORKER_ID}`);
  }

  async cleanDirectory() {
    await rm(this.directory, { recursive: true, force: true });
    await mkdir(this.directory, { recursive: true });
  }

  async capture(page) {
    await mkdir(this.directory, { recursive: true });
    const screenshotPath = join(this.directory, `scenario-${randomUUID()}.png`);
    return page.screenshot({ path: screenshotPath, fullPage: true });
  }
}

module.exports = { ScreenshotUtils };