context("/transactions/[txid] - DfTx Token Create on desktop", () => {
  before(() => {
    cy.visit(
      "/transactions/2fb0ce8208392e488964e78a93efe0713c36b5b98afe600da48805498e97b8e6?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("macbook-13");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Token Create");
  });

  it("should have DfTxTokenCreate symbol", () => {
    cy.findByTestId("DfTxTokenCreate.symbol").should("have.text", "ETH");
  });

  it("should have DfTxTokenCreate decimal", () => {
    cy.findByTestId("DfTxTokenCreate.decimal").should("have.text", "8");
  });

  it("should have DfTxTokenCreate name", () => {
    cy.findByTestId("DfTxTokenCreate.name").should("have.text", "Ether");
  });

  it("should have DfTxTokenCreate limit", () => {
    cy.findByTestId("DfTxTokenCreate.limit").should("have.text", "0.00000000");
  });

  it("should have DfTxTokenCreate Tradeable", () => {
    cy.findByTestId("DfTxTokenCreate.Tradeable").should("have.text", "true");
  });

  it("should have DfTxTokenCreate Mintable", () => {
    cy.findByTestId("DfTxTokenCreate.Mintable").should("have.text", "true");
  });
});

context("/transactions/[txid] - DfTx Token Create on mobile", () => {
  before(() => {
    cy.visit(
      "/transactions/2fb0ce8208392e488964e78a93efe0713c36b5b98afe600da48805498e97b8e6?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Token Create");
  });

  it("should have DfTxTokenCreate symbol", () => {
    cy.findByTestId("DfTxTokenCreate.symbol").should("have.text", "ETH");
  });

  it("should have DfTxTokenCreate decimal", () => {
    cy.findByTestId("DfTxTokenCreate.decimal").should("have.text", "8");
  });

  it("should have DfTxTokenCreate name", () => {
    cy.findByTestId("DfTxTokenCreate.name").should("have.text", "Ether");
  });

  it("should have DfTxTokenCreate limit", () => {
    cy.findByTestId("DfTxTokenCreate.limit").should("have.text", "0.00000000");
  });

  it("should have DfTxTokenCreate Tradeable", () => {
    cy.findByTestId("DfTxTokenCreate.Tradeable").should("have.text", "true");
  });

  it("should have DfTxTokenCreate Mintable", () => {
    cy.findByTestId("DfTxTokenCreate.Mintable").should("have.text", "true");
  });
});
