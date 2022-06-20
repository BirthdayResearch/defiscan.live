context('<Footer/> on macbook-16', () => {
  before(() => {
    cy.visit('/tokens?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have footer social links section', () => {
    cy.findByTestId('FooterSectionSocial').within(() => {
      cy.findByTestId('FooterSectionSocial.Header')
        .should('be.visible')
        .should('have.text', 'Social')

      cy.findByTestId('FooterSectionSocial.div').children().should('have.length', 8)

      cy.findByTestId('FooterSectionSocial.Twitter')
        .should('have.attr', 'href', 'https://twitter.com/defichain')
        .should('be.visible')
        .should('have.text', 'Twitter')

      cy.findByTestId('FooterSectionSocial.Github')
        .should('have.attr', 'href', 'https://github.com/DeFiCh')
        .should('be.visible')
        .should('have.text', 'GitHub')

      cy.findByTestId('FooterSectionSocial.YouTube')
        .should('have.attr', 'href', 'https://www.youtube.com/DeFiChain')
        .should('be.visible')
        .should('have.text', 'YouTube')

      cy.findByTestId('FooterSectionSocial.LinkedIn')
        .should('have.attr', 'href', 'https://www.linkedin.com/company/defichain')
        .should('be.visible')
        .should('have.text', 'LinkedIn')

      cy.findByTestId('FooterSectionSocial.Reddit')
        .should('have.attr', 'href', 'https://www.reddit.com/r/defiblockchain/')
        .should('be.visible')
        .should('have.text', 'Reddit')

      cy.findByTestId('FooterSectionSocial.Facebook')
        .should('have.attr', 'href', 'https://www.facebook.com/defichain.official')
        .should('be.visible')
        .should('have.text', 'Facebook')

      cy.findByTestId('FooterSectionSocial.Telegram')
        .should('have.attr', 'href', 'https://t.me/defiblockchain')
        .should('be.visible')
        .should('have.text', 'Telegram')

      cy.findByTestId('FooterSectionSocial.Discord')
        .should('have.attr', 'href', 'https://discord.com/invite/py55egyaGy')
        .should('be.visible')
        .should('have.text', 'Discord')
    })
  })

  it('should have footer sitemap section', () => {
    cy.findByTestId('FooterSectionSitemap').within(() => {
      cy.findByTestId('FooterSectionSitemap.Header')
        .should('be.visible')
        .should('have.text', 'Scan')

      cy.findByTestId('FooterSectionSitemap.div').children().should('have.length', 7)

      cy.findByTestId('FooterSectionSitemap.Dex')
        .should('have.attr', 'href', '/dex')
        .should('be.visible')
        .should('have.text', 'DEX')

      cy.findByTestId('FooterSectionSitemap.Blocks')
        .should('have.attr', 'href', '/blocks')
        .should('be.visible')
        .should('have.text', 'Blocks')

      cy.findByTestId('FooterSectionSitemap.Auctions')
        .should('have.attr', 'href', '/auctions')
        .should('be.visible')
        .should('have.text', 'Auctions')

      cy.findByTestId('FooterSectionSitemap.Oracles')
        .should('have.attr', 'href', '/oracles')
        .should('be.visible')
        .should('have.text', 'Oracles')

      cy.findByTestId('FooterSectionSitemap.Tokens')
        .should('have.attr', 'href', '/tokens')
        .should('be.visible')
        .should('have.text', 'Tokens')

      cy.findByTestId('FooterSectionSitemap.Masternodes')
        .should('have.attr', 'href', '/masternodes')
        .should('be.visible')
        .should('have.text', 'Masternodes')
    })
  })

  it('should have footer about section', () => {
    cy.findByTestId('FooterSectionAbout').within(() => {
      cy.findByTestId('FooterSectionAbout.Desc')
        .should('be.visible')
        .should('have.text', 'DeFi Blockchain’s primary vision is to enable decentralized finance with Bitcoin-grade security, strength and immutability. It\'s a blockchain dedicated to fast, intelligent and transparent financial services, accessible by everyone. For more info, visit')

      cy.findByTestId('FooterSectionAbout.DFCLink')
        .should('have.attr', 'href', 'https://defichain.com')
        .should('be.visible')
        .should('have.text', 'DeFiChain.com')

      cy.findByTestId('FooterSectionAbout.WhitePaperLink')
        .should('have.attr', 'href', 'https://defichain.com/white-paper/')
        .should('be.visible')
        .should('have.text', 'White Paper')

      cy.findByTestId('FooterSectionAbout.PrivacyPolicyLink')
        .should('have.attr', 'href', 'https://defichain.com/privacy-policy/')
        .should('be.visible')
        .should('have.text', 'Privacy Policy')
    })
  })
})

context('<Footer/> on iphone-x', () => {
  before(() => {
    cy.visit('/tokens?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have footer social links section', () => {
    cy.findByTestId('FooterSectionSocial').within(() => {
      cy.findByTestId('FooterSectionSocial.Header')
        .should('be.visible')
        .should('have.text', 'Social')

      cy.findByTestId('FooterSectionSocial.div').children().should('have.length', 8)

      cy.findByTestId('FooterSectionSocial.Twitter')
        .should('have.attr', 'href', 'https://twitter.com/defichain')
        .should('be.visible')
        .should('have.text', 'Twitter')

      cy.findByTestId('FooterSectionSocial.Github')
        .should('have.attr', 'href', 'https://github.com/DeFiCh')
        .should('be.visible')
        .should('have.text', 'GitHub')

      cy.findByTestId('FooterSectionSocial.YouTube')
        .should('have.attr', 'href', 'https://www.youtube.com/DeFiChain')
        .should('be.visible')
        .should('have.text', 'YouTube')

      cy.findByTestId('FooterSectionSocial.LinkedIn')
        .should('have.attr', 'href', 'https://www.linkedin.com/company/defichain')
        .should('be.visible')
        .should('have.text', 'LinkedIn')

      cy.findByTestId('FooterSectionSocial.Reddit')
        .should('have.attr', 'href', 'https://www.reddit.com/r/defiblockchain/')
        .should('be.visible')
        .should('have.text', 'Reddit')

      cy.findByTestId('FooterSectionSocial.Facebook')
        .should('have.attr', 'href', 'https://www.facebook.com/defichain.official')
        .should('be.visible')
        .should('have.text', 'Facebook')

      cy.findByTestId('FooterSectionSocial.Telegram')
        .should('have.attr', 'href', 'https://t.me/defiblockchain')
        .should('be.visible')
        .should('have.text', 'Telegram')

      cy.findByTestId('FooterSectionSocial.Discord')
        .should('have.attr', 'href', 'https://discord.com/invite/py55egyaGy')
        .should('be.visible')
        .should('have.text', 'Discord')
    })
  })

  it('should have footer sitemap section', () => {
    cy.findByTestId('FooterSectionSitemap').within(() => {
      cy.findByTestId('FooterSectionSitemap.Header')
        .should('be.visible')
        .should('have.text', 'Scan')

      cy.findByTestId('FooterSectionSitemap.div').children().should('have.length', 7)

      cy.findByTestId('FooterSectionSitemap.Dex')
        .should('have.attr', 'href', '/dex')
        .should('be.visible')
        .should('have.text', 'DEX')

      cy.findByTestId('FooterSectionSitemap.Blocks')
        .should('have.attr', 'href', '/blocks')
        .should('be.visible')
        .should('have.text', 'Blocks')

      cy.findByTestId('FooterSectionSitemap.Auctions')
        .should('have.attr', 'href', '/auctions')
        .should('be.visible')
        .should('have.text', 'Auctions')

      cy.findByTestId('FooterSectionSitemap.Oracles')
        .should('have.attr', 'href', '/oracles')
        .should('be.visible')
        .should('have.text', 'Oracles')

      cy.findByTestId('FooterSectionSitemap.Tokens')
        .should('have.attr', 'href', '/tokens')
        .should('be.visible')
        .should('have.text', 'Tokens')

      cy.findByTestId('FooterSectionSitemap.Masternodes')
        .should('have.attr', 'href', '/masternodes')
        .should('be.visible')
        .should('have.text', 'Masternodes')
    })
  })

  it('should have footer about section', () => {
    cy.findByTestId('FooterSectionAbout').within(() => {
      cy.findByTestId('FooterSectionAbout.Desc')
        .should('be.visible')
        .should('have.text', 'DeFi Blockchain’s primary vision is to enable decentralized finance with Bitcoin-grade security, strength and immutability. It\'s a blockchain dedicated to fast, intelligent and transparent financial services, accessible by everyone. For more info, visit')

      cy.findByTestId('FooterSectionAbout.DFCLink')
        .should('have.attr', 'href', 'https://defichain.com')
        .should('be.visible')
        .should('have.text', 'DeFiChain.com')

      cy.findByTestId('FooterSectionAbout.WhitePaperLink')
        .should('have.attr', 'href', 'https://defichain.com/white-paper/')
        .should('be.visible')
        .should('have.text', 'White Paper')

      cy.findByTestId('FooterSectionAbout.PrivacyPolicyLink')
        .should('have.attr', 'href', 'https://defichain.com/privacy-policy/')
        .should('be.visible')
        .should('have.text', 'Privacy Policy')
    })
  })
})
