Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (
    data = {
        firstName: 'Carlos',
        lastName: 'Silva',
        email: 'carlossilva@test.com',
        textArea: 'Teste com comando customizado massa padrão'
    }
    )=> {
    cy.get('#firstName').type(data.firstName).should('have.value', data.firstName)   
    cy.get('#lastName').type(data.lastName).should('have.value', data.lastName)
    cy.get('#email').type(data.email).should('have.value', data.email)
    cy.get('#open-text-area').type(data.textArea).should('have.value', data.textArea)
    cy.contains('button', 'Enviar').click()
}) 

// Alternatively, you can set default values in the command itself
Cypress.Commands.add('fillMandatoryFieldsAndSubmitDinamic', (firstName, lastName, email, textArea) =>{

    cy.get('#firstName').type(firstName).should('have.value', firstName)   
    cy.get('#lastName').type(lastName).should('have.value', lastName)
    cy.get('#email').type(email).should('have.value', email)
    cy.get('#open-text-area').type(textArea).should('have.value', textArea)
    cy.contains('button', 'Enviar').click()
})
