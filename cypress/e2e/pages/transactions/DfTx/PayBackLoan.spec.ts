context("/transactions/[txid] - DfTx Pay back Loan on Desktop", () => {
  before(() => {
    cy.visit(
      "/transactions/47a1babbff52678f88cef7f5d41e7b9cd6a56d08affefd37de4e4dcb45abf033"
    );
  });

  beforeEach(() => {
    cy.viewport("macbook-16");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Pay Back Loan");
  });

  it("should DfTxPayBackLoan Vault ID ", () => {
    cy.findByTestId("DfTxPayBackLoan.VaultId").should(
      "have.text",
      "e2329c45aad2fcbbb20d0d38d3b153a8a0344cdb2c57649269c3eb8d4419667c"
    );
  });

  it("should DfTxPayBackLoan Owner's Address", () => {
    cy.findByTestId("DfTxPayBackLoan.OwnerAddress").should(
      "have.text",
      "dUL7BmAkZy8W48e66dmibwoppGA8YYw3Pr"
    );
  });

  it("should have DfTxPayBackLoan Token", () => {
    cy.findByTestId("DfTxPayBackLoan.Token").should("have.text", "DUSD");
  });

  it("should have DfTxPayBackLoan Amount", () => {
    cy.findByTestId("DfTxPayBackLoan.Amount").should(
      "have.text",
      "2000.00000000"
    );
  });
});

context("/transactions/[txid] - DfTx Pay back Loan on Mobile", () => {
  before(() => {
    cy.visit(
      "/transactions/47a1babbff52678f88cef7f5d41e7b9cd6a56d08affefd37de4e4dcb45abf033"
    );
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Pay Back Loan");
  });

  it("should DfTxPayBackLoan Vault ID ", () => {
    cy.findByTestId("DfTxPayBackLoan.VaultId").should(
      "have.text",
      "e2329c45aad2fcbbb20d0d38d3b153a8a0344cdb2c57649269c3eb8d4419667c"
    );
  });

  it("should DfTxPayBackLoan Owner's Address", () => {
    cy.findByTestId("DfTxPayBackLoan.OwnerAddress").should(
      "have.text",
      "dUL7BmAkZy8W48e66dmibwoppGA8YYw3Pr"
    );
  });

  it("should have DfTxPayBackLoan Token", () => {
    cy.findByTestId("DfTxPayBackLoan.Token").should("have.text", "DUSD");
  });

  it("should have DfTxPayBackLoan Amount", () => {
    cy.findByTestId("DfTxPayBackLoan.Amount").should(
      "have.text",
      "2000.00000000"
    );
  });
});
