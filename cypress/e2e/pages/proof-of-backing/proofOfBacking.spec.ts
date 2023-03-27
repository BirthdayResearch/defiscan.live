context("/proof-of-backing on macbook-16", () => {
  before(() => {
    cy.visit("/proof-of-backing?network=MainNet");
  });

  beforeEach(() => {
    cy.viewport("macbook-16");
  });

  it("should have title and description", () => {
    cy.findByTestId("Title.Header")
      .should("be.visible")
      .and("have.text", "Proof of Backing");
    cy.findByTestId("Title.Description")
      .should("be.visible")
      .and(
        "have.text",
        "All tokens have backed collateral from which they are minted. See proof of the backed amount on the addresses below."
      );
  });

  it("should have Tokens displayed", () => {
    cy.findByTestId("Symbol.dBTC").should("be.visible");
    cy.findByTestId("Symbol.dETH").should("be.visible");
    cy.findByTestId("Symbol.dUSDT").should("be.visible");
    cy.findByTestId("Symbol.dUSDC").should("be.visible");
    cy.findByTestId("Symbol.dUSDC").should("be.visible");
    cy.findByTestId("Symbol.dEUROC").should("be.visible");
    cy.findByTestId("Symbol.dBCH").should("be.visible");
    cy.findByTestId("Symbol.dDOGE").should("be.visible");
  });

  it("should verify Net supply values", () => {});

  it("should verify Backing address values", () => {});
});

context("/proof-of-backing on iphone-x", () => {
  before(() => {
    cy.visit("/proof-of-backing?network=MainNet");
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
  });
});
