context("/consortium/asset_breakdown on macbook-16", () => {
  before(() => {
    cy.visit("/consortium/asset_breakdown?network=MainNet");
  });

  beforeEach(() => {
    cy.viewport("macbook-16");
  });

  it("should have heading", () => {
    cy.get("h1").should("have.text", "DeFiChain Consortium");
  });

  it("should have OverflowTable header information", () => {
    cy.findByTestId("OverflowTable.Header").then((ele) => {
      cy.wrap(ele).findByText("Token").should("be.visible");
      cy.wrap(ele).findByText("Member").should("be.visible");
      cy.wrap(ele).findByText("Minted").should("be.visible");
      cy.wrap(ele).findByText("Burned").should("be.visible");
    });
  });

  it("should have info in OverflowTable", () => {
    cy.findAllByTestId("OverflowTable.Row")
      .eq(1)
      .then((ele) => {
        cy.wrap(ele).children().should("have.length", 3);
      });
  });

  /* Will enable post-hardfork 
   it("should have at least 5 tokens listed", () => {
       cy.findAllByTestId("OverflowTable.Row").should("have.length.at.least", 5);
   });
  */
});

context.only("/consortium/asset_breakdown on iphone-x", () => {
  before(() => {
    cy.visit("/consortium/asset_breakdown?network=MainNet");
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.get("h1").should("have.text", "DeFiChain Consortium");
  });

  it("should have CardList list items", () => {
    cy.findAllByTestId("AssetBreakdownCard").within(() => {
      cy.findByTestId("CardList.Header").within(() => {
        cy.findByTestId("CardList.Header.Children").should("be.visible");
        cy.findByTestId("CardList.Header.Toggle").should("not.exist");
      });

      cy.findByTestId("AssetBreakdownCard.CardList.Minted.0").within(() => {
        cy.findByTestId("CardList.Title")
          .should("be.visible")
          .should("have.text", "Minted");
      });
      cy.findByTestId("AssetBreakdownCard.CardList.Burned.0").within(() => {
        cy.findByTestId("CardList.Title")
          .should("be.visible")
          .should("have.text", "Burned");
      });
    });
  });
});
