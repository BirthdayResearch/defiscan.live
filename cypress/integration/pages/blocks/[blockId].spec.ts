context('/blocks/[blockId] on desktop', () => {
  before(() => {
<<<<<<< HEAD
    cy.visit('/blocks/f66c334c4aa6ea3f3dd18187447d16ae2c6f73941d80eab3ef0e2f1b10acd4c7?network=MainNet')
=======
    cy.visit('/blocks/d912f04251ba8410af8e7056da1a9d495b2bcf21ff70e503ad7c8423c1d7f6e9?network=MainNet')
>>>>>>> c886189 (Added some tests for block details page.)
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.get('h1').contains('Block #')
  })

<<<<<<< HEAD
  it('should have block hash', () => {
    cy.findByTestId('block-hash').should('have.text', 'f66c334c4aa6ea3f3dd18187447d16ae2c6f73941d80eab3ef0e2f1b10acd4c7')
  })

  it('should have block detail height', () => {
    cy.findByTestId('block-detail-height').should('have.text', '1130580')
  })

  it('should have block detail transaction-count', () => {
    cy.findByTestId('block-detail-transaction-count').should('have.text', '64')
  })

  it('should have block detail timestamp', () => {
    cy.findByTestId('block-detail-timestamp').should('have.text', 'Aug 25, 2021, 3:33:51 AM')
  })

  it('should have block detail confirmations', () => {
    cy.findByTestId('block-detail-confirmations').should('be.visible')
  })

  it('should have block detail difficulty', () => {
    cy.findByTestId('block-detail-difficulty').should('have.text', '16893394709.78455')
  })

  it('should have block detail size', () => {
    cy.findByTestId('block-detail-size').should('have.text', '18713')
  })
  
  it('should have block detail version', () => {
    cy.findByTestId('block-detail-version').should('have.text', '536870912')
  })

  it('should have block detail merkle root', () => {
    cy.findByTestId('block-detail-merkle-root').should('have.text', 'c0bf8aa08389c89f17296ba1d813f4741e25b7096ba924e0a141b6ea7d48f39e')
  })

=======
>>>>>>> c886189 (Added some tests for block details page.)
  it('should have OverflowTable header information', function () {
    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('HASH').should('be.visible')
      cy.wrap(ele).findByText('TIMESTAMP').should('be.visible')
      cy.wrap(ele).findByText('CONFIRMATIONS').should('be.visible')
    })
  })
<<<<<<< HEAD

  it('should CursorPagination.Next', function () {
    cy.findAllByTestId('OverflowTable.Cell').then((ele) => {
      cy.scrollTo('bottom')
      const pageOneFirstCell = ele[0].innerText
      cy.interceptServerSideWait(() => {
        cy.findByTestId('CursorPagination.Next').click()
      })
      cy.findAllByTestId('OverflowTable.Cell').then((pageTwoCells) => {
        expect(pageTwoCells[0].innerText).not.equals(pageOneFirstCell)
      })
    })
  })
=======
>>>>>>> c886189 (Added some tests for block details page.)
});

context('/blocks/[blockId] on mobile', () => {
  before(() => {
<<<<<<< HEAD
    cy.visit('/blocks/f66c334c4aa6ea3f3dd18187447d16ae2c6f73941d80eab3ef0e2f1b10acd4c7?network=MainNet')
=======
    cy.visit('/blocks/d912f04251ba8410af8e7056da1a9d495b2bcf21ff70e503ad7c8423c1d7f6e9?network=MainNet')
>>>>>>> c886189 (Added some tests for block details page.)
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.get('h1').contains('Block #')
  })

<<<<<<< HEAD
  it('should have heading', () => {
    cy.findByTestId('block-hash').should('have.text', 'f66c334c4aa6ea3f3dd18187447d16ae2c6f73941d80eab3ef0e2f1b10acd4c7')
  })

=======
>>>>>>> c886189 (Added some tests for block details page.)
  it('should have OverflowTable header information', function () {
    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('HASH').should('be.visible')
      cy.wrap(ele).findByText('TIMESTAMP').should('not.be.visible')
    })
  })
<<<<<<< HEAD
  it('should have block hash', () => {
    cy.findByTestId('block-hash').should('have.text', 'f66c334c4aa6ea3f3dd18187447d16ae2c6f73941d80eab3ef0e2f1b10acd4c7')
  })

  it('should have block detail height', () => {
    cy.findByTestId('block-detail-height').should('have.text', '1130580')
  })

  it('should have block detail transaction-count', () => {
    cy.findByTestId('block-detail-transaction-count').should('have.text', '64')
  })

  it('should have block detail timestamp', () => {
    cy.findByTestId('block-detail-timestamp').should('have.text', 'Aug 25, 2021, 3:33:51 AM')
  })

  it('should have block detail confirmations', () => {
    cy.findByTestId('block-detail-confirmations').should('be.visible')
  })

  it('should have block detail difficulty', () => {
    cy.findByTestId('block-detail-difficulty').should('have.text', '16893394709.78455')
  })

  it('should have block detail size', () => {
    cy.findByTestId('block-detail-size').should('have.text', '18713')
  })
  
  it('should have block detail version', () => {
    cy.findByTestId('block-detail-version').should('have.text', '536870912')
  })

  it('should have block detail merkle root', () => {
    cy.findByTestId('block-detail-merkle-root').should('have.text', 'c0bf8aa08389c89f17296ba1d813f4741e25b7096ba924e0a141b6ea7d48f39e')
  })


  it('should CursorPagination.Next', function () {
    cy.findAllByTestId('OverflowTable.Cell').then((ele) => {
      cy.scrollTo('bottom')
      const pageOneFirstCell = ele[0].innerText
      cy.interceptServerSideWait(() => {
        cy.findByTestId('CursorPagination.Next').click()
      })
      cy.findAllByTestId('OverflowTable.Cell').then((pageTwoCells) => {
        expect(pageTwoCells[0].innerText).not.equals(pageOneFirstCell)
      })
    })
  })
=======
>>>>>>> c886189 (Added some tests for block details page.)
})
