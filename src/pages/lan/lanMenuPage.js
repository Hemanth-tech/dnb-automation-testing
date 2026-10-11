const {BasePage}= require('../basePage');

class LanMenuPage extends BasePage{

    constructor(page){
        super(page);
        this.expectedPath = '/lan';
        this.boliglanLink = page.locator('a[href="/lan/boliglan"] div[role]');
        
    }

    async openBoliglan(){
        const methodName = 'LanMenuPage_openBoliglan';
        this.logger.info(`${methodName}:openning Boliglan`);
        await this.boliglanLink.click();
        this.logger.info(`${methodName}:openned Boliglan`);

    }
}

module.exports = {LanMenuPage};