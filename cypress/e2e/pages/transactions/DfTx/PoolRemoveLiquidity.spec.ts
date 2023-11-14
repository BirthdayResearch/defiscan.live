context("/transactions/[txid] - DfTx Pool Remove Liquidity on desktop", () => {
  before(() => {
    cy.visit(
      "/transactions/1c6c741a9bdc8c0563f03239d202944bf5771f7af8ee19178cef383c27523c28?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("macbook-13");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains(
      "Type:Pool Remove Liquidity"
    );
  });

  it("should have DfTxPoolRemoveLiquidity Address", () => {
    cy.findByTestId("DfTxPoolRemoveLiquidity.Address").should(
      "have.text",
      "8FHBLM5QdpRjPtb7xAYaCjhSznQqgnjQKy"
    );
    cy.findByTestId("DfTxPoolRemoveLiquidity.Address")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/8FHBLM5QdpRjPtb7xAYaCjhSznQqgnjQKy"
      );
  });

  it("should have DfTxPoolRemoveLiquidity Amount", () => {
    cy.findByTestId("DfTxPoolRemoveLiquidity.Amount").should(
      "have.text",
      "1064.54406915"
    );
  });

  it("should have DfTxPoolRemoveLiquidity Symbol", () => {
    cy.findByTestId("DfTxPoolRemoveLiquidity.Symbol").should(
      "have.text",
      "dUSDT-DFI"
    );
  });
});

context("/transactions/[txid] - DfTx Pool Removed Liquidity on mobile", () => {
  before(() => {
    cy.visit(
      "/transactions/1c6c741a9bdc8c0563f03239d202944bf5771f7af8ee19178cef383c27523c28?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains(
      "Type:Pool Remove Liquidity"
    );
  });

  it("should have DfTxPoolRemoveLiquidity Address", () => {
    cy.findByTestId("DfTxPoolRemoveLiquidity.Address").should(
      "have.text",
      "8FHBLM5QdpRjPtb7xAYaCjhSznQqgnjQKy"
    );
    cy.findByTestId("DfTxPoolRemoveLiquidity.Address")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/8FHBLM5QdpRjPtb7xAYaCjhSznQqgnjQKy"
      );
  });

  it("should have DfTxPoolRemoveLiquidity Amount", () => {
    cy.findByTestId("DfTxPoolRemoveLiquidity.Amount").should(
      "have.text",
      "1064.54406915"
    );
  });

  it("should have DfTxPoolRemoveLiquidity Symbol", () => {
    cy.findByTestId("DfTxPoolRemoveLiquidity.Symbol").should(
      "have.text",
      "dUSDT-DFI"
    );
  });
});
