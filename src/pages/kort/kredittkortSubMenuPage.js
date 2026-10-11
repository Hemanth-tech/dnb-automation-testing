const {BasePage}= require('../basePage');
const {expect} = require('@playwright/test');
 const dnbTestErrorMsgs= require('../../test-error-msgs/dnbTestErrorMsgs')

class KredittkortSubMenuPage extends BasePage{

    constructor(page){
        super(page);
        this.expectedPath = '/kort/kredittkort';
        this.header = page.getByRole('heading',{name:'Kredittkort', level:1, exact:true});
        
    }

    async assertHeaderIsDisplayed(timeout=30_000){
        const methodName = 'KredittkortSubMenuPage_assertHeaderIsDisplayed';
        this.logger.info(`${methodName}:verifying kredittkort header is displayed`);
        await expect(this.header, dnbTestErrorMsgs.KREDITTKORT_HEADER_NOT_DISPLAYED).toBeVisible({timeout});
        this.logger.info(`${methodName}:verified kredittkort header is displayed`);

    }
}

module.exports = {KredittkortSubMenuPage};