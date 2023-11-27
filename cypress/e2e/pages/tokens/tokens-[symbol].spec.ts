context("/tokens/1 (Ether) Desktop", () => {
  beforeEach(() => {
    cy.visit("/tokens/1?network=MainNet");
    cy.viewport("macbook-13");
  });

  it("should have page header", () => {
    cy.findByTestId("PageHeading").should("contain.text", "Ether");
  });

  it("should have <BreadCrums />", () => {
    cy.findByTestId("Breadcrumb")
      .should("have.length", 1)
      .should("contain.text", "Scan")
      .should("contain.text", "Tokens");
  });

  it("should have details in <AdaptiveList />  left", () => {
    cy.findAllByTestId("AdaptiveList")
      .eq(0)
      .then((ele) => {
        cy.wrap(ele).should("contain.text", "Category");
        cy.wrap(ele).should("contain.text", "Symbol");
        cy.wrap(ele).should("contain.text", "Mintable");
        cy.wrap(ele).should("contain.text", "Burned");
        cy.wrap(ele).should("contain.text", "Net Supply");
        cy.wrap(ele).should("contain.text", "Creation Tx");
        cy.wrap(ele).should("contain.text", "Minted");
        cy.wrap(ele).should("contain.text", "Creation Height");
      });
  });

  it("should have details in <AdaptiveList />  right", () => {
    cy.findAllByTestId("AdaptiveList")
      .eq(1)
      .then((ele) => {
        cy.wrap(ele).should("contain.text", "Decimal");
        cy.wrap(ele).should("contain.text", "Limit");
        cy.wrap(ele).should("contain.text", "LPS");
        cy.wrap(ele).should("contain.text", "Tradable");
        cy.wrap(ele).should("contain.text", "Finalized");
        cy.wrap(ele).should("contain.text", "Destruction Height");
        cy.wrap(ele).should("contain.text", "Destruction TX");
        cy.wrap(ele).should("contain.text", "Backing Address");
      });
  });

  it("should redirect to individual token page", () => {
    cy.visit("/tokens/DFI");
    cy.findByText("DFI").should("exist");

    cy.visit("/tokens/dBCH-DFI");
    cy.findByText("dBCH-DFI").should("exist");

    cy.visit("/tokens/eth-dfi-191");
    cy.findByText("ETH-DFI").should("exist");
    cy.findByText("DCT").should("exist");

    cy.visit("/tokens/dbtc");
    cy.findByText("dBTC").should("exist");
  });
});

context("/tokens/1 (Ether) Mobile", () => {
  beforeEach(() => {
    cy.visit("/tokens/1?network=MainNet");
    cy.viewport("iphone-6");
  });

  it("should have page header", () => {
    cy.findByTestId("PageHeading").should("contain.text", "Ether");
  });

  it("should have <BreadCrums />", () => {
    cy.findByTestId("Breadcrumb")
      .should("have.length", 1)
      .should("contain.text", "Scan")
      .should("contain.text", "Tokens");
  });

  it("should have details in <AdaptiveList />  left", () => {
    cy.findAllByTestId("AdaptiveList")
      .eq(0)
      .then((ele) => {
        cy.wrap(ele).should("contain.text", "Category");
        cy.wrap(ele).should("contain.text", "Symbol");
        cy.wrap(ele).should("contain.text", "Mintable");
        cy.wrap(ele).should("contain.text", "Burned");
        cy.wrap(ele).should("contain.text", "Net Supply");
        cy.wrap(ele).should("contain.text", "Creation Tx");
        cy.wrap(ele).should("contain.text", "Minted");
        cy.wrap(ele).should("contain.text", "Creation Height");
      });
  });

  it("should have details in <AdaptiveList />  right", () => {
    cy.findAllByTestId("AdaptiveList")
      .eq(1)
      .then((ele) => {
        cy.wrap(ele).should("contain.text", "Decimal");
        cy.wrap(ele).should("contain.text", "Limit");
        cy.wrap(ele).should("contain.text", "LPS");
        cy.wrap(ele).should("contain.text", "Tradable");
        cy.wrap(ele).should("contain.text", "Finalized");
        cy.wrap(ele).should("contain.text", "Destruction Height");
        cy.wrap(ele).should("contain.text", "Destruction TX");
        cy.wrap(ele).should("contain.text", "Backing Address");
      });
  });
});

