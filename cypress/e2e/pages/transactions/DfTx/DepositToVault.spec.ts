context("/transactions/[txid] - DfTx Deposit To Vault on desktop", () => {
  before(() => {
    cy.visit(
      "/transactions/6c5df06308c7cc55ae601399ceafbac33422b6da89ca5fc41a73271cabfb432d?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("macbook-16");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Deposit To Vault");
  });

  it("should have DfTxDepositToVault VaultId", () => {
    cy.findByTestId("DfTxDepositToVault.VaultId").should(
      "have.text",
      "a9a317e303dc8a7b73848f5ff9d3cc66e6cea3eb9b833b249c1d5aa23cd87717"
    );
  });

  it("should have DfTxDepositToVault Address", () => {
    cy.findByTestId("DfTxDepositToVault.Address").should(
      "have.text",
      "dUREKeeE9KarmrSa8bxi6r4jFXw5exGLhD"
    );
  });

  it("should have DfTxDepositToVault Token", () => {
    cy.findByTestId("DfTxDepositToVault.Token").should("have.text", "dBTC");
  });

  it("should have DfTxDepositToVault Amount", () => {
    cy.findByTestId("DfTxDepositToVault.Amount").should(
      "have.text",
      "0.34039225"
    );
  });
});

context("/transactions/[txid] - DfTx Deposit To Vault on mobile", () => {
  before(() => {
    cy.visit(
      "/transactions/6c5df06308c7cc55ae601399ceafbac33422b6da89ca5fc41a73271cabfb432d?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Deposit To Vault");
  });
  it("should have DfTxDepositToVault VaultId", () => {
    cy.findByTestId("DfTxDepositToVault.VaultId").should(
      "have.text",
      "a9a317e303dc8a7b73848f5ff9d3cc66e6cea3eb9b833b249c1d5aa23cd87717"
    );
  });

  it("should have DfTxDepositToVault Address", () => {
    cy.findByTestId("DfTxDepositToVault.Address").should(
      "have.text",
      "dUREKeeE9KarmrSa8bxi6r4jFXw5exGLhD"
    );
  });

  it("should have DfTxDepositToVault Token", () => {
    cy.findByTestId("DfTxDepositToVault.Token").should("have.text", "dBTC");
  });

  it("should have DfTxDepositToVault Amount", () => {
    cy.findByTestId("DfTxDepositToVault.Amount").should(
      "have.text",
      "0.34039225"
    );
  });
});
