context("/transactions/[txid] - DfTx resign masternode on desktop", () => {
  before(() => {
    cy.visit(
      "/transactions/30a534ec3cb6afe4186212f7cae772c87121e8cbb9dc90247b7f4d8d0e1f6237?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("macbook-13");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Resign Masternode");
  });

  it("should have DfTxResignMasternode nodeId", () => {
    cy.findByTestId("DfTxResignMasternode.nodeId").should(
      "have.text",
      "cae850382900d6d9f35e39f3b47bf44923656ce9f5e35ba682e8faa55efceb39"
    );
  });
});

context("/transactions/[txid] - DfTx resign masternode on mobile", () => {
  before(() => {
    cy.visit(
      "/transactions/30a534ec3cb6afe4186212f7cae772c87121e8cbb9dc90247b7f4d8d0e1f6237?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Resign Masternode");
  });

  it("should have DfTxResignMasternode nodeId", () => {
    cy.findByTestId("DfTxResignMasternode.nodeId").should(
      "have.text",
      "cae850382900d6d9f35e39f3b47bf44923656ce9f5e35ba682e8faa55efceb39"
    );
  });
});
