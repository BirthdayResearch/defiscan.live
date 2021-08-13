describe('Tokens Page', () => {
  beforeEach(function () {
    cy.visit('/tokens/?network=MainNet')
  })

  it('should render header information', function () {
    cy.get('h1[data-testid="page_title"]').should('have.text', 'Tokens')
    cy.get('div[data-testid="adaptive_table"] div[data-testid="adaptive_header"]  > div:nth-child(1)').should('have.text', 'TOKEN NAME')
    cy.get('div[data-testid="adaptive_table"] div[data-testid="adaptive_header"]  > div:nth-child(2)').should('have.text', 'SYMBOL')
    cy.get('div[data-testid="adaptive_table"] div[data-testid="adaptive_header"]  > div:nth-child(3)').should('have.text', 'CATEGORY')
    cy.get('div[data-testid="adaptive_table"] div[data-testid="adaptive_header"]  > div:nth-child(4)').should('have.text', 'MINTED')
  })

  it('should render tokens information', function () {
    cy.get('div[data-testid="adaptive_table"]  div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div:nth-child(2)').should('have.text', 'Tether USD')
    cy.get('div[data-testid="adaptive_table"]  div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > div:nth-child(2)').should('have.text', 'USDT')
    cy.get('div[data-testid="adaptive_table"]  div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(3) > div:nth-child(2)').should('have.text', 'DAT')
    cy.get('div[data-testid="adaptive_table"]  div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(4) > div:nth-child(2)').should('exist')
  })

  it('should render next list when next button is clicked', function () {
    const firstPage = cy.get('[data-testid="adaptive_table"]  div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div:nth-child(2)').should(($elem) => $elem.text())

    cy.get('a[data-testid="navigate_button_next"]').click().wait(200)
    cy.get('div[data-testid="adaptive_table"]  div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div:nth-child(2)').should(($elem) => {
      expect($elem.text()).not.equals(firstPage)
    })
  })

  it('should render previous list when previous button is clicked', function () {
    cy.get('a[data-testid="navigate_button_next"]').click().wait(200)

    const nextPage = cy.get('[data-testid="adaptive_table"]  div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div:nth-child(2)').should(($elem) => $elem.text())

    cy.get('a[data-testid="navigate_button_prev"]').click().wait(200)

    cy.get('div[data-testid="adaptive_table"]  div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div:nth-child(2)').should(($elem) => {
      expect($elem.text()).not.equals(nextPage)
    })
  })
})
