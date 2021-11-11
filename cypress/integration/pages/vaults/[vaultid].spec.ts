context('/vaults/[vaultid] on desktop', function () {
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

    it('should have OverflowTable header information', function () {
      cy.findByTestId('VaultDetailsDesktop.OwnersId').should('be.visible')
      cy.findByTestId('VaultDetailsDesktop.tcr').should('be.visible')
      cy.findByTestId('VaultDetailsDesktop.tlv').should('be.visible')
      cy.findByTestId('VaultDetailsDesktop.tcv').should('be.visible')
      cy.findByTestId('VaultDetailsDesktop.mcr').should('be.visible')
    })

    it('should have vault details in OverflowTable', function () {
      cy.findByTestId('VaultTableRow.OwnerId').should('have.text', 'eufhrhf9erh9')
      cy.findAllByTestId('OverflowTable.Row').then(ele => {
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
          cy.wrap(ele).findByText('Collateral Amount').should('be.visible')
          cy.wrap(ele).findByText('Default Defi token').should('be.visible')
        })
    })
  })

  context('Loan Details', () => {
    it('should Loan Details Heading', function () {
      cy.findByTestId('VaultLoansDesktop.Heading').should('have.text', 'Loan Details')
    })

    it('should OverflowTable Header Information', function () {
      cy.findByTestId('VaultLoansDesktop').findByTestId('OverflowTable.Header').then(ele => {
        cy.wrap(ele).findByText('Loan Taken').should('be.visible')
        cy.wrap(ele).findByText('Loan Id').should('be.visible')
      })
      cy.findByTestId('VaultLoansDesktop.LoanAmount').should('be.visible')
      cy.findByTestId('VaultLoansDesktop.TotalLoanInterest').should('be.visible')
    })
  })
})

context('/vaults/[vaultid] on mobile', function () {
  before(() => {
    cy.visit('/vaults/1')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
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

  context('Vault details ', () => {
    it('should Vault Details Heading', function () {
      cy.findAllByTestId('VaultDetailsCollapsibleSection.Heading').eq(0).should('have.text', 'Vault Details')
    })

    it('should have Vault Details', function () {
      cy.findAllByTestId('VaultDetailList').eq(1).then(ele => {
        cy.findByTestId('VaultDetailList.tlv').should('have.text', 'Total Loan Value (USD)')
        cy.wrap(ele).findByText('$60.0001824').should('be.visible')
      })
    })
  })

  context('Collateral details', function () {
    it('should Collateral Details Heading', function () {
      cy.findAllByTestId('VaultDetailsCollapsibleSection.Heading').eq(1).should('have.text', 'Collateral Details')
    })

    it('should have collateral details card', function () {
      cy.findAllByTestId('VaultDetailsCollapsibleSection')
        .eq(1)
        .findAllByTestId('CollateralCard')
        .eq(1)
        .then(ele => {
          cy.wrap(ele).findByText('Collateral Amount').should('be.visible')
          cy.wrap(ele).findByText('Default Defi token').should('be.visible')
        })
    })
  })

  context('Loan Details', function () {
    it('should Loan Details Heading', function () {
      cy.findAllByTestId('VaultDetailsCollapsibleSection.Heading').eq(2).should('have.text', 'Loan Details')
    })

    it('should have Loan details card', function () {
      cy.findAllByTestId('VaultDetailsCollapsibleSection')
        .eq(2)
        .findAllByTestId('VaultLoanDetailsCard')
        .eq(0)
        .then(ele => {
          cy.wrap(ele).findByText('TSLA').should('be.visible')
          cy.wrap(ele).findByText('View').should('be.visible')
          cy.wrap(ele).findByText('Loan Amount').should('be.visible')
          cy.wrap(ele).findByText('30.00009120TSLA').should('be.visible')
        })
    })
  })
})
