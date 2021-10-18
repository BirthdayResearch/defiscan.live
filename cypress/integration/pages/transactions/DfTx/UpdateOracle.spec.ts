context('/transactions/[txid] - DfTx Update Oracle on desktop', () => {
    before(() => {
        cy.visit('/transactions/276a61762d0ba048999699a95bbb30d67a57bc99a650ca8d0a7d3e5d47e44ca5?network=MainNet')
    })

    beforeEach(() => {
        cy.viewport('macbook-13')
    })

    it('should have heading', () => {
        cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
    })

    it('should have DfTx type', () => {
        cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Update Oracle')
    })


    it('should have DfTxUpdateOracle Address', function () {
        cy.findByTestId('DfTxUpdateOracle.Address').should('have.text', 'df1qm7f2cx8vs9lqn8v43034nvckz6dxxpqezfh6dw')
    })

    it('should have DfTxUpdateOracle Oracle ID', function () {
        cy.findByTestId('DfTxUpdateOracle.OracleId').should('have.text', 'a47feba58a644d07603f65966d8779e5c87d85053c885fd91626a502cb92a367')
    })
})

context('/transactions/[txid] - DfTx Update Oracle on mobile', () => {
    before(() => {
        cy.visit('/transactions/276a61762d0ba048999699a95bbb30d67a57bc99a650ca8d0a7d3e5d47e44ca5?network=MainNet')
    })

    beforeEach(() => {
        cy.viewport('iphone-x')
    })

    it('should have heading', () => {
        cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
    })

    it('should have DfTx type', () => {
        cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Update Oracle')
    })


    it('should have DfTxUpdateOracle Address', function () {
        cy.findByTestId('DfTxUpdateOracle.Address').should('have.text', 'df1qm7f2cx8vs9lqn8v43034nvckz6dxxpqezfh6dw')
    })

    it('should have DfTxUpdateOracle Oracle ID', function () {
        cy.findByTestId('DfTxUpdateOracle.OracleId').should('have.text', 'a47feba58a644d07603f65966d8779e5c87d85053c885fd91626a502cb92a367')
    })
})
