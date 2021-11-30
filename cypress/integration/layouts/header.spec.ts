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

    cy.findByTestId('Desktop.HeaderLink.Vaults').should('be.visible')
    cy.findByTestId('Desktop.HeaderLink.Vaults').should('have.attr', 'href', '/vaults')

    cy.findByTestId('Desktop.HeaderLink.Auctions').should('be.visible')
    cy.findByTestId('Desktop.HeaderLink.Auctions').should('have.attr', 'href', '/auctions')

    cy.findByTestId('Desktop.HeaderLink.Oracles').should('be.visible')
    cy.findByTestId('Desktop.HeaderLink.Oracles').should('have.attr', 'href', '/oracles')

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

    cy.findByTestId('Mobile.HeaderLink.Vaults').should('be.visible')
    cy.findByTestId('Mobile.HeaderLink.Vaults').should('have.attr', 'href', '/vaults')

    cy.findByTestId('Mobile.HeaderLink.Auctions').should('be.visible')
    cy.findByTestId('Mobile.HeaderLink.Auctions').should('have.attr', 'href', '/auctions')

    cy.findByTestId('Mobile.HeaderLink.Oracles').should('be.visible')
    cy.findByTestId('Mobile.HeaderLink.Oracles').should('have.attr', 'href', '/oracles')

    cy.findByTestId('Mobile.HeaderLink.Tokens').should('be.visible')
    cy.findByTestId('Mobile.HeaderLink.Tokens').should('have.attr', 'href', '/tokens')

    cy.findByTestId('Mobile.HeaderLink.Masternodes').should('be.visible')
    cy.findByTestId('Mobile.HeaderLink.Masternodes').should('have.attr', 'href', '/masternodes')

    cy.findByTestId('Mobile.HeaderSearchBar').should('be.visible')
  })
})
