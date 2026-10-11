const {BasePage}= require('../basePage');
const {expect} = require('@playwright/test');
 const dnbTestErrorMsgs= require('../../test-error-msgs/dnbTestErrorMsgs')

class BoliganSubMenuPage extends BasePage{

    constructor(page){
        super(page);
        this.expectedPath = '/lan/boliglan';
        this.header = page.getByRole('heading',{name:'Boliglån', level:1, exact:true});
        
    }

    async assertHeaderIsDisplayed(timeout=30_000){
        const methodName = 'BoliganSubMenuPage_assertHeaderIsDisplayed';
        this.logger.info(`${methodName}:verifying Boligan header is displayed`);
        await expect(this.header, dnbTestErrorMsgs.BOLIGLAN_HEADER_NOT_DISPLAYED).toBeVisible({timeout});
        this.logger.info(`${methodName}:verified Boligan header is displayed`);

    }
}

module.exports = {BoliganSubMenuPage};