context("/transactions/[txid] - DfTx Appoint Oracle on desktop", () => {
  before(() => {
    cy.visit(
      "/transactions/a47feba58a644d07603f65966d8779e5c87d85053c885fd91626a502cb92a367?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("macbook-13");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Appoint Oracle");
  });

  it("should have DfTxAppointOracle Adresss", () => {
    cy.findByTestId("DfTxAppointOracle.Address").should(
      "have.text",
      "df1qm7f2cx8vs9lqn8v43034nvckz6dxxpqezfh6dw"
    );
    cy.findByTestId("DfTxAppointOracle.Address")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/df1qm7f2cx8vs9lqn8v43034nvckz6dxxpqezfh6dw"
      );
  });

  it("should have DfTxAppointOracle Weightage", () => {
    cy.findByTestId("DfTxAppointOracle.Weightage").should("have.text", "10");
  });

  it("should have DfTxAppointOracle TSLA Token", () => {
    cy.findByTestId("DfTxAppointOracle.TSLAToken").should("have.text", "TSLA");
  });

  it("should have DfTxAppointOracle TSLA Token", () => {
    cy.findByTestId("DfTxAppointOracle.TSLAToken").should("have.text", "TSLA");
  });

  it("should have DfTxAppointOracle TSLA Currency", () => {
    cy.findByTestId("DfTxAppointOracle.TSLACurrency").should(
      "have.text",
      "USD"
    );
  });
});

context("/transactions/[txid] - DfTx Appoint Oracle on mobile", () => {
  before(() => {
    cy.visit(
      "/transactions/a47feba58a644d07603f65966d8779e5c87d85053c885fd91626a502cb92a367?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Appoint Oracle");
  });

  it("should have DfTxAppointOracle Adresss", () => {
    cy.findByTestId("DfTxAppointOracle.Address").should(
      "have.text",
      "df1qm7f2cx8vs9lqn8v43034nvckz6dxxpqezfh6dw"
    );
    cy.findByTestId("DfTxAppointOracle.Address")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/df1qm7f2cx8vs9lqn8v43034nvckz6dxxpqezfh6dw"
      );
  });

  it("should have DfTxAppointOracle Weightage", () => {
    cy.findByTestId("DfTxAppointOracle.Weightage").should("have.text", "10");
  });

  it("should have DfTxAppointOracle TSLA Token", () => {
    cy.findByTestId("DfTxAppointOracle.TSLAToken").should("have.text", "TSLA");
  });

  it("should have DfTxAppointOracle TSLA Token", () => {
    cy.findByTestId("DfTxAppointOracle.TSLAToken").should("have.text", "TSLA");
  });

  it("should have DfTxAppointOracle TSLA Currency", () => {
    cy.findByTestId("DfTxAppointOracle.TSLACurrency").should(
      "have.text",
      "USD"
    );
  });
});
