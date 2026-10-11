const {BasePage}= require('../basePage');
const {expect} = require('@playwright/test');
 const dnbTestErrorMsgs= require('../../test-error-msgs/dnbTestErrorMsgs')

class FondSubMenuPage extends BasePage{

    constructor(page){
        super(page);
        this.expectedPath = '/sparing/fond';
        
    }

}

module.exports = {FondSubMenuPage};