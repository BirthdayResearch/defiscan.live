context('/address/[address] on desktop', () => {
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

  it('should have Balances', function () {
    cy.findByTestId('Balances.title').should('have.text', 'Balances')
    cy.findByTestId('Balances').within(() => {
      cy.findByTestId('OverflowTable.Header').then(ele => {
        cy.wrap(ele).findByText('TOKEN').should('be.visible')
        cy.wrap(ele).findByText('AMOUNT').should('be.visible')
        cy.wrap(ele).findByText('NAME').should('be.visible')
        cy.wrap(ele).findByText('CATEGORY').should('be.visible')
      })
      cy.findAllByTestId('OverflowTable.Row').should('have.length.at.least', 10)

      // it('should have Show More button', function () {
      //   cy.findByTestId('AddressBalanceTable.showMoreBtn').should('have.text', 'SHOW MORE')
      //   cy.findByTestId('AddressBalanceTable.showMoreBtn').click()
      //   cy.findAllByTestId('OverflowTable.Row').should('have.length.greaterThan', 10)
      // })
    })
  })

  it('should have Transactions', function () {
    cy.findByTestId('Transactions.title').should('have.text', 'Transactions')
    cy.findByTestId('Transactions').within(() => {
      cy.findByTestId('OverflowTable.Header').then(ele => {
        cy.wrap(ele).findByText('TX ID').should('be.visible')
        cy.wrap(ele).findByText('BLOCK').should('be.visible')
        cy.wrap(ele).findByText('AGE').should('be.visible')
        cy.wrap(ele).findByText('AMOUNT').should('be.visible')
      })
      cy.findAllByTestId('OverflowTable.Row').should('have.length', 10)

      it('should have Show More button', function () {
        cy.findByTestId('AddressTransactionTable.showMoreBtn').should('have.text', 'SHOW MORE')
        cy.findByTestId('AddressTransactionTable.showMoreBtn').click()
        cy.findAllByTestId('OverflowTable.Row').should('have.length', 20)
      })
    })
  })

  it('should have vaults', () => {
    cy.findByTestId('Vaults.title').should('have.text', 'Vaults')
    cy.findByTestId('Vaults.title').scrollIntoView()
    cy.findByTestId('Vaults.list').within(() => {
      cy.findByTestId('OverflowTable.Header').then(el => {
        cy.wrap(el).findByText('Vault ID').should('be.visible')
        cy.wrap(el).findByText('Status').should('be.visible')
        cy.wrap(el).findByText('Loan Taken').should('be.visible')
        cy.wrap(el).findByText('Loan Value (USD)').should('be.visible')
        cy.wrap(el).findByText('Collaterals').should('be.visible')
        cy.wrap(el).findByText('Collateral Value (USD)').should('be.visible')
        cy.wrap(el).findByText('Collateralization Ratio / Min.').should('be.visible')
      })
    })
  })
})

context('/address/[address] on desktop - invalid address', () => {
  before(() => {
    cy.visit('/address/df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzegASDDSA?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have warning banner', () => {
    cy.findByTestId('AddressHeading.AddressNotFoundHeading').should('have.text', 'The requested address df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzegASDDSA could not be found.')
  })
})

context('/address/[address] on mobile', () => {
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

  it('should have Balances', function () {
    cy.findByTestId('Balances.title').should('have.text', 'Balances')
    cy.findByTestId('Balances').within(() => {
      cy.findByTestId('OverflowTable.Header').then(ele => {
        cy.wrap(ele).findByText('TOKEN').should('be.visible')
        cy.wrap(ele).findByText('NAME').should('be.visible')
        cy.wrap(ele).findByText('AMOUNT').should('be.visible')
        cy.wrap(ele).findByText('CATEGORY').should('exist')
      })
      cy.findAllByTestId('OverflowTable.Row').should('have.length.at.least', 10)

      // it('should have Show More button', function () {
      //   cy.findByTestId('AddressBalanceTable.showMoreBtn').should('have.text', 'SHOW MORE')
      //   cy.findByTestId('AddressBalanceTable.showMoreBtn').click()
      //   cy.findAllByTestId('OverflowTable.Row').should('have.length.greaterThan', 10)
      // })
    })
  })

  it('should have Transactions', function () {
    cy.findByTestId('Transactions.title').should('have.text', 'Transactions')
    cy.findByTestId('Transactions').within(() => {
      cy.findByTestId('OverflowTable.Header').then(ele => {
        cy.wrap(ele).findByText('TX ID').should('be.visible')
        cy.wrap(ele).findByText('BLOCK').should('be.visible')
        cy.wrap(ele).findByText('AGE').should('be.visible')
        cy.wrap(ele).findByText('AMOUNT').should('exist')
      })
      cy.findAllByTestId('OverflowTable.Row').should('have.length', 10)

      it('should have Show More button', function () {
        cy.findByTestId('AddressTransactionTable.showMoreBtn').should('have.text', 'SHOW MORE')
        cy.findByTestId('AddressTransactionTable.showMoreBtn').click()
        cy.findAllByTestId('OverflowTable.Row').should('have.length', 20)
      })
    })
  })

  it('should have vaults', function () {
    cy.findByTestId('VaultMobileCard').should('contain.text', 'Vault ID')
    cy.findByTestId('VaultMobileCard.VaultStatus').should('be.visible')
    cy.findByTestId('VaultMobileCard.VaultStatus').should('contain.text', 'ACTIVE')
    cy.findByTestId('VaultMobileCard.Toggle').click()
    cy.findByTestId('VaultMobileCard.Loans').should('be.visible')
    cy.findByTestId('VaultMobileCard.LoansValue').should('be.visible')
    cy.findByTestId('VaultMobileCard.Collateral').should('be.visible')
    cy.findByTestId('VaultMobileCard.CollateralValue').should('be.visible')
    cy.findByTestId('VaultMobileCard.MinCollateralizationRatio').should('be.visible')
  })
})

context('/address/[address] on mobile - invalid address', () => {
  before(() => {
    cy.visit('/address/df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzegASDDSA?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have warning banner', () => {
    cy.findByTestId('AddressHeading.AddressNotFoundHeading').should('have.text', 'The requested address df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzegASDDSA could not be found.')
  })
})
