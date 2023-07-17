context("/transactions/[txid] - DfTx account to utxos on desktop", () => {
  beforeEach(() => {
    cy.visit(
      "/transactions/68440d960df49256d122110e6635edcfeda7658ddc9d1c5f53afd090c70536d9?network=MainNet"
    );
    cy.viewport("macbook-13");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Account To Utxos");
  });

  it("should have DfTxAccountToUtxos fromAddress", () => {
    cy.findByTestId("DfTxAccountToUtxos.fromAddress").should(
      "have.text",
      "dYpwUmq6z8jdYdpXecNGsN84iyyQyw5Syq"
    );
    cy.findByTestId("DfTxAccountToUtxos.fromAddress")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/dYpwUmq6z8jdYdpXecNGsN84iyyQyw5Syq"
      );
  });

  it("should have DfTxAccountToUtxos balances", () => {
    cy.findByTestId("DfTxAccountToUtxos.balances").should(
      "have.text",
      "361.65527311"
    );
  });

  it("should have DfTxAccountToUtxos symbol", () => {
    cy.findByTestId("DfTxAccountToUtxos.symbol").should("have.text", "DFI");
  });

  it("should have DfTxAccountToUtxos mintingOutputsStart", () => {
    cy.findByTestId("DfTxAccountToUtxos.mintingOutputsStart").should(
      "have.text",
      "2"
    );
  });
});

context("/transactions/[txid] - DfTx account to utxos on mobile", () => {
  beforeEach(() => {
    cy.visit(
      "/transactions/68440d960df49256d122110e6635edcfeda7658ddc9d1c5f53afd090c70536d9?network=MainNet"
    );
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Account To Utxos");
  });

  it("should have DfTxAccountToUtxos fromAddress", () => {
    cy.findByTestId("DfTxAccountToUtxos.fromAddress").should(
      "have.text",
      "dYpwUmq6z8jdYdpXecNGsN84iyyQyw5Syq"
    );
    cy.findByTestId("DfTxAccountToUtxos.fromAddress")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/dYpwUmq6z8jdYdpXecNGsN84iyyQyw5Syq"
      );
  });

  it("should have DfTxAccountToUtxos balances", () => {
    cy.findByTestId("DfTxAccountToUtxos.balances").should(
      "have.text",
      "361.65527311"
    );
  });

  it("should have DfTxAccountToUtxos symbol", () => {
    cy.findByTestId("DfTxAccountToUtxos.symbol").should("have.text", "DFI");
  });

  it("should have DfTxAccountToUtxos mintingOutputsStart", () => {
    cy.findByTestId("DfTxAccountToUtxos.mintingOutputsStart").should(
      "have.text",
      "2"
    );
  });
});
