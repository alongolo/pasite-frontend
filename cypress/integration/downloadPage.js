import '@testing-library/cypress/add-commands';
import * as fs from 'fs'

describe("Genes by Strains", () => {
    beforeEach(() => {
        cy.visit("/download");

    })

    afterEach(() => {
        cy.task('deleteFile', `report.csv`)
        console.log('test')
    })

    it("textbox class exists in DOM", () =>{
        cy.get(".textBox").should('exist');
    });
    it("nav-item class exists in DOM", () =>{
        cy.get(".nav-item").should('exist');
    });
    it("check text in DOM", () =>{
        cy.findByText('Select single/multiple strain/s:').should('exist')
    });
    it("download attempt", () =>{
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#\\33 ').uncheck();
        cy.get('#\\36 ').uncheck();
        cy.get('#\\39 ').uncheck();


        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(3) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get('#asynchronous-demo-option-5').click();
        cy.get(':nth-child(3) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get(':nth-child(6) > .btn').click();
        /* ==== End Cypress Studio ==== */

        /* ==== End Cypress Studio ==== */

        cy.readFile('cypress/downloads/report.csv').should('exist')
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#\\38 ').uncheck();
        cy.get('#\\37 ').uncheck();
        cy.get('#\\33 ').check();
        cy.get('#\\34 ').uncheck();
        cy.get('#\\35 ').uncheck();
        cy.get('#\\39 ').check();
        cy.get('[for="2"]').click();
        cy.get('#\\32 ').uncheck();
        cy.get('[for="6"]').click();
        cy.get('#\\36 ').check();
        cy.get('[for="7"]').click();
        cy.get('#\\37 ').check();
        cy.get('#\\38 ').check();
        cy.get('[for="2"]').click();
        cy.get('#\\32 ').check();


        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(3) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click({force: true});
        cy.get('#left-tabs-example-tabpane-first > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1) > .chkbxs > .container > :nth-child(1) > .col > div > .lbl').click();
        cy.get('#all').check();
        cy.get(':nth-child(6) > .btn').click();
        /* ==== End Cypress Studio ==== */
    });

    it("download error", () =>{
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#\\33 ').uncheck();
        cy.get('#\\36 ').uncheck();
        cy.get('#\\39 ').uncheck();
        // cy.get(':nth-child(2) > :nth-child(1) > :nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click({force: true});


        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(3) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get('#asynchronous-demo-option-3').click();
        cy.get(':nth-child(3) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();

        cy.intercept('GET', 'api/v1/genes/*', {
            statusCode: 500,
        })
        cy.get(':nth-child(6) > .btn').click();
        cy.get('.modal-body').should('be.visible')
        /* ==== End Cypress Studio ==== */


        /* ==== End Cypress Studio ==== */
    });

    it("No columns selected", () => {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(3) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get('#asynchronous-demo-option-3').click();
        cy.get(':nth-child(3) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get('#all').uncheck();
        cy.get(':nth-child(6) > .btn').click();
        cy.get(".modal-content").should("exist");
        cy.get('.modal-footer > .btn').click();
        cy.get(".modal-content").should("not.exist");
        /* ==== End Cypress Studio ==== */
    });

    it("download attempt using a file", () =>{
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(3) > div.col-sm-4 > :nth-child(1) > .textBox > .rowC > [style="position: relative; display: inline-block; text-align: left; opacity: 1; direction: ltr; border-radius: 14px; transition: opacity 0.25s ease 0s; touch-action: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); user-select: none;"] > .react-switch-handle').click();
        cy.get('#exampleFormControlFile1').attachFile("../fixtures/strains_assembly.txt");
        cy.get(':nth-child(6) > .btn').click();
        cy.readFile('cypress/downloads/report.csv').should('exist')
        /* ==== End Cypress Studio ==== */
    });

    it("download error attempt using a file", () =>{
        /* ==== Generated with Cypress Studio ==== */

        cy.get(':nth-child(3) > div.col-sm-4 > :nth-child(1) > .textBox > .rowC > [style="position: relative; display: inline-block; text-align: left; opacity: 1; direction: ltr; border-radius: 14px; transition: opacity 0.25s ease 0s; touch-action: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); user-select: none;"] > .react-switch-handle').click();
        cy.get('#exampleFormControlFile1').attachFile("../fixtures/ds.txt");
        cy.get(':nth-child(6) > .btn').click();
        cy.get('.modal-body').should('be.visible')
        /* ==== End Cypress Studio ==== */
    });



});

describe("Genes By Defense Systems", () => {
    beforeEach(() => {
        cy.visit("/download")
        cy.get('#left-tabs-example-tab-second').click();
    })

    afterEach(() => {
        cy.task('deleteFile', `report.csv`)
    })

    it("download attempt", () => {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#all2').uncheck();
        cy.get('#\\39 2').check();
        cy.get('#\\37 2').check();
        cy.get('[for="32"]').click();
        cy.get('#\\33 2').check();
        cy.get('[for="82"]').click();
        cy.get('#\\38 2').check();


        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get('#asynchronous-demo-option-3').click();
        cy.get(':nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get(':nth-child(5) > .btn').click();
        cy.readFile('cypress/downloads/genes_by_defense.csv').should('exist')
        cy.get('#\\34 2').check();
        cy.get('#\\33 2').uncheck();
        cy.get('#\\32 2').check();
        cy.get('#\\34 2').uncheck();
        cy.get('#\\35 2').check();
        cy.get('#\\36 2').check();
        cy.get('#\\35 2').uncheck();
        cy.get('#\\34 2').check();

        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click({force: true});
        cy.get('#all2').check();
        cy.get(':nth-child(5) > .btn').click();
        /* ==== End Cypress Studio ==== */
    });

    it("download error", () => {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#all2').uncheck();
        cy.get('#\\39 2').check();
        cy.get('#\\37 2').check();
        cy.get('[for="32"]').click();
        cy.get('#\\33 2').check();
        cy.get('[for="82"]').click();
        cy.get('#\\38 2').check();
        cy.get(':nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get('#asynchronous-demo-option-4').click();
        cy.get(':nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.intercept('GET', 'api/v1/genes/*', {
            statusCode: 500,
        })
        cy.get(':nth-child(5) > .btn').click();
        cy.get('.modal-body').should('be.visible')
        /* ==== End Cypress Studio ==== */

    });

    it("No columns selected", () => {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(".modal-content").should("not.exist");
        cy.get(':nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-2').click();
        cy.get('#asynchronous-demo-option-7').click();
        cy.get(':nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get('#all2').uncheck();
        cy.get(':nth-child(5) > .btn').click();
        cy.get(".modal-content").should("exist");
        cy.get('.modal-footer > .btn').click();
        cy.get(".modal-content").should("not.exist");
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#all2').check();
        /* ==== End Cypress Studio ==== */
    });

    it("download attempt using a file", () =>{
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > .rowC > [style="position: relative; display: inline-block; text-align: left; opacity: 1; direction: ltr; border-radius: 14px; transition: opacity 0.25s ease 0s; touch-action: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); user-select: none;"] > .react-switch-handle').click();
        // cy.get('#exampleFormControlFile1').click();
        cy.get('#exampleFormControlFile1').attachFile("../fixtures/ds.txt");
        cy.get('#all2').uncheck();
        cy.get('[for="52"]').click();
        cy.get('#\\35 2').check();
        cy.get('[for="22"]').click();
        cy.get('#\\32 2').check();
        cy.get('[for="72"]').click();
        cy.get('#\\37 2').check();
        cy.get('[for="82"]').click();
        cy.get('#\\38 2').check();
        cy.get(':nth-child(5) > .btn').click();
        /* ==== End Cypress Studio ==== */

        cy.readFile('cypress/downloads/genes_by_defense.csv').should('exist')
        cy.get(':nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > .rowC > [style="position: relative; display: inline-block; text-align: left; opacity: 1; direction: ltr; border-radius: 14px; transition: opacity 0.25s ease 0s; touch-action: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); user-select: none;"] > .react-switch-handle').click();
        cy.get(':nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-2').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get(':nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
    });

    it("download error attempt using a file", () =>{

        cy.get(':nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > .rowC > [style="position: relative; display: inline-block; text-align: left; opacity: 1; direction: ltr; border-radius: 14px; transition: opacity 0.25s ease 0s; touch-action: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); user-select: none;"] > .react-switch-handle').click();

        cy.get('#exampleFormControlFile1').attachFile("../fixtures/strains.txt");
        cy.get('#all2').uncheck();
        cy.get('[for="52"]').click();
        cy.get('#\\35 2').check();
        cy.get('[for="22"]').click();
        cy.get('#\\32 2').check();
        cy.get('[for="72"]').click();
        cy.get('#\\37 2').check();
        cy.get('[for="82"]').click();
        cy.get('#\\38 2').check();
        cy.get(':nth-child(5) > .btn').click();
        cy.get(".modal-content").should("exist");
        /* ==== End Cypress Studio ==== */

        /* ==== Generated with Cypress Studio ==== */
        cy.get('.modal-footer > .btn').click();
        cy.get(':nth-child(5) > .btn').click();
        cy.get('.modal').click();
        /* ==== End Cypress Studio ==== */
    });

});