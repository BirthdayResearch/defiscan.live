context('/blocks/[blockId] on desktop', () => {
  before(() => {
    cy.visit('/address/df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzeg?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('AddressHeading.address').contains('df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzeg')
  })

  it('should have address summary', () => {
    cy.findByTestId('AddressSummaryTable.balance').contains(/\d+.\d+\sDFI/)
    cy.findByTestId('AddressSummaryTable.totalSent').contains(/\d+.\d+\sDFI/)
    cy.findByTestId('AddressSummaryTable.totalReceived').contains(/\d+.\d+\sDFI/)
    cy.findByTestId('AddressSummaryTable.txCount').contains(/\d+/)
  })

  it('should have AddressTransactionTable', function () {
    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('Tx ID').should('be.visible')
      cy.wrap(ele).findByText('Block').should('be.visible')
      cy.wrap(ele).findByText('Age').should('be.visible')
      cy.wrap(ele).findByText('Amount').should('be.visible')
    })
    cy.findAllByTestId('OverflowTable.Row').should('have.length', 10)
  })

  it('should have Show More button', function () {
    cy.findByTestId('AddressTransactionTable.showMoreBtn').should('have.text', 'SHOW MORE')
    cy.findByTestId('AddressTransactionTable.showMoreBtn').click()
    cy.findAllByTestId('OverflowTable.Row').should('have.length', 20)
  })
})

context('/blocks/[blockId] on mobile', () => {
  before(() => {
    cy.visit('/address/df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzeg?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('AddressHeading.address').contains('df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzeg')
  })

  it('should have address summary', () => {
    cy.findByTestId('AddressSummaryTable.balance').contains(/\d+.\d+\sDFI/)
    cy.findByTestId('AddressSummaryTable.totalSent').contains(/\d+.\d+\sDFI/)
    cy.findByTestId('AddressSummaryTable.totalReceived').contains(/\d+.\d+\sDFI/)
    cy.findByTestId('AddressSummaryTable.txCount').contains(/\d+/)
  })

  it('should have AddressTransactionTable', function () {
    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('Tx ID').should('be.visible')
      cy.wrap(ele).findByText('Block').should('be.visible')
      cy.wrap(ele).findByText('Age').should('be.visible')
      cy.wrap(ele).findByText('Amount').should('not.be.visible')
    })
    cy.findAllByTestId('OverflowTable.Row').should('have.length', 10)
  })

  it('should have Show More button', function () {
    cy.findByTestId('AddressTransactionTable.showMoreBtn').should('have.text', 'SHOW MORE')
    cy.findByTestId('AddressTransactionTable.showMoreBtn').click()
    cy.findAllByTestId('OverflowTable.Row').should('have.length', 20)
  })
})
