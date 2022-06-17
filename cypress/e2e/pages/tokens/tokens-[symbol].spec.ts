context('/tokens/1 (Ether) Desktop', () => {
  before(function () {
    cy.visit('/tokens/1?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have page header', function () {
    cy.findByTestId('PageHeading').should('contain.text', 'Ether')
  })

  it('should have <BreadCrums />', function () {
    cy.findByTestId('Breadcrumb')
      .should('have.length', 1)
      .should('contain.text', 'Scan')
      .should('contain.text', 'Tokens')
  })

  it('should have details in <AdaptiveList />  left', function () {
    cy.findAllByTestId('AdaptiveList').eq(0).then(ele => {
      cy.wrap(ele).should('contain.text', 'Category')
      cy.wrap(ele).should('contain.text', 'Symbol')
      cy.wrap(ele).should('contain.text', 'Mintable')
      cy.wrap(ele).should('contain.text', 'Burned')
      cy.wrap(ele).should('contain.text', 'Net Supply')
      cy.wrap(ele).should('contain.text', 'Creation Tx')
      cy.wrap(ele).should('contain.text', 'Minted')
      cy.wrap(ele).should('contain.text', 'Creation Height')
    })
  })

  it('should have details in <AdaptiveList />  right', function () {
    cy.findAllByTestId('AdaptiveList').eq(1).then(ele => {
      cy.wrap(ele).should('contain.text', 'Decimal')
      cy.wrap(ele).should('contain.text', 'Limit')
      cy.wrap(ele).should('contain.text', 'LPS')
      cy.wrap(ele).should('contain.text', 'Tradable')
      cy.wrap(ele).should('contain.text', 'Finalized')
      cy.wrap(ele).should('contain.text', 'Destruction Height')
      cy.wrap(ele).should('contain.text', 'Destruction TX')
      cy.wrap(ele).should('contain.text', 'Backing Address')
    })
  })

  it('should redirect to individual token page', () => {
    cy.visit('/tokens/DFI')
    cy.findByText('DFI').should('exist')

    cy.visit('/tokens/dBCH-DFI')
    cy.findByText('dBCH-DFI').should('exist')

    cy.visit('/tokens/eth-dfi-191')
    cy.findByText('ETH-DFI').should('exist')
    cy.findByText('DCT').should('exist')

    cy.visit('/tokens/dbtc')
    cy.findByText('dBTC').should('exist')
  })
})

context('/tokens/1 (Ether) Mobile', () => {
  before(function () {
    cy.visit('/tokens/1?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-6')
  })

  it('should have page header', function () {
    cy.findByTestId('PageHeading').should('contain.text', 'Ether')
  })

  it('should have <BreadCrums />', function () {
    cy.findByTestId('Breadcrumb')
      .should('have.length', 1)
      .should('contain.text', 'Scan')
      .should('contain.text', 'Tokens')
  })

  it('should have details in <AdaptiveList />  left', function () {
    cy.findAllByTestId('AdaptiveList').eq(0).then(ele => {
      cy.wrap(ele).should('contain.text', 'Category')
      cy.wrap(ele).should('contain.text', 'Symbol')
      cy.wrap(ele).should('contain.text', 'Mintable')
      cy.wrap(ele).should('contain.text', 'Burned')
      cy.wrap(ele).should('contain.text', 'Net Supply')
      cy.wrap(ele).should('contain.text', 'Creation Tx')
      cy.wrap(ele).should('contain.text', 'Minted')
      cy.wrap(ele).should('contain.text', 'Creation Height')
    })
  })

  it('should have details in <AdaptiveList />  right', function () {
    cy.findAllByTestId('AdaptiveList').eq(1).then(ele => {
      cy.wrap(ele).should('contain.text', 'Decimal')
      cy.wrap(ele).should('contain.text', 'Limit')
      cy.wrap(ele).should('contain.text', 'LPS')
      cy.wrap(ele).should('contain.text', 'Tradable')
      cy.wrap(ele).should('contain.text', 'Finalized')
      cy.wrap(ele).should('contain.text', 'Destruction Height')
      cy.wrap(ele).should('contain.text', 'Destruction TX')
      cy.wrap(ele).should('contain.text', 'Backing Address')
    })
  })
})

context('/tokens/* Backing Addresses', () => {
  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have backing address for BTC', function () {
    cy.visit('/tokens/2?network=MainNet')
    cy.findAllByTestId('AdaptiveList').eq(1).then(ele => {
      cy.wrap(ele).should('contain.text', 'Backing Address')
    })
    cy.findByTestId('BackingAddress.BTC').should('have.text', '38pZuWUti3vSQuvuFYs8Lwbyje8cmaGhrT')
    cy.findByTestId('BackingAddress.BTC').find('a').should('have.attr', 'href', 'https://www.blockchain.com/btc/address/38pZuWUti3vSQuvuFYs8Lwbyje8cmaGhrT')
  })

  it('should have backing address for ETH', function () {
    cy.visit('/tokens/1?network=MainNet')
    cy.findAllByTestId('AdaptiveList').eq(1).then(ele => {
      cy.wrap(ele).should('contain.text', 'Backing Address')
    })
    cy.findByTestId('BackingAddress.ETH').should('have.text', '0x94fa70d079d76279e1815ce403e9b985bccc82ac')
    cy.findByTestId('BackingAddress.ETH').find('a').should('have.attr', 'href', 'https://etherscan.io/address/0x94fa70d079d76279e1815ce403e9b985bccc82ac')
  })

  it('should have backing address for USDT', function () {
    cy.visit('/tokens/3?network=MainNet')
    cy.findAllByTestId('AdaptiveList').eq(1).then(ele => {
      cy.wrap(ele).should('contain.text', 'Backing Address')
    })
    cy.findByTestId('BackingAddress.ETH').should('have.text', '0x94fa70d079d76279e1815ce403e9b985bccc82ac')
    cy.findByTestId('BackingAddress.ETH').find('a').should('have.attr', 'href', 'https://etherscan.io/address/0x94fa70d079d76279e1815ce403e9b985bccc82ac')
  })

  it('should have backing address for USDC', function () {
    cy.visit('/tokens/13?network=MainNet')
    cy.findAllByTestId('AdaptiveList').eq(1).then(ele => {
      cy.wrap(ele).should('contain.text', 'Backing Address')
    })
    cy.findByTestId('BackingAddress.ETH').should('have.text', '0x94fa70d079d76279e1815ce403e9b985bccc82ac')
    cy.findByTestId('BackingAddress.ETH').find('a').should('have.attr', 'href', 'https://etherscan.io/address/0x94fa70d079d76279e1815ce403e9b985bccc82ac')
  })

  it('should have backing address for DOGE', function () {
    cy.visit('/tokens/7?network=MainNet')
    cy.findAllByTestId('AdaptiveList').eq(1).then(ele => {
      cy.wrap(ele).should('contain.text', 'Backing Address')
    })
    cy.findByTestId('BackingAddress.DOGE').should('have.text', 'D7jrXDgPYck8jL9eYvRrc7Ze8n2e2Loyba')
    cy.findByTestId('BackingAddress.DOGE').find('a').should('have.attr', 'href', 'https://dogechain.info/address/D7jrXDgPYck8jL9eYvRrc7Ze8n2e2Loyba')
  })

  it('should have backing address for LTC', function () {
    cy.visit('/tokens/9?network=MainNet')
    cy.findAllByTestId('AdaptiveList').eq(1).then(ele => {
      cy.wrap(ele).should('contain.text', 'Backing Address')
    })
    cy.findByTestId('BackingAddress.LTC').should('have.text', 'MLYQxJfnUfVqRwfYXjDJfmLbyA77hqzSXE')
    cy.findByTestId('BackingAddress.LTC').find('a').should('have.attr', 'href', 'https://live.blockcypher.com/ltc/address/MLYQxJfnUfVqRwfYXjDJfmLbyA77hqzSXE')
  })

  it('should have backing address for BCH', function () {
    cy.visit('/tokens/11?network=MainNet')
    cy.findAllByTestId('AdaptiveList').eq(1).then(ele => {
      cy.wrap(ele).should('contain.text', 'Backing Address')
    })
    cy.findByTestId('BackingAddress.BCH').should('have.text', '38wFczGqaaGLRub2U7CWeWkMuPDwhMVMRf')
    cy.findByTestId('BackingAddress.BCH').find('a').should('have.attr', 'href', 'https://www.blockchain.com/bch/address/38wFczGqaaGLRub2U7CWeWkMuPDwhMVMRf')
  })

  it('should redirect to individual token page', () => {
    cy.visit('/tokens/DFI')
    cy.findByText('DFI').should('exist')

    cy.visit('/tokens/dBCH-DFI')
    cy.findByText('dBCH-DFI').should('exist')

    cy.visit('/tokens/eth-dfi-191')
    cy.findByText('ETH-DFI').should('exist')
    cy.findByText('DCT').should('exist')

    cy.visit('/tokens/dbtc')
    cy.findByText('dBTC').should('exist')
  })
})
