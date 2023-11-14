context("/transactions/[txid] - DfTx any account to account on desktop", () => {
  beforeEach(() => {
    cy.visit(
      "/transactions/8dc36085de6d1605f055891770f92c20e5e62249966124e48c3577c91ad6f8b3?network=MainNet"
    );
    cy.viewport("macbook-13");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains(
      "Type:Any Account To Account"
    );
  });

  it("should have DfTxAnyAccountToAccount from", () => {
    cy.findByTestId("DfTxAnyAccountToAccount.from").should(
      "have.text",
      "dMqFUH75XaqEAefp1wHt36h3MPxo1nZByf"
    );
    cy.findByTestId("DfTxAnyAccountToAccount.from")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/dMqFUH75XaqEAefp1wHt36h3MPxo1nZByf"
      );
  });

  it("should have DfTxAnyAccountToAccount fromAmount", () => {
    cy.findByTestId("DfTxAnyAccountToAccount.fromAmount").should(
      "have.text",
      "0.50000000"
    );
  });

  it("should have DfTxAnyAccountToAccount fromSymbol", () => {
    cy.findByTestId("DfTxAnyAccountToAccount.fromSymbol").should(
      "have.text",
      "dBTC"
    );
  });

  it("should have DfTxAnyAccountToAccount to", () => {
    cy.findByTestId("DfTxAnyAccountToAccount.to").should(
      "have.text",
      "dVQfdjzaz8ydWrJMJuMmFjxKkFHuRiDPJh"
    );
    cy.findByTestId("DfTxAnyAccountToAccount.to")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/dVQfdjzaz8ydWrJMJuMmFjxKkFHuRiDPJh"
      );
  });

  it("should have DfTxAnyAccountToAccount toAmount", () => {
    cy.findByTestId("DfTxAnyAccountToAccount.toAmount").should(
      "have.text",
      "0.50000000"
    );
  });

  it("should have DfTxAnyAccountToAccount toSymbol", () => {
    cy.findByTestId("DfTxAnyAccountToAccount.toSymbol").should(
      "have.text",
      "dBTC"
    );
  });
});

context("/transactions/[txid] - DfTx any account to account on mobile", () => {
  beforeEach(() => {
    cy.visit(
      "/transactions/8dc36085de6d1605f055891770f92c20e5e62249966124e48c3577c91ad6f8b3?network=MainNet"
    );
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains(
      "Type:Any Account To Account"
    );
  });

  it("should have DfTxAnyAccountToAccount from", () => {
    cy.findByTestId("DfTxAnyAccountToAccount.from").should(
      "have.text",
      "dMqFUH75XaqEAefp1wHt36h3MPxo1nZByf"
    );
    cy.findByTestId("DfTxAnyAccountToAccount.from")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/dMqFUH75XaqEAefp1wHt36h3MPxo1nZByf"
      );
  });

  it("should have DfTxAnyAccountToAccount fromAmount", () => {
    cy.findByTestId("DfTxAnyAccountToAccount.fromAmount").should(
      "have.text",
      "0.50000000"
    );
  });

  it("should have DfTxAnyAccountToAccount fromSymbol", () => {
    cy.findByTestId("DfTxAnyAccountToAccount.fromSymbol").should(
      "have.text",
      "dBTC"
    );
  });

  it("should have DfTxAnyAccountToAccount to", () => {
    cy.findByTestId("DfTxAnyAccountToAccount.to").should(
      "have.text",
      "dVQfdjzaz8ydWrJMJuMmFjxKkFHuRiDPJh"
    );
    cy.findByTestId("DfTxAnyAccountToAccount.to")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/dVQfdjzaz8ydWrJMJuMmFjxKkFHuRiDPJh"
      );
  });

  it("should have DfTxAnyAccountToAccount toAmount", () => {
    cy.findByTestId("DfTxAnyAccountToAccount.toAmount").should(
      "have.text",
      "0.50000000"
    );
  });

  it("should have DfTxAnyAccountToAccount toSymbol", () => {
    cy.findByTestId("DfTxAnyAccountToAccount.toSymbol").should(
      "have.text",
      "dBTC"
    );
  });
});
