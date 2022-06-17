context('/address/[address] on desktop', () => {
  before(() => {
    cy.visit('/address/df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzeg?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have heading', () => {
    cy.findByTestId('AddressHeading.address').contains('df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzeg')
  })

  it('should have address summary', () => {
    cy.findByTestId('AddressSummaryTable.utxoBalance').contains(/\d+.\d+\sDFI/)
    cy.findByTestId('AddressSummaryTable.totalSent').contains(/\d+.\d+\sDFI/)
    cy.findByTestId('AddressSummaryTable.totalReceived').contains(/\d+.\d+\sDFI/)
    cy.findByTestId('AddressSummaryTable.txCount').contains(/\d+/)
  })

  it('should have Balances', function () {
    cy.findByTestId('Balances').within(() => {
      cy.findByTestId('CollapsibleSection.Heading').should('have.text', 'Balances')

      cy.findAllByTestId('AddressTokenCard').within(() => {
        cy.findByTestId('AddressTokenCard.TokenSymbol').should('be.visible')
        cy.findByTestId('AddressTokenCard.TokenName').should('be.visible')
        cy.findByTestId('AddressTokenCard.Type').should('be.visible').contains(/^[A-Z]{3}$/)
        cy.findByTestId('AddressTokenCard.Amount').should('be.visible').contains(/\d+.\d+/)
      })

      cy.findAllByTestId('AddressTokenCard').should('have.length.at.least', 10)
    })
  })

  it('should have Vaults', function () {
    cy.findByTestId('Vaults').within(() => {
      cy.findByTestId('CollapsibleSection.Heading').should('have.text', 'Vaults')

      it('should have Vaults OverflowTable', function () {
        it('should have OverflowTable header information', function () {
          cy.findByTestId('VaultsTable.VaultID').should('be.visible').should('have.text', 'Vault ID')

          cy.findByTestId('VaultsTable.Status').should('be.visible').should('have.text', 'Status')
          cy.findByTestId('VaultsTable.Status').within(() => {
            cy.findByTestId('InfoHoverPopover').should('be.visible')
          })

          cy.findByTestId('VaultsTable.Loans').should('be.visible').should('have.text', 'Loan Taken')

          cy.findByTestId('VaultsTable.LoansValue').should('be.visible').should('have.text', 'Loan Value (USD)')
          cy.findByTestId('VaultsTable.LoansValue').within(() => {
            cy.findByTestId('InfoHoverPopover').should('be.visible')
          })

          cy.findByTestId('VaultsTable.Collaterals').should('be.visible').should('have.text', 'Collaterals')

          cy.findByTestId('VaultsTable.CollateralValue').should('be.visible').should('have.text', 'Collateral Value (USD)')
          cy.findByTestId('VaultsTable.CollateralValue').within(() => {
            cy.findByTestId('InfoHoverPopover').should('be.visible')
          })

          cy.findByTestId('VaultsTable.CollateralizationRatios').should('be.visible').should('have.text', 'Collateralization Ratio / Min.')
          cy.findByTestId('VaultsTable.CollateralizationRatios').within(() => {
            cy.findByTestId('InfoHoverPopover').should('be.visible')
          })
        })

        it('should have 8 cells in each row', function () {
          cy.findAllByTestId('OverflowTable.Row').within(() => {
            cy.findAllByTestId('OverflowTable.Cell').should('have.length', 7).should('be.visible')
          })
        })
      })

      it('should have Show More button', function () {
        cy.findByTestId('AddressTransactionTable.showMoreBtn').should('have.text', 'SHOW MORE')
        cy.findByTestId('AddressTransactionTable.showMoreBtn').click()
        cy.findAllByTestId('OverflowTable.Row').should('have.length', 20)
      })
    })
  })

  it('should have Transactions', function () {
    cy.findByTestId('Transactions').within(() => {
      cy.findByTestId('CollapsibleSection.Heading').should('have.text', 'Transactions')

      it('should have Transactions OverflowTable', function () {
        cy.findByTestId('OverflowTable.Header').then(ele => {
          cy.wrap(ele).findByText('TX ID').should('be.visible')
          cy.wrap(ele).findByText('BLOCK').should('be.visible')
          cy.wrap(ele).findByText('AGE').should('be.visible')
          cy.wrap(ele).findByText('AMOUNT').should('be.visible')
        })
        cy.findAllByTestId('OverflowTable.Row').should('have.length', 10)
      })

      it('should have Show More button', function () {
        cy.findByTestId('AddressTransactionTable.showMoreBtn').should('have.text', 'SHOW MORE')
        cy.findByTestId('AddressTransactionTable.showMoreBtn').click()
        cy.findAllByTestId('OverflowTable.Row').should('have.length', 20)
      })
    })
  })
})

context('/address/[address] on desktop - invalid address', () => {
  before(() => {
    cy.visit('/address/df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzegASDDSA?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
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
    cy.findByTestId('AddressSummaryTable.utxoBalance').contains(/\d+.\d+\sDFI/)
    cy.findByTestId('AddressSummaryTable.totalSent').contains(/\d+.\d+\sDFI/)
    cy.findByTestId('AddressSummaryTable.totalReceived').contains(/\d+.\d+\sDFI/)
    cy.findByTestId('AddressSummaryTable.txCount').contains(/\d+/)
  })

  it('should have Balances', function () {
    cy.findByTestId('Balances').within(() => {
      cy.findByTestId('CollapsibleSection.Heading').should('have.text', 'Balances')

      cy.findAllByTestId('AddressTokenCard').within(() => {
        cy.findByTestId('AddressTokenCard.TokenSymbol').should('be.visible')
        cy.findByTestId('AddressTokenCard.TokenName').should('be.visible')
        cy.findByTestId('AddressTokenCard.Type').should('be.visible').contains(/^[A-Z]{3}$/)
        cy.findByTestId('AddressTokenCard.Amount').should('be.visible').contains(/\d+.\d+/)
      })

      cy.findAllByTestId('AddressTokenCard').should('have.length.at.least', 10)
    })
  })

  it('should have Vaults', function () {
    cy.findByTestId('Vaults').within(() => {
      cy.findByTestId('CollapsibleSection.Heading').should('have.text', 'Vaults')

      it('should have Vaults OverflowTable', function () {
        it('should have OverflowTable header information', function () {
          cy.findByTestId('VaultsTable.VaultID').should('be.visible').should('have.text', 'Vault ID')

          cy.findByTestId('VaultsTable.Status').should('be.visible').should('have.text', 'Status')
          cy.findByTestId('VaultsTable.Status').within(() => {
            cy.findByTestId('InfoHoverPopover').should('be.visible')
          })

          cy.findByTestId('VaultsTable.Loans').should('be.visible').should('have.text', 'Loan Taken')

          cy.findByTestId('VaultsTable.LoansValue').should('be.visible').should('have.text', 'Loan Value (USD)')
          cy.findByTestId('VaultsTable.LoansValue').within(() => {
            cy.findByTestId('InfoHoverPopover').should('be.visible')
          })

          cy.findByTestId('VaultsTable.Collaterals').should('be.visible').should('have.text', 'Collaterals')

          cy.findByTestId('VaultsTable.CollateralValue').should('be.visible').should('have.text', 'Collateral Value (USD)')
          cy.findByTestId('VaultsTable.CollateralValue').within(() => {
            cy.findByTestId('InfoHoverPopover').should('be.visible')
          })

          cy.findByTestId('VaultsTable.CollateralizationRatios').should('be.visible').should('have.text', 'Collateralization Ratio / Min.')
          cy.findByTestId('VaultsTable.CollateralizationRatios').within(() => {
            cy.findByTestId('InfoHoverPopover').should('be.visible')
          })
        })

        it('should have 8 cells in each row', function () {
          cy.findAllByTestId('OverflowTable.Row').within(() => {
            cy.findAllByTestId('OverflowTable.Cell').should('have.length', 7).should('be.visible')
          })
        })
      })

      it('should have Show More button', function () {
        cy.findByTestId('AddressTransactionTable.showMoreBtn').should('have.text', 'SHOW MORE')
        cy.findByTestId('AddressTransactionTable.showMoreBtn').click()
        cy.findAllByTestId('OverflowTable.Row').should('have.length', 20)
      })
    })
  })

  it('should have Transactions', function () {
    cy.findByTestId('Transactions').within(() => {
      cy.findByTestId('CollapsibleSection.Heading').should('have.text', 'Transactions')

      it('should have Transactions OverflowTable', function () {
        cy.findByTestId('OverflowTable.Header').then(ele => {
          cy.wrap(ele).findByText('TX ID').should('be.visible')
          cy.wrap(ele).findByText('BLOCK').should('be.visible')
          cy.wrap(ele).findByText('AGE').should('be.visible')
          cy.wrap(ele).findByText('AMOUNT').should('be.visible')
        })
        cy.findAllByTestId('OverflowTable.Row').should('have.length', 10)
      })

      it('should have Show More button', function () {
        cy.findByTestId('AddressTransactionTable.showMoreBtn').should('have.text', 'SHOW MORE')
        cy.findByTestId('AddressTransactionTable.showMoreBtn').click()
        cy.findAllByTestId('OverflowTable.Row').should('have.length', 20)
      })
    })
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
