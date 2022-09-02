context("/transactions/[txid] - DfTx create masternode on desktop", () => {
  before(() => {
    cy.visit(
      "/transactions/c4699377e7f6beaabda27b99aadd08ff4a22f51c6ddf632a77f09e7c722bb6e5?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("macbook-13");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Create Masternode");
  });

  it("should have DfTxCreateMasternode operatorType", () => {
    cy.findByTestId("DfTxCreateMasternode.operatorType").should(
      "have.text",
      "1"
    );
  });
  it("should have DfTxCreateMasternode operatorAuthAddress", () => {
    cy.findByTestId("DfTxCreateMasternode.operatorAuthAddress").should(
      "have.text",
      "df60abc9d13ef18a05dd120f17a61935a7b2a679"
    );
    cy.findByTestId("DfTxCreateMasternode.operatorAuthAddress")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/df60abc9d13ef18a05dd120f17a61935a7b2a679"
      );
  });
});

context("/transactions/[txid] - DfTx create masternode on mobile", () => {
  before(() => {
    cy.visit(
      "/transactions/c4699377e7f6beaabda27b99aadd08ff4a22f51c6ddf632a77f09e7c722bb6e5?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Create Masternode");
  });

  it("should have DfTxCreateMasternode operatorType", () => {
    cy.findByTestId("DfTxCreateMasternode.operatorType").should(
      "have.text",
      "1"
    );
  });
  it("should have DfTxCreateMasternode operatorAuthAddress", () => {
    cy.findByTestId("DfTxCreateMasternode.operatorAuthAddress").should(
      "have.text",
      "df60abc9d13ef18a05dd120f17a61935a7b2a679"
    );
    cy.findByTestId("DfTxCreateMasternode.operatorAuthAddress")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/df60abc9d13ef18a05dd120f17a61935a7b2a679"
      );
  });
});
