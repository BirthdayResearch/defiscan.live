context("/transactions/[txid] - DfTx ICXCreateOrder on desktop", () => {
  before(() => {
    cy.visit(
      "/transactions/b65784e0c8ac2afa3d40299eb3086a92f2cb6c61a5364ff1c5b4d832efda41fd?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("macbook-13");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:ICX Create Order");
  });

  it("should have DfTxICXCreateOrder token", () => {
    cy.findByTestId("DfTxICXCreateOrder.token").should("have.text", "dBTC");
  });

  it("should have DfTxICXCreateOrder amountFrom", () => {
    cy.findByTestId("DfTxICXCreateOrder.amountFrom").should(
      "have.text",
      "0.00100000"
    );
  });

  it("should have DfTxICXCreateOrder amountToFill", () => {
    cy.findByTestId("DfTxICXCreateOrder.amountToFill").should(
      "have.text",
      "0.00100000"
    );
  });

  it("should have DfTxICXCreateOrder orderPrice", () => {
    cy.findByTestId("DfTxICXCreateOrder.orderPrice").should(
      "have.text",
      "1.00000000"
    );
  });

  it("should have DfTxICXCreateOrder orderType", () => {
    cy.findByTestId("DfTxICXCreateOrder.orderType").should(
      "have.text",
      "Internal"
    );
  });

  it("should have DfTxICXCreateOrder expiry", () => {
    cy.findByTestId("DfTxICXCreateOrder.expiry").should(
      "have.text",
      "2880 Blocks"
    );
  });

  it("should have DfTxICXCreateOrder ownerAddress", () => {
    cy.findByTestId("DfTxICXCreateOrder.ownerAddress").should(
      "have.text",
      "8cDSPjDe7HqvzmSL33xCrcrvBbUcmkTSpg"
    );
    cy.findByTestId("DfTxICXCreateOrder.ownerAddress")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/8cDSPjDe7HqvzmSL33xCrcrvBbUcmkTSpg"
      );
  });

  it("should have DfTxICXCreateOrder pubkey", () => {
    cy.findByTestId("DfTxICXCreateOrder.pubkey").should("have.text", "N/A");
  });
});

context("/transactions/[txid] - DfTx ICXCreateOrder on mobile", () => {
  before(() => {
    cy.visit(
      "/transactions/b65784e0c8ac2afa3d40299eb3086a92f2cb6c61a5364ff1c5b4d832efda41fd?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:ICX Create Order");
  });

  it("should have DfTxICXCreateOrder token", () => {
    cy.findByTestId("DfTxICXCreateOrder.token").should("have.text", "dBTC");
  });

  it("should have DfTxICXCreateOrder amountFrom", () => {
    cy.findByTestId("DfTxICXCreateOrder.amountFrom").should(
      "have.text",
      "0.00100000"
    );
  });

  it("should have DfTxICXCreateOrder amountToFill", () => {
    cy.findByTestId("DfTxICXCreateOrder.amountToFill").should(
      "have.text",
      "0.00100000"
    );
  });

  it("should have DfTxICXCreateOrder orderType", () => {
    cy.findByTestId("DfTxICXCreateOrder.orderType").should(
      "have.text",
      "Internal"
    );
  });

  it("should have DfTxICXCreateOrder orderPrice", () => {
    cy.findByTestId("DfTxICXCreateOrder.orderPrice").should(
      "have.text",
      "1.00000000"
    );
  });

  it("should have DfTxICXCreateOrder expiry", () => {
    cy.findByTestId("DfTxICXCreateOrder.expiry").should(
      "have.text",
      "2880 Blocks"
    );
  });

  it("should have DfTxICXCreateOrder ownerAddress", () => {
    cy.findByTestId("DfTxICXCreateOrder.ownerAddress").should(
      "have.text",
      "8cDSPjDe7HqvzmSL33xCrcrvBbUcmkTSpg"
    );
    cy.findByTestId("DfTxICXCreateOrder.ownerAddress")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/8cDSPjDe7HqvzmSL33xCrcrvBbUcmkTSpg"
      );
  });

  it("should have DfTxICXCreateOrder pubkey", () => {
    cy.findByTestId("DfTxICXCreateOrder.pubkey").should("have.text", "N/A");
  });
});
