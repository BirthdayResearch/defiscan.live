context('/transactions/[txid] - DfTx pool Add Liquidity on desktop', () => {
    before(() => {
        cy.visit('/transactions/c940fd028bfb2f7dad1663b2c77ce203cbc5b49897e76b61472c9f76b81b3fa0?network=MainNet')
    })

    beforeEach(() => {
        cy.viewport('macbook-13')
    })

    it('should have heading', () => {
        cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
    })

    it('should have DfTx type', () => {
        cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Pool Add Liquidity')
    })

    it('should have DfTxAddPoolLiquidity shareAddress', async () => {
        cy.findByTestId('DfTxPoolAddLiquidity.shareAddress').should('have.text', '8cEN6YMPPg2GUeXN8RrfL7LXaSWoWw7a24')
    })

    it('should have DfTxAddPoolLiquidity token 1 ID', async () => {
        cy.findByTestId('DfTxPoolAddLiquidity.tokenId1').should('have.text', '0')
    })

    it('should have DfTxAddPoolLiquidity token 2 ID', async () => {
        cy.findByTestId('DfTxPoolAddLiquidity.tokenId2').should('have.text', '3')
    })

    it('should have DfTxAddPoolLiquidity token 1 Amount', async () => {
        cy.findByTestId('DfTxPoolAddLiquidity.tokenAmount1').should('have.text', '6.3e-7 DFI')
    })

    it('should have DfTxAddPoolLiquidity token 2 Amount', async () => {
        cy.findByTestId('DfTxPoolAddLiquidity.tokenAmount2').should('have.text', '0.00000205 DFI')
    })

})

context('/transactions/[txid] - DfTx pool Add Liquidity on mobile', () => {
    before(() => {
        cy.visit('/transactions/c940fd028bfb2f7dad1663b2c77ce203cbc5b49897e76b61472c9f76b81b3fa0?network=MainNet')
    })

    beforeEach(() => {
        cy.viewport('iphone-x')
    })

    it('should have heading', () => {
        cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
    })

    it('should have DfTx type', () => {
        cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Pool Add Liquidity')
    })

    it('should have DfTxAddPoolLiquidity shareAddress', async () => {
        cy.findByTestId('DfTxPoolAddLiquidity.shareAddress').should('have.text', '8cEN6YMPPg2GUeXN8RrfL7LXaSWoWw7a24')
    })

    it('should have DfTxAddPoolLiquidity token 1 ID', async () => {
        cy.findByTestId('DfTxPoolAddLiquidity.tokenId1').should('have.text', '0')
    })

    it('should have DfTxAddPoolLiquidity token 2 ID', async () => {
        cy.findByTestId('DfTxPoolAddLiquidity.tokenId2').should('have.text', '3')
    })

    it('should have DfTxAddPoolLiquidity token 1 Amount', async () => {
        cy.findByTestId('DfTxPoolAddLiquidity.tokenAmount1').should('have.text', '6.3e-7 DFI')
    })

    it('should have DfTxAddPoolLiquidity token 2 Amount', async () => {
        cy.findByTestId('DfTxPoolAddLiquidity.tokenAmount2').should('have.text', '0.00000205 DFI')
    })

})


