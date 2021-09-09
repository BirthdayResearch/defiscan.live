context('/anchors on macbook-16', () => {
    before(() => {
        cy.visit('/anchors?network=MainNet')
    })

    beforeEach(() => {
        cy.viewport('macbook-16')
    })

    it('should have page heading', () => {
        cy.get('h1').should('have.text', 'Anchor Blocks')
    })

    it('should have OverflowTable header information', function () {
        cy.findByTestId('OverflowTable.Header').then(ele => {
            cy.wrap(ele).should('contain.text', 'DEFICHAIN BLOCK')
            cy.wrap(ele).should('contain.text','BITCOIN BLOCK')
            cy.wrap(ele).should('contain.text','BLOCK TIME')
            cy.wrap(ele).should('contain.text','REWARD ADDRESS')
        })
    })
})

context('/anchors on iphone-x', () => {
    before(() => {
        cy.visit('/anchors?network=MainNet')
    })

    beforeEach(() => {
        cy.viewport('iphone-x')
    })

    it('should have page heading', () => {
        cy.get('h1').should('have.text', 'Anchor Blocks')
    })

    it('should have OverflowTable header information', function () {
        cy.findByTestId('OverflowTable.Header').then(ele => {
            cy.wrap(ele).should('contain.text', 'DEFICHAIN BLOCK')
            cy.wrap(ele).should('contain.text','BITCOIN BLOCK')
            cy.wrap(ele).should('contain.text','BLOCK TIME')
            cy.wrap(ele).should('contain.text','REWARD ADDRESS')
        })
    })
})
