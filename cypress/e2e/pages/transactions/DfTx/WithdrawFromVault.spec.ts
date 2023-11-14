context("/transactions/[txid] - DfTx Withdraw From Vault on Desktop", () => {
  before(() => {
    cy.visit(
      "/transactions/60f348e30726ea1aa7dcfab1b8442ca605be732674a76f5718b3adebd45f3ef1"
    );
  });

  beforeEach(() => {
    cy.viewport("macbook-16");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Withdraw From Vault");
  });

  it("should DfTxWithdrawFromVault Vault ID ", () => {
    cy.findByTestId("DfTxWithdrawFromVault.VaultId").should(
      "have.text",
      "d7ad40f2a9ed18d191d9b955fe2d186bc01cdd5d92e4bb315a657bb75a0b94df"
    );
  });

  it("should DfTxWithdrawFromVault Address", () => {
    cy.findByTestId("DfTxWithdrawFromVault.Address").should(
      "have.text",
      "df1q7a05km9pueyfp4muvcn3lnvmh3angvmdl20uyk"
    );
  });

  it("should have DfTxWithdrawFromVault Amount", () => {
    cy.findByTestId("DfTxWithdrawFromVault.Amount").should(
      "have.text",
      "2245.00000000"
    );
  });

  it("should have DfTxWithdrawFromVault Amount Symbol", () => {
    cy.findByTestId("DfTxWithdrawFromVault.AmountSymbol").should(
      "have.text",
      "dUSDT"
    );
  });
});

context("/transactions/[txid] - DfTx Withdraw From Vault on Mobile", () => {
  before(() => {
    cy.visit(
      "/transactions/60f348e30726ea1aa7dcfab1b8442ca605be732674a76f5718b3adebd45f3ef1"
    );
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Withdraw From Vault");
  });

  it("should DfTxWithdrawFromVault Vault ID ", () => {
    cy.findByTestId("DfTxWithdrawFromVault.VaultId").should(
      "have.text",
      "d7ad40f2a9ed18d191d9b955fe2d186bc01cdd5d92e4bb315a657bb75a0b94df"
    );
  });

  it("should DfTxWithdrawFromVault Address", () => {
    cy.findByTestId("DfTxWithdrawFromVault.Address").should(
      "have.text",
      "df1q7a05km9pueyfp4muvcn3lnvmh3angvmdl20uyk"
    );
  });

  it("should have DfTxWithdrawFromVault Amount", () => {
    cy.findByTestId("DfTxWithdrawFromVault.Amount").should(
      "have.text",
      "2245.00000000"
    );
  });

  it("should have DfTxWithdrawFromVault Amount Symbol", () => {
    cy.findByTestId("DfTxWithdrawFromVault.AmountSymbol").should(
      "have.text",
      "dUSDT"
    );
  });
});
