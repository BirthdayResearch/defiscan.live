context("/transaction/[txid] - Dftx Create Vault on Desktop", () => {
  before(() => {
    cy.visit(
      "/transactions/3dc1257fdcd34e03e634b70dea7e04b96c9ef5d6787c7fc42094b728c8bf1566"
    );
  });

  beforeEach(() => {
    cy.viewport("macbook-16");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Create Vault");
  });

  it("should have DfTxCreateVault Owners Address", () => {
    cy.findByTestId("DfTxCreateVault.OwnersAddress").should(
      "have.text",
      "dWNDpnGPfhu5yCrkvqqjk2fA4FnHv6rqa5"
    );
  });

  it("should have DfTxCreateVault SchemeId", () => {
    cy.findByTestId("DfTxCreateVault.SchemeId").should("have.text", "N/A");
  });
});

context("/transaction/[txid] - Dftx Create Vault on Mobile", () => {
  before(() => {
    cy.visit(
      "/transactions/3dc1257fdcd34e03e634b70dea7e04b96c9ef5d6787c7fc42094b728c8bf1566"
    );
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Create Vault");
  });

  it("should have DfTxCreateVault Owners Address", () => {
    cy.findByTestId("DfTxCreateVault.OwnersAddress").should(
      "have.text",
      "dWNDpnGPfhu5yCrkvqqjk2fA4FnHv6rqa5"
    );
  });

  it("should have DfTxCreateVault SchemeId", () => {
    cy.findByTestId("DfTxCreateVault.SchemeId").should("have.text", "N/A");
  });
});