context("/tokens/* Backing Addresses", () => {
  beforeEach(() => {
    cy.viewport("macbook-13");
  });

  it("should have backing address for BTC", () => {
    cy.visit("/tokens/2?network=MainNet");
    cy.findAllByTestId("AdaptiveList")
      .eq(1)
      .then((ele) => {
        cy.wrap(ele).should("contain.text", "Backing Address");
      });
    cy.findByTestId("BackingAddress.BTC").should(
      "have.text",
      "3GcSHxkKY8ADMWRam51T1WYxYSb2vH62VL",
    );
    cy.findByTestId("BackingAddress.BTC")
      .find("a")
      .should(
        "have.attr",
        "href",
        "https://www.blockchain.com/btc/address/3GcSHxkKY8ADMWRam51T1WYxYSb2vH62VL",
      );
  });

  it("should have backing address for ETH", () => {
    cy.visit("/tokens/1?network=MainNet");
    cy.findAllByTestId("AdaptiveList")
      .eq(1)
      .then((ele) => {
        cy.wrap(ele).should("contain.text", "Backing Address");
      });
    cy.findByTestId("BackingAddress.ETH").should(
      "have.text",
      "0xc889faf456439fb932b9ce3d4f43d8078177fd29",
    );
    cy.findByTestId("BackingAddress.ETH")
      .find("a")
      .should(
        "have.attr",
        "href",
        "https://etherscan.io/address/0xc889faf456439fb932b9ce3d4f43d8078177fd29",
      );
  });

  it("should have backing address for USDT", () => {
    cy.visit("/tokens/3?network=MainNet");
    cy.findAllByTestId("AdaptiveList")
      .eq(1)
      .then((ele) => {
        cy.wrap(ele).should("contain.text", "Backing Address");
      });
    cy.findByTestId("BackingAddress.ETH").should(
      "have.text",
      "0xc889faf456439fb932b9ce3d4f43d8078177fd29",
    );
    cy.findByTestId("BackingAddress.ETH")
      .find("a")
      .should(
        "have.attr",
        "href",
        "https://etherscan.io/address/0xc889faf456439fb932b9ce3d4f43d8078177fd29",
      );
  });

  it("should have backing address for USDC", () => {
    cy.visit("/tokens/13?network=MainNet");
    cy.findAllByTestId("AdaptiveList")
      .eq(1)
      .then((ele) => {
        cy.wrap(ele).should("contain.text", "Backing Address");
      });
    cy.findByTestId("BackingAddress.ETH").should(
      "have.text",
      "0xc889faf456439fb932b9ce3d4f43d8078177fd29",
    );
    cy.findByTestId("BackingAddress.ETH")
      .find("a")
      .should(
        "have.attr",
        "href",
        "https://etherscan.io/address/0xc889faf456439fb932b9ce3d4f43d8078177fd29",
      );
  });

  it("should have backing address for DOGE", () => {
    cy.visit("/tokens/7?network=MainNet");
    cy.findAllByTestId("AdaptiveList")
      .eq(1)
      .then((ele) => {
        cy.wrap(ele).should("contain.text", "Backing Address");
      });
    cy.findByTestId("BackingAddress.DOGE").should(
      "have.text",
      "9uv4fqPjSYNVNvqzbuGUMACBw67qQcLTxg",
    );
    cy.findByTestId("BackingAddress.DOGE")
      .find("a")
      .should(
        "have.attr",
        "href",
        "https://dogechain.info/address/9uv4fqPjSYNVNvqzbuGUMACBw67qQcLTxg",
      );
  });

  it("should have backing address for LTC", () => {
    cy.visit("/tokens/9?network=MainNet");
    cy.findAllByTestId("AdaptiveList")
      .eq(1)
      .then((ele) => {
        cy.wrap(ele).should("contain.text", "Backing Address");
      });
    cy.findByTestId("BackingAddress.LTC").should(
      "have.text",
      "MTorFqmHaoFSBTmRGTnN1gXRrNqxa3tn2f",
    );
    cy.findByTestId("BackingAddress.LTC")
      .find("a")
      .should(
        "have.attr",
        "href",
        "https://live.blockcypher.com/ltc/address/MTorFqmHaoFSBTmRGTnN1gXRrNqxa3tn2f",
      );
  });

  it("should have backing address for BCH", () => {
    cy.visit("/tokens/11?network=MainNet");
    cy.findAllByTestId("AdaptiveList")
      .eq(1)
      .then((ele) => {
        cy.wrap(ele).should("contain.text", "Backing Address");
      });
    cy.findByTestId("BackingAddress.BCH").should(
      "have.text",
      "38wFczGqaaGLRub2U7CWeWkMuPDwhMVMRf",
    );
    cy.findByTestId("BackingAddress.BCH")
      .find("a")
      .should(
        "have.attr",
        "href",
        "https://www.blockchain.com/bch/address/38wFczGqaaGLRub2U7CWeWkMuPDwhMVMRf",
      );
  });

  it("should redirect to individual token page", () => {
    cy.visit("/tokens/DFI");
    cy.findByText("DFI").should("exist");

    cy.visit("/tokens/dBCH-DFI");
    cy.findByText("dBCH-DFI").should("exist");

    cy.visit("/tokens/eth-dfi-191");
    cy.findByText("ETH-DFI").should("exist");
    cy.findByText("DCT").should("exist");

    cy.visit("/tokens/dbtc");
    cy.findByText("dBTC").should("exist");
  });
});
