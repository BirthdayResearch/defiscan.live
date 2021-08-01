import {} from 'cypress'

describe('Tokens page', function () {
  context('Tokens', () => {
    beforeEach(function () {
      cy.visit('/tokens')
      cy.wait(3000)
    })
    it('should render Tokens table head information', function () {
      cy.get('div[data-testid="tokens_table_head"] > div:nth-child(1)').should('have.text', 'name')
      cy.get('div[data-testid="tokens_table_head"] > div:nth-child(2)').should('have.text', 'symbol')
      cy.get('div[data-testid="tokens_table_head"] > div:nth-child(3)').should('have.text', 'minted')
    })

    it('should render tokens list', function () {
      cy.get('[data-testid="tokens_listitem"]').should('exist')
      cy.get('[data-testid="tokens_listitem"] > a:nth-child(1)').should('exist')
      cy.get('[data-testid="tokens_listitem"] > div:nth-child(2)').should('exist')
      cy.get('[data-testid="tokens_listitem"] > div:nth-child(3)').should('exist')
    })

    it('should take user to single token page when token name is clicked', function () {
      cy.get('[data-testid="tokens_listitem"]  a[data-testid="token_page_link_1"]').first().click()
      cy.location('pathname').should('include', '/tokens/')
    })
  })
  context('/token', () => {
    beforeEach(function () {
      cy.visit('/tokens')
      cy.wait(3000)
      cy.get('[data-testid="tokens_listitem"]  a[data-testid="token_page_link_1"]').first().click()
      cy.wait(3000)
    })

    it('should render token information', function () {
      cy.get('div[data-testid="page_container"]').should('exist')
      cy.get('div[data-testid="token_detailed_list"]').first().should('exist')
      cy.get('div[data-testid="token_detailed_list"]').last().should('exist')
    })

    it('should taker users back to tokens page when back button is clicked', function () {
      cy.get('button[data-testid="token_back_btn"]').first().click()

      cy.wait(1000)

      cy.location('pathname').should('equal', '/tokens')
      cy.get('div[data-testid="tokens_table_head"] > div:nth-child(1)').should('have.text', 'name')
      cy.get('div[data-testid="tokens_table_head"] > div:nth-child(2)').should('have.text', 'symbol')
      cy.get('div[data-testid="tokens_table_head"] > div:nth-child(3)').should('have.text', 'minted')
     })
  })

})
