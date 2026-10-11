const {BasePage}= require('../basePage');

class KortMenuPage extends BasePage{

    constructor(page){
        super(page);
        this.expectedPath = '/kort';
        this.kredittkortLink = page.locator('h2+a[href="/kort/kredittkort"]');
        
    }

    async openKredittKort(){
        const methodName = 'KortMenuPage_openKreditKort';
        this.logger.info(`${methodName}:openning KredittKort`);
        await this.kredittkortLink.click();
        this.logger.info(`${methodName}:openned KredittKort`);

    }
}

module.exports = {KortMenuPage};