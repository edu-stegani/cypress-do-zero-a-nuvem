describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preencher campos obrigatórios e enviar', () => {
    cy.get('#firstName').type('Eduardo').should('have.value', 'Eduardo')
    cy.get('#lastName').type('Testes').should('have.value', 'Testes')
    cy.get('#email').type('eduardo@testes.com').should('have.value', 'eduardo@testes.com')

    cy.get('#open-text-area')
    .should('be.visible')
    .type('Teste Cypress do Zero à Nuvem')
    .should('have.value', 'Teste Cypress do Zero à Nuvem')

    cy.contains('button', 'Enviar').click()

    cy.get('.success')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
  })

  it('teste preenchimento com delay', () => {
    const longText = Cypress._.repeat('Vai Corinthians!!!', 10)

    cy.get('#firstName').type('Eduardo').should('have.value', 'Eduardo')
    cy.get('#lastName').type('Testes').should('have.value', 'Testes')
    cy.get('#email').type('eduardo@testes.com').should('have.value', 'eduardo@testes.com')

    cy.get('#open-text-area')
    .should('be.visible')
    .type(longText, { delay: 0})
    .should('have.value', longText)

    cy.contains('button', 'Enviar').click()

    cy.get('.success')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
  })

  it('preencher campo email com formatação inválida e enviar', () => {
    cy.get('#firstName').type('Eduardo').should('have.value', 'Eduardo')
    cy.get('#lastName').type('Testes').should('have.value', 'Testes')
    cy.get('#email').type('eduardo@testes,com')

    cy.get('#open-text-area')
    .should('be.visible')
    .type('Teste email formatação incorreta')
    cy.contains('button', 'Enviar').click()

    cy.get('.error')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
  })

  it('campo telefone com valor não numerico', () => {
    cy.get('#phone')
    .type('abcdefg')
    .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Eduardo').should('have.value', 'Eduardo')
    cy.get('#lastName').type('Testes').should('have.value', 'Testes')
    cy.get('#email').type('eduardo@testes.com').should('have.value', 'eduardo@testes.com')

    cy.get('#phone-checkbox').check()

    cy.get('#open-text-area')
    .should('be.visible')
    .type('Teste telefone obrigatório')
    cy.contains('button', 'Enviar').click()

    cy.get('.error')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
  })

  it('preencho os campos e depois apaga para preencher com novo valor', () => {
    cy.get('#firstName').type('Eduardo').should('have.value', 'Eduardo')
    cy.get('#lastName').type('Testes').should('have.value', 'Testes')
    cy.get('#email').type('eduardo@testes.com').should('have.value', 'eduardo@testes.com')

    cy.get('#firstName').clear()
      .should('have.value', '')
      .type('Carlos')
      .should('have.value', 'Carlos')

    cy.get('#lastName').clear()
      .should('have.value', '')
      .type('Silva')
      .should('have.value', 'Silva')

    cy.get('#email').clear()
      .should('have.value', '')
      .type('carlossilva@uol.com')
      .should('have.value', 'carlossilva@uol.com')

  })

  it('envio do formulário sem preencher campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('.error')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
  })

  it('envio do formulário com comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('envio do formulário com comando customizado com objeto', () => {
    const data = {
      firstName: 'Ana',
      lastName: 'Pereira',
      email: 'ana@teste.com',
      textArea: 'Teste com comando customizado massa objeto'
    }

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')
  })

  it('envio do formulário com comando customizado com massa dinamica', () => {

    cy.fillMandatoryFieldsAndSubmitDinamic('João', 'Victor', 'joaov@uol.com', 'Massa dinamica')

    cy.get('.success').should('be.visible')
  })

  it('clicando no botão com o metodo contains', () => {

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu (nome)', () => {
    cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('Mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu indice (1)', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.checked')
  } )

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeofService => {
        cy.wrap(typeofService)
          .check()
          .should('have.checked')
      })
  } )

  it('desmarca cada tipo de atendimento', () => {
    cy.get('input[type="checkbox"][value="phone"]').check()
      .should('have.checked')
    cy.get('input[type="checkbox"][value="phone"]').uncheck()
      .should('not.be.checked')
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('have.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')  
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should( input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })     
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')  
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should( input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile') 
    cy.get('#file-upload')  
      .should('not.have.value')
      .selectFile('@sampleFile')
      .should( input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a',  'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
      
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a',  'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
      
    cy.url().should('include', 'privacy.html')

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    cy.contains('p', 'Talking About Testing').should('be.visible')
      
  })  

})