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

  it("should have heading desc", () => {
    cy.findByTestId("heading-desc").should("have.text", "DeFiChain consortium provides an overview of the dtokens which each consortium member is accountable for. Consortium members will be responsible for the backing of the available tokens that was minted through them.");
  })

  it('should display the pie chart details', () => {
    cy.findByTestId('Asset.Breakdown.PieChart').should("exist")
    cy.findByTestId('Pie.Member.Cake.Name').should("have.text", "Cake")
    cy.findByTestId('Pie.Member.Cake.Value').should("exist")
    cy.findByTestId('Pie.Member.Birthday Research.Name').should("have.text", "Birthday Research")
    cy.findByTestId('Pie.Member.Birthday Research.Value').should("exist")
  })

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
        cy.wrap(ele).children().should("have.length", 4);
      });
  });

  /* Will enable post-hardfork 
   it("should have at least 5 tokens listed", () => {
       cy.findAllByTestId("OverflowTable.Row").should("have.length.at.least", 5);
   });
  */

  /* Stats to be updated post-hf */
  it('should filter the results by name', () => {
    cy.findByTestId("AssetSearchBar.Input").clear().type("Cake");
    cy.findAllByTestId("OverflowTable.Row").should("have.length", 2);
  })

  it('should filter the results by token', () => {
    cy.findByTestId("AssetSearchBar.Input").clear().type("dBTC");
    cy.findAllByTestId("OverflowTable.Row").should("have.length", 2);
    cy.findAllByTestId("OverflowTable.Cell").within(() => {
      cy.get("span").should('not.have.text', 'dETH')
    })
  })
});

context("/consortium/asset_breakdown on iphone-x", () => {
  before(() => {
    cy.visit("/consortium/asset_breakdown?network=MainNet");
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.get("h1").should("have.text", "DeFiChain Consortium");
  });

  it("should have heading desc", () => {
    cy.findByTestId("heading-desc").should("have.text", "DeFiChain consortium provides an overview of the dtokens which each consortium member is accountable for. Consortium members will be responsible for the backing of the available tokens that was minted through them.");
  })

  it('should display the pie chart details', () => {
    cy.findByTestId('Asset.Breakdown.PieChart').should("exist")
    cy.findByTestId('Pie.Member.Cake.Name').should("have.text", "Cake")
    cy.findByTestId('Pie.Member.Cake.Value').should("exist")
    cy.findByTestId('Pie.Member.Birthday Research.Name').should("have.text", "Birthday Research")
    cy.findByTestId('Pie.Member.Birthday Research.Value').should("exist")
  })

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

  it('should display no results if list is empty', () => {
    cy.findByTestId("AssetSearchBar.Input").type("xxx");
    cy.findByTestId('AssetBreakdown.EmptyResults').should("have.text", 'No Results found for "xxx"')
  })

  it('should filter the results by name', () => {
    cy.findByTestId("AssetSearchBar.Input").clear().type("Cake");
    cy.findAllByTestId("AssetBreakdownCard").should("have.length", 2);
  })
});
