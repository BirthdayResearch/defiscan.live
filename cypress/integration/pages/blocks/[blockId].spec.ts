context('/blocks/[blockId] on desktop', () => {
  before(() => {
    cy.visit('/blocks/d912f04251ba8410af8e7056da1a9d495b2bcf21ff70e503ad7c8423c1d7f6e9?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.get('h1').contains('Block #')
  })

  it('should have OverflowTable header information', function () {
    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('HASH').should('be.visible')
      cy.wrap(ele).findByText('TIMESTAMP').should('be.visible')
      cy.wrap(ele).findByText('CONFIRMATIONS').should('be.visible')
    })
  })
});

context('/blocks/[blockId] on mobile', () => {
  before(() => {
    cy.visit('/blocks/d912f04251ba8410af8e7056da1a9d495b2bcf21ff70e503ad7c8423c1d7f6e9?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.get('h1').contains('Block #')
  })

  it('should have OverflowTable header information', function () {
    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('HASH').should('be.visible')
      cy.wrap(ele).findByText('TIMESTAMP').should('not.be.visible')
    })
  })
})
