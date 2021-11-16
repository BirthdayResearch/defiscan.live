context('/tokens/1 (Ether) Desktop', () => {
  before(function () {
    cy.visit('/tokens/1?network=MainNet')
  })

  it('should have page header', function () {
    cy.findByTestId('PageHeading').should('contain.text', 'Ether')
  })

  it('should have <BreadCrums />', function () {
    cy.findByTestId('Breadcrumb')
      .should('have.length', 1)
      .should('contain.text', 'Scan')
      .should('contain.text', 'Tokens')
  })

  it('should have details in <AdaptiveList />  left', function () {
    cy.findAllByTestId('AdaptiveList').eq(0).then(ele => {
      cy.wrap(ele).should('contain.text', 'Category')
      cy.wrap(ele).should('contain.text', 'Symbol')
      cy.wrap(ele).should('contain.text', 'Net Supply')
      cy.wrap(ele).should('contain.text', 'Mintable')
      cy.wrap(ele).should('contain.text', 'Creation Tx')
      cy.wrap(ele).should('contain.text', 'Minted')
      cy.wrap(ele).should('contain.text', 'Owner\'s Address')
      cy.wrap(ele).should('contain.text', 'Creation Height')
    })
  })

  it('should have details in <AdaptiveList />  right', function () {
    cy.findAllByTestId('AdaptiveList').eq(1).then(ele => {
      cy.wrap(ele).should('contain.text', 'Decimal')
      cy.wrap(ele).should('contain.text', 'Limit')
      cy.wrap(ele).should('contain.text', 'LPS')
      cy.wrap(ele).should('contain.text', 'Tradable')
      cy.wrap(ele).should('contain.text', 'Finalized')
      cy.wrap(ele).should('contain.text', 'Destruction Height')
      cy.wrap(ele).should('contain.text', 'Destruction TX')
    })
  })
})

context('/tokens/1 (Ether) Mobile', () => {
  before(function () {
    cy.viewport('iphone-6')
    cy.visit('/tokens/1?network=MainNet')
  })

  it('should have page header', function () {
    cy.findByTestId('PageHeading').should('contain.text', 'Ether')
  })

  it('should have <BreadCrums />', function () {
    cy.findByTestId('Breadcrumb')
      .should('have.length', 1)
      .should('contain.text', 'Scan')
      .should('contain.text', 'Tokens')
  })

  it('should have details in <AdaptiveList />  left', function () {
    cy.findAllByTestId('AdaptiveList').eq(0).then(ele => {
      cy.wrap(ele).should('contain.text', 'Category')
      cy.wrap(ele).should('contain.text', 'Symbol')
      cy.wrap(ele).should('contain.text', 'Net Supply')
      cy.wrap(ele).should('contain.text', 'Mintable')
      cy.wrap(ele).should('contain.text', 'Creation Tx')
      cy.wrap(ele).should('contain.text', 'Minted')
      cy.wrap(ele).should('contain.text', 'Owner\'s Address')
      cy.wrap(ele).should('contain.text', 'Creation Height')
    })
  })

  it('should have details in <AdaptiveList />  right', function () {
    cy.findAllByTestId('AdaptiveList').eq(1).then(ele => {
      cy.wrap(ele).should('contain.text', 'Decimal')
      cy.wrap(ele).should('contain.text', 'Limit')
      cy.wrap(ele).should('contain.text', 'LPS')
      cy.wrap(ele).should('contain.text', 'Tradable')
      cy.wrap(ele).should('contain.text', 'Finalized')
      cy.wrap(ele).should('contain.text', 'Destruction Height')
      cy.wrap(ele).should('contain.text', 'Destruction TX')
    })
  })
})
