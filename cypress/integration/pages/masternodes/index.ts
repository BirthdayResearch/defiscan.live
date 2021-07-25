import {} from 'cypress'


describe('E2E Masternodes page', function () {
  context('masternodes', () => {
    beforeEach(function () {
      cy.visit('/masternodes')
      cy.intercept('GET', '/v0/regtest/**').as('getMasternodes')
      cy.wait('@getMasternodes')
    })

    it('should render page components', function () {
      cy.get('[data-testid="container"]').should('exist')

      cy.get('[data-testid="page_heading"]').should('exist')
      cy.get('[data-testid="page_heading"]').should('have.text', 'Masternodes')
      cy.get('select#masternodeSelect').should('exist')
    })

    it('should render masternode table head infomation', function () {
      cy.get('div[data-testid="mn_table_head"] > div:nth-child(1)').should('have.text', 'ownerAuthAddress')
      cy.get('div[data-testid="mn_table_head"] > div:nth-child(2)').should('have.text', 'operatorAuthAddress')
      cy.get('div[data-testid="mn_table_head"] > div:nth-child(3)').should('have.text', 'creationHeight')
      cy.get('div[data-testid="mn_table_head"] > div:nth-child(4)').should('have.text', 'resignHeight')
      cy.get('div[data-testid="mn_table_head"] > div:nth-child(5)').should('have.text', 'mintedBlocks')
      cy.get('div[data-testid="mn_table_head"] > div:nth-child(6)').should('have.text', 'state')
    })

    it('should render masternode list', function () {
      cy.get('[data-testid="masternode_item"]').should('exist')
      cy.get('[data-testid="masternode_item"] > div:nth-child(1)').should('exist')
      cy.get('[data-testid="masternode_item"] > div:nth-child(2)').should('exist')
      cy.get('[data-testid="masternode_item"] > div:nth-child(3)').should('exist')
      cy.get('[data-testid="masternode_item"] > div:nth-child(4)').should('exist')
      cy.get('[data-testid="masternode_item"] > div:nth-child(5)').should('exist')
      cy.get('[data-testid="masternode_item"] > div:nth-child(6)').should('exist')
    })

    it('should allow user to select masternode size', function () {
      cy.get('select#masternodeSelect').select('5')

      cy.intercept('GET', '/v0/regtest/masternodes?size=5').as('getMasternodesWithSelect')
      cy.wait('@getMasternodesWithSelect')

      cy.get('[data-testid="masternode_item"]').should(($mn) => {
        expect($mn).to.have.length(5)
      })
    })
  })
})
