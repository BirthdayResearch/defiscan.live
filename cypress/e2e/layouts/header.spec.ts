context("<Header/> on macbook-13", () => {
  beforeEach(() => {
    cy.visit("/?network=MainNet");
    cy.viewport("macbook-13");
  });

  it("should have Nav Items", () => {
    cy.findByTestId("Desktop.HeaderLink.DEX").should("be.visible");
    cy.findByTestId("Desktop.HeaderLink.DEX").should(
      "have.attr",
      "href",
      "/dex"
    );

    cy.findByTestId("Desktop.HeaderLink.Blocks").should("be.visible");
    cy.findByTestId("Desktop.HeaderLink.Blocks").should(
      "have.attr",
      "href",
      "/blocks"
    );

    cy.findByTestId("Desktop.HeaderLink.Vaults").should("be.visible");
    cy.findByTestId("Desktop.HeaderLink.Vaults").should(
      "have.attr",
      "href",
      "/vaults"
    );

    cy.findByTestId("Desktop.HeaderLink.Auctions").should("be.visible");
    cy.findByTestId("Desktop.HeaderLink.Auctions").should(
      "have.attr",
      "href",
      "/auctions"
    );

    cy.findByTestId("Desktop.HeaderLink.Oracles").should("be.visible");
    cy.findByTestId("Desktop.HeaderLink.Oracles").should(
      "have.attr",
      "href",
      "/oracles"
    );

    cy.findByTestId("Desktop.HeaderLink.Governance").should("be.visible");
    cy.findByTestId("Desktop.HeaderLink.Governance").should(
      "have.attr",
      "href",
      "/governance"
    );

    cy.findByTestId("Desktop.HeaderLink.Masternodes").should("be.visible");
    cy.findByTestId("Desktop.HeaderLink.Masternodes").should(
      "have.attr",
      "href",
      "/masternodes"
    );

    cy.findByTestId("Desktop.HeaderLink.More").should("be.visible");
    cy.findByTestId("Desktop.HeaderLink.More").click();
    cy.findByTestId("Desktop.HeaderLink.More.Items.tokens").should(
      "be.visible"
    );
    cy.findByTestId("Desktop.HeaderLink.More.Items.tokens").should(
      "have.attr",
      "href",
      "/tokens"
    );
  });

  it("should have Desktop.HeaderSearchBar", () => {
    cy.findByTestId("Desktop.HeaderSearchBar").should("be.visible");
  });
});

context("<Header/> on ipad-2", () => {
  beforeEach(() => {
    cy.visit("/?network=MainNet");
    cy.viewport("ipad-2");
  });

  it("should have Nav Items and Searchbar", () => {
    cy.findByTestId("Header.OpenMenu").click();

    cy.findByTestId("Tablet.HeaderLink.Dex").should("be.visible");
    cy.findByTestId("Tablet.HeaderLink.Dex").should(
      "have.attr",
      "href",
      "/dex"
    );

    cy.findByTestId("Tablet.HeaderLink.Blocks").should("be.visible");
    cy.findByTestId("Tablet.HeaderLink.Blocks").should(
      "have.attr",
      "href",
      "/blocks"
    );

    cy.findByTestId("Tablet.HeaderLink.Vaults").should("be.visible");
    cy.findByTestId("Tablet.HeaderLink.Vaults").should(
      "have.attr",
      "href",
      "/vaults"
    );

    cy.findByTestId("Tablet.HeaderLink.Auctions").should("be.visible");
    cy.findByTestId("Tablet.HeaderLink.Auctions").should(
      "have.attr",
      "href",
      "/auctions"
    );

    cy.findByTestId("Tablet.HeaderLink.Oracles").should("be.visible");
    cy.findByTestId("Tablet.HeaderLink.Oracles").should(
      "have.attr",
      "href",
      "/oracles"
    );

    cy.findByTestId("Tablet.HeaderLink.Tokens").should("be.visible");
    cy.findByTestId("Tablet.HeaderLink.Tokens").should(
      "have.attr",
      "href",
      "/tokens"
    );

    cy.findByTestId("Tablet.HeaderLink.Masternodes").should("be.visible");
    cy.findByTestId("Tablet.HeaderLink.Masternodes").should(
      "have.attr",
      "href",
      "/masternodes"
    );

    cy.findByTestId("Tablet.HeaderLink.Governance").should("be.visible");
    cy.findByTestId("Tablet.HeaderLink.Governance").should(
      "have.attr",
      "href",
      "/governance"
    );
  });

  it("should have Tablet.HeaderSearchBar", () => {
    cy.findByTestId("Tablet.HeaderSearchBar").should("be.visible");
  });
});

context("<Header/> on iphone-x", () => {
  beforeEach(() => {
    cy.visit("/?network=MainNet");
    cy.viewport("iphone-x");
  });

  it("should have Nav Items and Searchbar", () => {
    cy.findByTestId("Header.OpenMenu").click();

    cy.findByTestId("Mobile.HeaderLink.Dex").should("be.visible");
    cy.findByTestId("Mobile.HeaderLink.Dex").should(
      "have.attr",
      "href",
      "/dex"
    );

    cy.findByTestId("Mobile.HeaderLink.Blocks").should("be.visible");
    cy.findByTestId("Mobile.HeaderLink.Blocks").should(
      "have.attr",
      "href",
      "/blocks"
    );

    cy.findByTestId("Mobile.HeaderLink.Vaults").should("be.visible");
    cy.findByTestId("Mobile.HeaderLink.Vaults").should(
      "have.attr",
      "href",
      "/vaults"
    );

    cy.findByTestId("Mobile.HeaderLink.Auctions").should("be.visible");
    cy.findByTestId("Mobile.HeaderLink.Auctions").should(
      "have.attr",
      "href",
      "/auctions"
    );

    cy.findByTestId("Mobile.HeaderLink.Oracles").should("be.visible");
    cy.findByTestId("Mobile.HeaderLink.Oracles").should(
      "have.attr",
      "href",
      "/oracles"
    );

    cy.findByTestId("Mobile.HeaderLink.Tokens").should("be.visible");
    cy.findByTestId("Mobile.HeaderLink.Tokens").should(
      "have.attr",
      "href",
      "/tokens"
    );

    cy.findByTestId("Mobile.HeaderLink.Masternodes").should("be.visible");
    cy.findByTestId("Mobile.HeaderLink.Masternodes").should(
      "have.attr",
      "href",
      "/masternodes"
    );

    cy.findByTestId("Mobile.HeaderLink.Governance").should("be.visible");
    cy.findByTestId("Mobile.HeaderLink.Governance").should(
      "have.attr",
      "href",
      "/governance"
    );
  });

  it("should have  Mobile.HeaderSearchbar", () => {
    cy.findByTestId("Header.OpenMenu").click();
    cy.findByTestId("Header.Mobile.CloseMenu").click();
    cy.findByTestId("Header.Mobile.SearchIcon").click();
    cy.findByTestId("Mobile.HeaderSearchBar").within(() => {
      cy.findByTestId("SearchBar").should("be.visible");
    });
  });
});
