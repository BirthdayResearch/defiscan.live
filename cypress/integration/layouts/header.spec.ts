context('<Header/> on macbook-13', () => {
  before(() => {
    cy.visit('/?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have Nav Items', () => {
    cy.findByTestId('Desktop.HeaderLink.DEX').should('be.visible')
    cy.findByTestId('Desktop.HeaderLink.DEX').should('have.attr', 'href', '/dex')

    cy.findByTestId('Desktop.HeaderLink.Blocks').should('be.visible')
    cy.findByTestId('Desktop.HeaderLink.Blocks').should('have.attr', 'href', '/blocks')

    cy.findByTestId('Desktop.HeaderLink.Prices').should('be.visible')
    cy.findByTestId('Desktop.HeaderLink.Prices').should('have.attr', 'href', '/prices')

    cy.findByTestId('Desktop.HeaderLink.Tokens').should('be.visible')
    cy.findByTestId('Desktop.HeaderLink.Tokens').should('have.attr', 'href', '/tokens')

    cy.findByTestId('Desktop.HeaderLink.Masternodes').should('be.visible')
    cy.findByTestId('Desktop.HeaderLink.Masternodes').should('have.attr', 'href', '/masternodes')
  })

  it('should have Desktop.HeaderSearchBar', () => {
    cy.findByTestId('Desktop.HeaderSearchBar').should('be.visible')
  })
})

context('<Header/> on iphone-x', () => {
  before(() => {
    cy.visit('/?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have Nav Items and Searchbar', () => {
    cy.findByTestId('Header.OpenMenu').click()

    cy.findByTestId('Mobile.HeaderLink.DEX').should('be.visible')
    cy.findByTestId('Mobile.HeaderLink.DEX').should('have.attr', 'href', '/dex')

    cy.findByTestId('Mobile.HeaderLink.Blocks').should('be.visible')
    cy.findByTestId('Mobile.HeaderLink.Blocks').should('have.attr', 'href', '/blocks')

    cy.findByTestId('Mobile.HeaderLink.Prices').should('be.visible')
    cy.findByTestId('Mobile.HeaderLink.Prices').should('have.attr', 'href', '/prices')

    cy.findByTestId('Mobile.HeaderLink.Tokens').should('be.visible')
    cy.findByTestId('Mobile.HeaderLink.Tokens').should('have.attr', 'href', '/tokens')

    cy.findByTestId('Mobile.HeaderLink.Masternodes').should('be.visible')
    cy.findByTestId('Mobile.HeaderLink.Masternodes').should('have.attr', 'href', '/masternodes')

    cy.findByTestId('Mobile.HeaderSearchBar').should('be.visible')
  })
})
