context('/vaults/[vaultid] on desktop', () => {
    before(() => {
        cy.visit('/vaults/1')
    })

    beforeEach(() => {
        cy.viewport('macbook-16')
    })


    it('should have <BreadCrums />', function () {
        cy.findByTestId('Breadcrumb')
            .should('have.length', 1)
            .should('contain.text', 'Scan')
            .should('contain.text', 'Vaults')
    })

    it('should have page header', function () {
        cy.findByTestId('PageHeading').should('contain.text', 'Vault ID')
    })


    context('Vault Details', () => {
        it('should Vault Details Heading', function () {
            cy.findByTestId('VaultDetailsDesktop.Heading').should('have.text', 'Vault Details')
        })

        it('should have AdaptiveTable header information', function () {
            cy.findByTestId('VaultDetailsDesktop.OwnersId').should('be.visible')
            cy.findByTestId('VaultDetailsDesktop.tcr').should('be.visible')
            cy.findByTestId('VaultDetailsDesktop.tlv').should('be.visible')
            cy.findByTestId('VaultDetailsDesktop.tcv').should('be.visible')
            cy.findByTestId('VaultDetailsDesktop.mcr').should('be.visible')
        })

        it('should have vault details in AdaptiveTable', function () {
            cy.findByTestId('VaultTableRow.OwnerId').should('have.text', 'eufhrhf9erh9')
            cy.findAllByTestId('AdaptiveTable.Row').then(ele => {
                cy.wrap(ele).findByText('$60.0001824').should('be.visible')
                cy.wrap(ele).findByText('$10,000').should('be.visible')
                cy.wrap(ele).findByText('277.78%').should('be.visible')
                cy.wrap(ele).findAllByText('N/A').eq(0).should('be.visible')
            })
        })
    })


    context('Collateral Details', () => {
        it('should Collateral Details Heading', function () {
          cy.findByTestId('CollateralDetailsDesktop.Heading').should('have.text', 'Collateral Details')
        })

        it('should have collateral details card', function () {

            cy.findByTestId('CollateralDetailsDesktop')
                .findAllByTestId('CollateralCard')
                .eq(1)
                .then(ele => {
              cy.wrap(ele).findByText('collateral amount').should('be.visible')
              cy.wrap(ele).findByText('Default Defi token').should('be.visible')
          })
        })
    })


    context('Loan Details', () => {
        it('should Loan Details Heading', function () {
            cy.findByTestId('VaultLoansDesktop.Heading').should('have.text', 'Loan Details')
        })

        it('should Adaptive Header Information', function () {
          cy.findByTestId('VaultLoansDesktop').findByTestId('AdaptiveTable.Header').then(ele => {
              cy.wrap(ele).findByText('Loan Taken').should('be.visible')
              cy.wrap(ele).findByText('Loan Id').should('be.visible')
          })
            cy.findByTestId('VaultLoansDesktop.LoanAmount').should('be.visible')
            cy.findByTestId('VaultLoansDesktop.TotalLoanInterest').should('be.visible')
        })
    })
})
