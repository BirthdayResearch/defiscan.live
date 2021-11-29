context('/transactions/[txid] - DfTx Composite Swap on desktop', () => {
  before(() => {
    cy.visit('/transactions/8958eb8541bf65a8604b828b4aac33bd2933f5879827b89d4dd25cb52bd6de61?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Composite Swap')
  })

  it('should have DftxCompositeSwap SwapFrom', () => {
    cy.findByTestId('DftxCompositeSwap.SwapFrom').within(() => {
      cy.findByTestId('DftxCompositeSwap.SwapFromTitle').should('have.text', 'Swap From')

      cy.findByTestId('DftxCompositeSwap.FromAddress').should('have.text', 'df1qcmmkar3spm3q2ts3v5g52xjwqdvtd2a8e72tzm')

      cy.findByTestId('DftxCompositeSwap.FromTokenSymbol').should('have.text', 'DUSD')

      cy.findByTestId('DftxCompositeSwap.FromTokenSymbol').should('be.visible')

      cy.findByTestId('DftxCompositeSwap.FromAmount').should('have.text', '0.00100000')
    })
  })

  it('should have DftxCompositeSwap SwapTo', () => {
    cy.findByTestId('DftxCompositeSwap.SwapTo').within(() => {
      cy.findByTestId('DftxCompositeSwap.SwapToTitle').should('have.text', 'Swap To')

      cy.findByTestId('DftxCompositeSwap.ToAddress').should('have.text', 'df1qcmmkar3spm3q2ts3v5g52xjwqdvtd2a8e72tzm')

      cy.findByTestId('DftxCompositeSwap.ToTokenSymbol').should('have.text', 'dBTC')

      cy.findByTestId('DftxCompositeSwap.ToTokenSymbol').should('be.visible')

      cy.findByTestId('DftxCompositeSwap.MaxPrice').should('have.text', '51500.00000000')
    })
  })

  it('should have DftxCompositeSwap SwapPath', () => {
    cy.findByTestId('DftxCompositeSwap.SwapPath').within(() => {
      cy.findByTestId('DftxCompositeSwap.SwapPathTitle').should('have.text', 'Swap Path')

      cy.findByTestId('DftxCompositeSwap.SwapPathDiv').should('be.visible')
    })
  })
})

context('/transactions/[txid] - DfTx Composite Swap on mobile', () => {
  before(() => {
    cy.visit('/transactions/8958eb8541bf65a8604b828b4aac33bd2933f5879827b89d4dd25cb52bd6de61?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Composite Swap')
  })

  it('should have DftxCompositeSwap SwapFrom', () => {
    cy.findByTestId('DftxCompositeSwap.SwapFrom').within(() => {
      cy.findByTestId('DftxCompositeSwap.SwapFromTitle').should('have.text', 'Swap From')

      cy.findByTestId('DftxCompositeSwap.FromAddress').should('have.text', 'df1qcmmkar3spm3q2ts3v5g52xjwqdvtd2a8e72tzm')

      cy.findByTestId('DftxCompositeSwap.FromTokenSymbol').should('have.text', 'DUSD')

      cy.findByTestId('DftxCompositeSwap.FromTokenSymbol').should('be.visible')

      cy.findByTestId('DftxCompositeSwap.FromAmount').should('have.text', '0.00100000')
    })
  })

  it('should have DftxCompositeSwap SwapTo', () => {
    cy.findByTestId('DftxCompositeSwap.SwapTo').within(() => {
      cy.findByTestId('DftxCompositeSwap.SwapToTitle').should('have.text', 'Swap To')

      cy.findByTestId('DftxCompositeSwap.ToAddress').should('have.text', 'df1qcmmkar3spm3q2ts3v5g52xjwqdvtd2a8e72tzm')

      cy.findByTestId('DftxCompositeSwap.ToTokenSymbol').should('have.text', 'dBTC')

      cy.findByTestId('DftxCompositeSwap.ToTokenSymbol').should('be.visible')

      cy.findByTestId('DftxCompositeSwap.MaxPrice').should('have.text', '51500.00000000')
    })
  })

  it('should have DftxCompositeSwap SwapPath', () => {
    cy.findByTestId('DftxCompositeSwap.SwapPath').within(() => {
      cy.findByTestId('DftxCompositeSwap.SwapPathTitle').should('have.text', 'Swap Path')

      cy.findByTestId('DftxCompositeSwap.SwapPathDiv').should('be.visible')
    })
  })
})
