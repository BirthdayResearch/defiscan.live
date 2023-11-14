import {
  cakeBackingAddresses,
  quantumBackingAddresses,
} from "../../../fixtures/proof-of-backing/backingAddresses";

const pobUrlMainnet = "/proof-of-backing?network=MainNet";

context("/proof-of-backing on macbook-16", () => {
  beforeEach(() => {
    cy.visit(pobUrlMainnet);
    cy.viewport("macbook-16");
  });

  it("should have title and description", () => {
    cy.findByTestId("title-header")
      .should("be.visible")
      .and("have.text", "Proof of Backing");
    cy.findByTestId("title-description")
      .should("be.visible")
      .and(
        "have.text",
        "All tokens have backed collateral from which they are minted. See proof of the backed amount on the addresses below."
      );
  });

  it("should have Tokens displayed", () => {
    cakeBackingAddresses.forEach((address) => {
      cy.findByTestId(`symbol-${address.token}`).should("be.visible");
    });
  });

  it("should verify Net supply values", () => {
    cakeBackingAddresses.forEach((address) => {
      cy.getNetSupplyValueBySymbol(address.token).should(
        "match",
        /[-+]?[0-9]*(\.[0-9]+)/
      );
    });
  });

  it("should verify Cake: Backing address values", () => {
    cakeBackingAddresses.forEach((backingAddress) => {
      cy.findByTestId(`backedAddress-cake-${backingAddress.token}`)
        .should("be.visible")
        .and("have.attr", "href", backingAddress.link);
    });
  });

  it("should verify Quantum: Backing address values", () => {
    quantumBackingAddresses.forEach((backingAddress) => {
      cy.findByTestId(`backedAddress-quantum-filled-${backingAddress.token}`)
        .should("be.visible")
        .and("have.attr", "href", backingAddress.link);
    });
  });
});

context("/proof-of-backing on iphone-x", () => {
  beforeEach(() => {
    cy.visit(pobUrlMainnet);
    cy.viewport("iphone-x");
  });

  it("should have Tokens links be displayed", () => {
    cakeBackingAddresses.forEach((address) => {
      cy.findByTestId(`mobile-viewLink-${address.token}`).should(
        "have.attr",
        "href",
        `/tokens/${address.token}`
      );
      cy.findByTestId(`mobile-viewLink-${address.token}`)
        .parent()
        .should("be.visible");
    });
  });

  it("should expand each the Symbol card in mobile view", () => {
    cakeBackingAddresses.forEach((address) => {
      cy.findByTestId(`mobile-selectBlock-${address.token}`)
        .find("svg")
        .click();
    });
    cy.findByTestId(
      `mobile-netSupply-${
        cakeBackingAddresses[cakeBackingAddresses.length - 1].token
      }`
    ).should("be.visible");
  });
});
