context("/transactions/[txid] - Take Loan on desktop", () => {
  before(() => {
    cy.visit(
      "/transactions/04fe77d0176dd8c22a135253c4cc71a4fdefc48ca2bb6aa8d33954714585a186?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("macbook-13");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have subtitle", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("OP_DEFI_TX_TAKE_LOAN");
  });

  it("should have a vaultId", () => {
    cy.findByTestId("DfTxTakeLoan.VaultId").contains(
      "27a8209d6b851d9aa4b1402aa5e50368c40aaf360eb547a905e1d8b4c5a2e2d9"
    );
  });

  it("should have an address to", () => {
    cy.findByTestId("DfTxTakeLoan.Address").contains(
      "dFgD1hmyZ2KitHzNLzvGoFLn548fqxZE7E"
    );
  });

  it("should have a token amounts", () => {
    cy.findByTestId("DfTxTakeLoan.toAmount-0").contains("25.00000000");
    cy.findByTestId("DfTxTakeLoan.toSymbol-0").contains("DUSD");
  });
});

context("/transactions/[txid] - DfTx Token Create on mobile", () => {
  before(() => {
    cy.visit(
      "/transactions/04fe77d0176dd8c22a135253c4cc71a4fdefc48ca2bb6aa8d33954714585a186?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have subtitle", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("OP_DEFI_TX_TAKE_LOAN");
  });

  it("should have a vaultId", () => {
    cy.findByTestId("DfTxTakeLoan.VaultId").contains(
      "27a8209d6b851d9aa4b1402aa5e50368c40aaf360eb547a905e1d8b4c5a2e2d9"
    );
  });

  it("should have an address to", () => {
    cy.findByTestId("DfTxTakeLoan.Address").contains(
      "dFgD1hmyZ2KitHzNLzvGoFLn548fqxZE7E"
    );
  });

  it("should have a token amounts", () => {
    cy.findByTestId("DfTxTakeLoan.toAmount-0").contains("25.00000000");
    cy.findByTestId("DfTxTakeLoan.toSymbol-0").contains("DUSD");
  });
});
