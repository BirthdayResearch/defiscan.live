context("/transactions/[txid] - Set Collateral Token on desktop", () => {
  before(() => {
    cy.visit(
      "/transactions/7c715e1ab06beccc580f1497fc33eb7ec4a2fca6e85b348ae0dda78658529e88"
    );
  });

  beforeEach(() => {
    cy.viewport("macbook-16");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains(
      "Type:Set Collateral Token"
    );
  });

  it("should have DfTxSetCollateralToken Collateral Token", () => {
    cy.findByTestId("DfTxSetCollateralToken.CollateralToken").should(
      "have.text",
      "0"
    );
  });

  it("should have DfTxSetCollateralToken Factor", () => {
    cy.findByTestId("DfTxSetCollateralToken.Factor").should(
      "have.text",
      "1.00000000"
    );
  });

  it("should have DfTxSetCollateralToken Activated Block", () => {
    cy.findByTestId("DfTxSetCollateralToken.Block").should("have.text", "0");
  });

  it("should have DfTxSetCollateralToken Currency Pair", () => {
    cy.findByTestId("DfTxSetCollateralToken.CurrencyPair").should(
      "have.text",
      "DFI-USD"
    );
  });
});

context("/transactions/[txid] - Set Collateral Token  on Mobile", () => {
  before(() => {
    cy.visit(
      "/transactions/7c715e1ab06beccc580f1497fc33eb7ec4a2fca6e85b348ae0dda78658529e88"
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
      "Type:Set Collateral Token"
    );
  });

  it("should have DfTxSetCollateralToken Collateral Token", () => {
    cy.findByTestId("DfTxSetCollateralToken.CollateralToken").should(
      "have.text",
      "0"
    );
  });

  it("should have DfTxSetCollateralToken Factor", () => {
    cy.findByTestId("DfTxSetCollateralToken.Factor").should(
      "have.text",
      "1.00000000"
    );
  });

  it("should have DfTxSetCollateralToken Activated Block", () => {
    cy.findByTestId("DfTxSetCollateralToken.Block").should("have.text", "0");
  });

  it("should have DfTxSetCollateralToken Currency Pair", () => {
    cy.findByTestId("DfTxSetCollateralToken.CurrencyPair").should(
      "have.text",
      "DFI-USD"
    );
  });
});
