import {} from 'cypress'

  describe('Tokens page', function () {
  context('Tokens', () => {
    beforeEach(function () {
      cy.visit('/tokens')
      cy.intercept('GET', '/v0/regtest/**').as('getTokens')
      cy.wait('@getTokens')
    })

    it('should render Tokens table head information', function () {
      cy.get('div[data-testid="tokens_table_head"] > div:nth-child(1)').should('have.text', 'name')
      cy.get('div[data-testid="tokens_table_head"] > div:nth-child(2)').should('have.text', 'symbol')
      cy.get('div[data-testid="tokens_table_head"] > div:nth-child(3)').should('have.text', 'minted')
    })

    it('should render tokens list', function () {
      cy.get('[data-testid="tokens_listitem"]').should('exist')
      cy.get('[data-testid="tokens_listitem"] > div:nth-child(1)').should('exist')
      cy.get('[data-testid="tokens_listitem"] > div:nth-child(2)').should('exist')
    })

    it('should render loader component when pagination button is clicked', function () {
      cy.get('button[data-testid="token_next_btn"]').click()
      cy.get('div[data-testid="loader"]').should('be.visible')
    })

    it('should user to next list of tokens when next button is clicked', function () {
      let firstList;
      cy.get('[data-testid="tokens_listitem"] > div:nth-child(1)').should($token => {
        firstList = $token.text()
      })
      cy.get('button[data-testid="token_next_btn"]').click()
      cy.get('[data-testid="tokens_listitem"] > div:nth-child(1)').should($token => {
        const nextList = $token.text()
        expect(firstList).not.equal(nextList)
      })
    })
  })
})
