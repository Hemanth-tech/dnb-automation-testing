const { resolve } = require('node:path');
const dotenv = require('dotenv');
const { mkdirSync } = require('node:fs');

const environment = process.env.NODE_ENV || 'dnb.prod';
dotenv.config({path:resolve(__dirname, `../test-env-config/.env.${environment}`)});

const browserChannel = process.env.BROWSER_CHANNEL || 'msedge';
if (!['chrome', 'msedge'].includes(browserChannel)) {
  throw new Error('BROWSER_CHANNEL must be chrome or msedge.');
}

const reportDirectory = resolve(__dirname, '../test-results/reports', browserChannel);
mkdirSync(reportDirectory, { recursive: true });

const common = {
  paths: ['src/tests/features/**/*.feature'],
  require: [
    'src/hooks/hooks.js',
    'src/tests/step-definitions/**/*.js'
  ],
  format: [
    'progress',
    `json:test-results/reports/${browserChannel}/cucumber_report.json`,
    `html:test-results/reports/${browserChannel}/cucumber_report.html`
  ]
};

module.exports = {
  default: common
};