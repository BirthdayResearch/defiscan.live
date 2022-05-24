context('Dark mode toggle on desktop', () => {
  before(() => {
    cy.visit('/?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
    cy.clearLocalStorage('color-theme')
  })

  it('should have dark mode toggle', function () {
    cy.findAllByTestId('DarkModeToggle').eq(0).should('be.visible')
  })

  it('should toggle dark mode', function () {
    cy.findAllByTestId('DarkModeToggle').eq(0).click()
    cy.get('html').should('have.class', 'dark')
  })
})


context('Dark mode toggle on desktop', () => {
  before(() => {
    cy.visit('/?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
    cy.clearLocalStorage('color-theme')
  })

  it('should have dark mode toggle', function () {
    cy.findAllByTestId('DarkModeToggle').eq(1).should('be.visible')
  })

  it('should toggle dark mode', function () {
    cy.findAllByTestId('DarkModeToggle').eq(1).click()
    cy.get('html').should('have.class', 'dark')
  })
})
