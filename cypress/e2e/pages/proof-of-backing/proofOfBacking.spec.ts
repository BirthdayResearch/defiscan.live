const quantumBackingAddress =
  "https://etherscan.io/address/0x11901fd641f3a2d3a986d6745a2ff1d5fea988eb";

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
    const tokenSymbols = [
      "dBTC",
      "dETH",
      "dUSDT",
      "dUSDC",
      "dEUROC",
      "dLTC",
      "dBCH",
      "dDOGE",
    ];

    tokenSymbols.forEach((symbol) => {
      cy.findByTestId(`Symbol.${symbol}`).should("be.visible");
    });
  });

  it("should verify Net supply values", () => {});

  it("should verify Cake: Backing address values", () => {
    const cakeSymbols = ["dETH", "dUSDT", "dUSDC", "dUSDC"];

    cy.findByTestId("BackedAddress.Cake.dBTC")
      .should("be.visible")
      .and(
        "have.attr",
        "href",
        "https://www.blockchain.com/btc/address/38pZuWUti3vSQuvuFYs8Lwbyje8cmaGhrT"
      );

    cy.findByTestId("BackedAddress.Cake.dLTC")
      .should("be.visible")
      .and(
        "have.attr",
        "href",
        "https://live.blockcypher.com/ltc/address/MLYQxJfnUfVqRwfYXjDJfmLbyA77hqzSXE"
      );

    cy.findByTestId("BackedAddress.Cake.dBCH")
      .should("be.visible")
      .and(
        "have.attr",
        "href",
        "https://www.blockchain.com/bch/address/38wFczGqaaGLRub2U7CWeWkMuPDwhMVMRf"
      );

    cy.findByTestId("BackedAddress.Cake.dDOGE")
      .should("be.visible")
      .and(
        "have.attr",
        "href",
        "https://dogechain.info/address/D7jrXDgPYck8jL9eYvRrc7Ze8n2e2Loyba"
      );

    cakeSymbols.forEach((symbol) => {
      cy.findByTestId(`BackedAddress.Cake.${symbol}`)
        .should("be.visible")
        .and(
          "have.attr",
          "href",
          "https://etherscan.io/address/0x94fa70d079d76279e1815ce403e9b985bccc82ac"
        );
    });
  });
  it("should verify Quantum: Backing address values", () => {
    const quantumSymbols = ["dBTC", "dETH", "dUSDT", "dUSDC", "dEUROC"];

    quantumSymbols.forEach((symbol) => {
      cy.findByTestId(`BackedAddress.Quantum.${symbol}`)
        .should("be.visible")
        .and("have.attr", "href", quantumBackingAddress);
    });
  });
});

context("/proof-of-backing on iphone-x", () => {
  before(() => {
    cy.visit("/proof-of-backing?network=MainNet");
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
  });
});
