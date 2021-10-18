// context('<Link/> preserve querystring ?network=TestNet', () => {
//   beforeEach(function () {
//     cy.visit('/dex?network=TestNet')
//   })
//
//   it('should contain network querystring for /dex', function () {
//     cy.location().should((loc) => {
//       expect(loc.search).to.contains('network=TestNet')
//     })
//   })
//
//   it('should preserve network querystring when route to /prices', function () {
//     cy.interceptServerSideWait(() => {
//       cy.get('footer')
//         .findAllByText('Prices')
//         .should('exist')
//         .click()
//     })
//
//     cy.location().should((loc) => {
//       expect(loc.pathname).to.eq('/prices')
//       expect(loc.search).to.contains('network=TestNet')
//     })
//   })
// })
