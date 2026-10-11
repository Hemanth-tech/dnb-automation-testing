const { mkdir, rm } = require('node:fs/promises');
const { join, resolve } = require('node:path');
const winston = require('winston');
const moment = require('moment-timezone');

let logger;

const customFormat = winston.format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}] : ${stack || message}`;
});

async function initialize({ clean = false } = {}) {
  if (logger) {
    if (clean) {
      throw new Error('Cannot clean logs after the logger has been initialized.');
    }
    return logger;
  }
  const browserChannel = process.env.BROWSER_CHANNEL || 'msedge';
  if (!['chrome', 'msedge'].includes(browserChannel)) {
    throw new Error('BROWSER_CHANNEL must be chrome or msedge.');
  }
  const logRoot = resolve(__dirname, '../../logging', browserChannel);
  const logDirectory = process.env.CUCUMBER_WORKER_ID === undefined
    ? logRoot
    : join(logRoot, `worker-${process.env.CUCUMBER_WORKER_ID}`);
  if (clean) {
    await rm(logDirectory, { recursive: true, force: true });
  }
  await mkdir(logDirectory, { recursive: true });

  logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.timestamp({ format: () => moment().tz('Europe/London').format() }),
      customFormat
    ),
    transports: [
      new winston.transports.Console({ level: 'info' }),
      new winston.transports.File({
        filename:join(logDirectory,'test_error.log'),
        maxfiles:5,
        maxsize:100*1024,
        level:'error'
      })
    ]
});
return logger;
}

function getLogger(){
    if(!logger){
        throw new Error('Intialize the logger in BeforeAll before accessing it.')
    }
    return logger;
}

module.exports = {initialize,getLogger};