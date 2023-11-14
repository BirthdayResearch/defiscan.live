context("/transactions/[txid] - DfTx ICX Claim DFCHTLC  on desktop", () => {
  before(() => {
    cy.visit(
      "/transactions/2ab05dea3ca27c37fecb014201f81d2e6098986b2ee387a766f1f69723f49ad9?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("macbook-13");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:ICX Claim DFCHTLC");
  });

  it("should have DfTxICXClaimDFCHTLC dfcHTLCTx", () => {
    cy.findByTestId("DfTxICXClaimDFCHTLC.dfcHTLCTx").should(
      "have.text",
      "d4a7e2411061c452c3254798f251e94b105e605ed744251040b19207ae7c8a6c"
    );
    cy.findByTestId("DfTxICXClaimDFCHTLC.dfcHTLCTx")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/transactions/d4a7e2411061c452c3254798f251e94b105e605ed744251040b19207ae7c8a6c"
      );
  });

  it("should have DfTxICXClaimDFCHTLC Seed", () => {
    cy.findByTestId("DfTxICXClaimDFCHTLC.Seed").should(
      "have.text",
      "c184b0239f4198763fdf6289a93616f59b388b81ca9fb840ae7d9b067fb1663d"
    );
  });
});

context("/transactions/[txid] - DfTx ICX Claim DFCHTLC  on mobile", () => {
  before(() => {
    cy.visit(
      "/transactions/2ab05dea3ca27c37fecb014201f81d2e6098986b2ee387a766f1f69723f49ad9?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:ICX Claim DFCHTLC");
  });

  it("should have DfTxICXClaimDFCHTLC dfcHTLCTx", () => {
    cy.findByTestId("DfTxICXClaimDFCHTLC.dfcHTLCTx").should(
      "have.text",
      "d4a7e2411061c452c3254798f251e94b105e605ed744251040b19207ae7c8a6c"
    );
    cy.findByTestId("DfTxICXClaimDFCHTLC.dfcHTLCTx")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/transactions/d4a7e2411061c452c3254798f251e94b105e605ed744251040b19207ae7c8a6c"
      );
  });

  it("should have DfTxICXClaimDFCHTLC Seed", () => {
    cy.findByTestId("DfTxICXClaimDFCHTLC.Seed").should(
      "have.text",
      "c184b0239f4198763fdf6289a93616f59b388b81ca9fb840ae7d9b067fb1663d"
    );
  });
});
