context("/transactions/[txid] - DfTx Update Oracle on desktop", () => {
  before(() => {
    cy.visit(
      "/transactions/276a61762d0ba048999699a95bbb30d67a57bc99a650ca8d0a7d3e5d47e44ca5?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("macbook-13");
  });

  it("should have heading and type", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Update Oracle");
  });

  it("should have DfTxUpdateOracle Details", () => {
    cy.findByTestId("DfTxUpdateOracle.OracleId").should(
      "have.text",
      "a47feba58a644d07603f65966d8779e5c87d85053c885fd91626a502cb92a367"
    );
    cy.findByTestId("DfTxUpdateOracle.Address").should(
      "have.text",
      "df1qm7f2cx8vs9lqn8v43034nvckz6dxxpqezfh6dw"
    );
    cy.findByTestId("DfTxUpdateOracle.Address")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/df1qm7f2cx8vs9lqn8v43034nvckz6dxxpqezfh6dw"
      );
    cy.findByTestId("DfTxUpdateOracle.Weightage").should("have.text", "10");
  });

  it("should have DfTxUpdateOracle Tokens & Currency", () => {
    cy.findByTestId("OverflowTable").within(() => {
      cy.findAllByTestId("OverflowTable.Row").should("have.length", 14);
    });
    cy.findByTestId("DfTxUpdateOracle.TSLAToken").should("have.text", "TSLA");
    cy.findByTestId("DfTxUpdateOracle.TSLACurrency").should("have.text", "USD");
    cy.findByTestId("DfTxUpdateOracle.GOOGLToken").should("have.text", "GOOGL");
    cy.findByTestId("DfTxUpdateOracle.GOOGLCurrency").should(
      "have.text",
      "USD"
    );
    cy.findByTestId("DfTxUpdateOracle.UBERToken").should("have.text", "UBER");
    cy.findByTestId("DfTxUpdateOracle.UBERCurrency").should("have.text", "USD");
  });
});

context("/transactions/[txid] - DfTx Update Oracle on mobile", () => {
  before(() => {
    cy.visit(
      "/transactions/276a61762d0ba048999699a95bbb30d67a57bc99a650ca8d0a7d3e5d47e44ca5?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("should have heading and type", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Update Oracle");
  });

  it("should have DfTxUpdateOracle Details", () => {
    cy.findByTestId("DfTxUpdateOracle.OracleId").should(
      "have.text",
      "a47feba58a644d07603f65966d8779e5c87d85053c885fd91626a502cb92a367"
    );
    cy.findByTestId("DfTxUpdateOracle.Address").should(
      "have.text",
      "df1qm7f2cx8vs9lqn8v43034nvckz6dxxpqezfh6dw"
    );
    cy.findByTestId("DfTxUpdateOracle.Address")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/df1qm7f2cx8vs9lqn8v43034nvckz6dxxpqezfh6dw"
      );
    cy.findByTestId("DfTxUpdateOracle.Weightage").should("have.text", "10");
  });

  it("should have DfTxUpdateOracle Tokens & Currency", () => {
    cy.findByTestId("OverflowTable").within(() => {
      cy.findAllByTestId("OverflowTable.Row").should("have.length", 14);
    });
    cy.findByTestId("DfTxUpdateOracle.TSLAToken").should("have.text", "TSLA");
    cy.findByTestId("DfTxUpdateOracle.TSLACurrency").should("have.text", "USD");
    cy.findByTestId("DfTxUpdateOracle.GOOGLToken").should("have.text", "GOOGL");
    cy.findByTestId("DfTxUpdateOracle.GOOGLCurrency").should(
      "have.text",
      "USD"
    );
    cy.findByTestId("DfTxUpdateOracle.UBERToken").should("have.text", "UBER");
    cy.findByTestId("DfTxUpdateOracle.UBERCurrency").should("have.text", "USD");
  });
});
