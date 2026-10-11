const {ScreenshotUtils} = require('./screenshotUtils');


class UtilManager{
    constructor(){
        this.logger = require('./loggerUtils').getLogger();
        this.ScreenshotUtils=new ScreenshotUtils();
    
    }

    getLogger(){
        return this.logger;
    }

    getScreenshotUtils(){
        return this.ScreenshotUtils;
    }
}


module.exports = {UtilManager};