const {BasePage}= require('../basePage');

class SparingMenuPage extends BasePage{

    constructor(page){
        super(page);
        this.expectedPath = '/sparing';
        this.fondLink = page.locator('a[href="/sparing/fond"]');
        
    }

    async openFond(){
        const methodName = 'SparingMenuPage_openFond';
        this.logger.info(`${methodName}:openning Fond`);
        await this.fondLink.click();
        this.logger.info(`${methodName}:openned Fond`);

    }
}

module.exports = {SparingMenuPage};