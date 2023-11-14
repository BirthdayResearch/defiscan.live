context("/transactions/[txid] - DfTx Pool Add Liquidity on desktop", () => {
  before(() => {
    cy.visit(
      "/transactions/c940fd028bfb2f7dad1663b2c77ce203cbc5b49897e76b61472c9f76b81b3fa0?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("macbook-13");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Pool Add Liquidity");
  });

  it("should have DfTxAddPoolLiquidity Share Address", () => {
    cy.findByTestId("DfTxPoolAddLiquidity.ShareAddress").contains(
      "8cEN6YMPPg2GUeXN8RrfL7LXaSWoWw7a24"
    );
    cy.findByTestId("DfTxPoolAddLiquidity.ShareAddress")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/8cEN6YMPPg2GUeXN8RrfL7LXaSWoWw7a24"
      );
  });

  it("should have DfTxAddPoolLiquidity From Address", () => {
    cy.findByTestId("DfTxPoolAddLiquidity.FromAddress").contains(
      "8cEN6YMPPg2GUeXN8RrfL7LXaSWoWw7a24"
    );
    cy.findByTestId("DfTxPoolAddLiquidity.FromAddress")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/8cEN6YMPPg2GUeXN8RrfL7LXaSWoWw7a24"
      );
  });

  it("should have DfTxAddPoolLiquidity Token 1 Amount", () => {
    cy.findByTestId("DfTxPoolAddLiquidity.0-Amount").should(
      "have.text",
      "0.00000063"
    );
  });

  it("should have DfTxAddPoolLiquidity Token 1 Symbol", () => {
    cy.findByTestId("DfTxPoolAddLiquidity.0-Symbol").should("have.text", "DFI");
  });

  it("should have DfTxAddPoolLiquidity Token 2 Amount", () => {
    cy.findByTestId("DfTxPoolAddLiquidity.3-Amount").should(
      "have.text",
      "0.00000205"
    );
  });

  it("should have DfTxAddPoolLiquidity Token 2 Symbol", () => {
    cy.findByTestId("DfTxPoolAddLiquidity.3-Symbol").should(
      "have.text",
      "dUSDT"
    );
  });
});

context("/transactions/[txid] - DfTx Pool Add Liquidity on mobile", () => {
  before(() => {
    cy.visit(
      "/transactions/c940fd028bfb2f7dad1663b2c77ce203cbc5b49897e76b61472c9f76b81b3fa0?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Pool Add Liquidity");
  });

  it("should have DfTxAddPoolLiquidity Share Address", () => {
    cy.findByTestId("DfTxPoolAddLiquidity.ShareAddress").contains(
      "8cEN6YMPPg2GUeXN8RrfL7LXaSWoWw7a24"
    );
    cy.findByTestId("DfTxPoolAddLiquidity.ShareAddress")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/8cEN6YMPPg2GUeXN8RrfL7LXaSWoWw7a24"
      );
  });

  it("should have DfTxAddPoolLiquidity From Address", () => {
    cy.findByTestId("DfTxPoolAddLiquidity.FromAddress").contains(
      "8cEN6YMPPg2GUeXN8RrfL7LXaSWoWw7a24"
    );
    cy.findByTestId("DfTxPoolAddLiquidity.FromAddress")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/8cEN6YMPPg2GUeXN8RrfL7LXaSWoWw7a24"
      );
  });

  it("should have DfTxAddPoolLiquidity Token 1 Amount", () => {
    cy.findByTestId("DfTxPoolAddLiquidity.0-Amount").should(
      "have.text",
      "0.00000063"
    );
  });

  it("should have DfTxAddPoolLiquidity Token 1 Symbol", () => {
    cy.findByTestId("DfTxPoolAddLiquidity.0-Symbol").should("have.text", "DFI");
  });

  it("should have DfTxAddPoolLiquidity Token 2 Amount", () => {
    cy.findByTestId("DfTxPoolAddLiquidity.3-Amount").should(
      "have.text",
      "0.00000205"
    );
  });

  it("should have DfTxAddPoolLiquidity Token 2 Symbol", () => {
    cy.findByTestId("DfTxPoolAddLiquidity.3-Symbol").should(
      "have.text",
      "dUSDT"
    );
  });
});
