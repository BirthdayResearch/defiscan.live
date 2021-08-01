import {} from 'cypress'


describe('Masternodes page', function () {
  context('masternodes', () => {
    beforeEach(function () {
      cy.visit('/masternodes')
      cy.wait(3000)
    })

    it('should render masternode table head infomation', function () {
      cy.get('div[data-testid="mn_table_head"] > div:nth-child(1)').should('have.text', 'OwnerAuthAddress')
      cy.get('div[data-testid="mn_table_head"] > div:nth-child(2)').should('have.text', 'OperatorAuthAddress')
      cy.get('div[data-testid="mn_table_head"] > div:nth-child(3)').should('have.text', 'CreationHeight')
      cy.get('div[data-testid="mn_table_head"] > div:nth-child(4)').should('have.text', 'ResignHeight')
      cy.get('div[data-testid="mn_table_head"] > div:nth-child(5)').should('have.text', 'MintedBlocks')
      cy.get('div[data-testid="mn_table_head"] > div:nth-child(6)').should('have.text', 'State')
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
  })
})
