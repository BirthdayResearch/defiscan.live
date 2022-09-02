context("/transactions/[txid] - DfTx ICX Make Offer on desktop", () => {
  before(() => {
    cy.visit(
      "/transactions/9ffb051a64d9c5600d0432e83bfbac81fd0645172ed8e48ecaa5157b3f4fb16f?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("macbook-13");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:ICX Make Offer");
  });

  it("should have DfTxICXMakeOffer OrderTx", () => {
    cy.findByTestId("DfTxICXMakeOffer.OrderTx").should(
      "have.text",
      "17bf3dacb6bb5227b3393e63eeadd89a855a99d67efe9d3b4f99ed47c221ae54"
    );
    cy.findByTestId("DfTxICXMakeOffer.OrderTx")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/transactions/17bf3dacb6bb5227b3393e63eeadd89a855a99d67efe9d3b4f99ed47c221ae54"
      );
  });

  it("should have DfTxICXMakeOffer amount", () => {
    cy.findByTestId("DfTxICXMakeOffer.Amount").should(
      "have.text",
      "0.10000000"
    );
  });

  it("should have DfTxICXMakeOffer TakerFee", () => {
    cy.findByTestId("DfTxICXMakeOffer.TakerFee").should(
      "have.text",
      "0.00000000"
    );
  });

  it("should have DfTxICXMakeOffer Expiry", () => {
    cy.findByTestId("DfTxICXMakeOffer.Expiry").should("have.text", "20 Blocks");
  });

  it("should have DfTxICXMakeOffer OwnerAddress", () => {
    cy.findByTestId("DfTxICXMakeOffer.OwnerAddress").should(
      "have.text",
      "dHWPd6DtartruFfEugTgWc8FaB1syM4MD9"
    );
    cy.findByTestId("DfTxICXMakeOffer.OwnerAddress")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/dHWPd6DtartruFfEugTgWc8FaB1syM4MD9"
      );
  });

  it("should have DfTxICXMakeOffer Pubkey", () => {
    cy.findByTestId("DfTxICXMakeOffer.Pubkey").should("have.text", "N/A");
  });
});

context("/transactions/[txid] - DfTx ICX Make Offer on mobile", () => {
  before(() => {
    cy.visit(
      "/transactions/9ffb051a64d9c5600d0432e83bfbac81fd0645172ed8e48ecaa5157b3f4fb16f?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:ICX Make Offer");
  });

  it("should have DfTxICXMakeOffer OrderTx", () => {
    cy.findByTestId("DfTxICXMakeOffer.OrderTx").should(
      "have.text",
      "17bf3dacb6bb5227b3393e63eeadd89a855a99d67efe9d3b4f99ed47c221ae54"
    );
    cy.findByTestId("DfTxICXMakeOffer.OrderTx")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/transactions/17bf3dacb6bb5227b3393e63eeadd89a855a99d67efe9d3b4f99ed47c221ae54"
      );
  });

  it("should have DfTxICXMakeOffer amount", () => {
    cy.findByTestId("DfTxICXMakeOffer.Amount").should(
      "have.text",
      "0.10000000"
    );
  });

  it("should have DfTxICXMakeOffer TakerFee", () => {
    cy.findByTestId("DfTxICXMakeOffer.TakerFee").should(
      "have.text",
      "0.00000000"
    );
  });

  it("should have DfTxICXMakeOffer Expiry", () => {
    cy.findByTestId("DfTxICXMakeOffer.Expiry").should("have.text", "20 Blocks");
  });

  it("should have DfTxICXMakeOffer OwnerAddress", () => {
    cy.findByTestId("DfTxICXMakeOffer.OwnerAddress").should(
      "have.text",
      "dHWPd6DtartruFfEugTgWc8FaB1syM4MD9"
    );
    cy.findByTestId("DfTxICXMakeOffer.OwnerAddress")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/dHWPd6DtartruFfEugTgWc8FaB1syM4MD9"
      );
  });

  it("should have DfTxICXMakeOffer Pubkey", () => {
    cy.findByTestId("DfTxICXMakeOffer.Pubkey").should("have.text", "N/A");
  });
});
