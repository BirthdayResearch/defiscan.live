context("/blocks on macbook-16", () => {
  beforeEach(() => {
    cy.visit("/blocks?network=MainNet");
    cy.viewport("macbook-16");
  });

  it("should have heading", () => {
    cy.get("h1").should("have.text", "Blocks");
  });

  it("should have OverflowTable header information", () => {
    cy.findByTestId("OverflowTable.Header").then((ele) => {
      cy.wrap(ele).findByText("Height").should("be.visible");
      cy.wrap(ele).findByText("Age").should("be.visible");
      cy.wrap(ele).findByText("Transactions").should("be.visible");
      cy.wrap(ele).findByText("Minter").should("be.visible");
      cy.wrap(ele).findByText("Size (B)").should("be.visible");
      cy.wrap(ele).findByText("Difficulty").should("be.visible");
    });
  });

  it("should have minutes ago in OverflowTable", () => {
    cy.findAllByTestId("OverflowTable.Cell").then((ele) => {
      cy.wrap(ele).contains("minutes ago").should("be.visible");
    });
  });

  it("should CursorPagination.Next", () => {
    cy.findAllByTestId("OverflowTable.Cell").then((ele) => {
      const pageOneFirstCell = ele[0].innerText;
      cy.interceptServerSideWait(() => {
        cy.findByTestId("CursorPagination.Next").click();
      });
      cy.findAllByTestId("OverflowTable.Cell").then((pageTwoCells) => {
        expect(pageTwoCells[0].innerText).not.equals(pageOneFirstCell);
      });
    });
  });
});

context("/blocks on iphone-x", () => {
  beforeEach(() => {
    cy.visit("/blocks?network=MainNet");
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.get("h1").should("have.text", "Blocks");
  });

  it("should have CardList header information", () => {
    cy.findAllByTestId("BlocksCard", { timeout: 15000 }).each(($blockCard) => {
      cy.wrap($blockCard).within(() => {
        cy.findAllByTestId("BlocksCard.CardList.Age").within(() => {
          cy.findByTestId("CardList.Row.Title")
            .should("be.visible")
            .should("have.text", "Age");
          cy.findByTestId("CardList.Row.Child").should("be.visible");
        });
        cy.findAllByTestId("BlocksCard.CardList.Transactions").within(() => {
          cy.findByTestId("CardList.Row.Title")
            .should("be.visible")
            .should("have.text", "Transactions");
          cy.findByTestId("CardList.Row.Child").should("be.visible");
        });
        cy.findAllByTestId("BlocksCard.CardList.Minter").within(() => {
          cy.findByTestId("CardList.Row.Title")
            .should("be.visible")
            .should("have.text", "Minter");
          cy.findByTestId("CardList.Row.Child").should("be.visible");
        });
        cy.findAllByTestId("BlocksCard.CardList.Size").within(() => {
          cy.findByTestId("CardList.Row.Title")
            .should("be.visible")
            .should("have.text", "Size (B)");
          cy.findByTestId("CardList.Row.Child").should("be.visible");
        });
        cy.findAllByTestId("BlocksCard.CardList.Difficulty").within(() => {
          cy.findByTestId("CardList.Row.Title")
            .should("be.visible")
            .should("have.text", "Difficulty");
          cy.findByTestId("CardList.Row.Child").should("be.visible");
        });
      });
    });
  });

  it("should CursorPagination.Next and CursorPagination.Prev", () => {
    cy.findAllByTestId("OverflowTable.Cell").then((ele) => {
      const pageOneFirstCell = ele[0].innerText;
      cy.interceptServerSideWait(() => {
        cy.findByTestId("CursorPagination.Next").click();
      });
      cy.findAllByTestId("OverflowTable.Cell").then((pageTwoCells) => {
        expect(pageTwoCells[0].innerText).not.equals(pageOneFirstCell);
      });
    });
  });
});
