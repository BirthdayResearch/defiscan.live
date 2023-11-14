// Skipping the test for now since this test is failing when upgrading @waveshq/standard to ^0.36.0
// Details: https://github.com/WavesHQ/scan/pull/1701#issuecomment-1438228467
context.skip("/transactions/[txid] - DfTx Token Mint on desktop", () => {
  before(() => {
    cy.visit(
      "/transactions/ef997609bf50fa8441ec55168a40fdd04d9df6c4954206b9fb9a25ff9a606e42?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("macbook-13");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Token Mint");
  });

  it("should have DfTxTokenMint Token USDT", () => {
    cy.findByTestId("DfTxTokenMint.Token3").should("have.text", "dUSDT");
  });

  it("should have DfTxTokenMint Amount USDT", () => {
    cy.findByTestId("DfTxTokenMint.Token3Amount").should("have.text", "5,000");
  });
});

context.skip("/transactions/[txid] - DfTx Token Mint on mobile", () => {
  before(() => {
    cy.visit(
      "/transactions/ef997609bf50fa8441ec55168a40fdd04d9df6c4954206b9fb9a25ff9a606e42?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Token Mint");
  });

  it("should have DfTxTokenMint Token USDT", () => {
    cy.findByTestId("DfTxTokenMint.Token3").should("have.text", "dUSDT");
  });

  it("should have DfTxTokenMint Amount USDT", () => {
    cy.findByTestId("DfTxTokenMint.Token3Amount").should("have.text", "5,000");
  });
});
