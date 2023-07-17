context("/blocks/[blockId] on desktop", () => {
  beforeEach(() => {
    cy.visit(
      "/blocks/f66c334c4aa6ea3f3dd18187447d16ae2c6f73941d80eab3ef0e2f1b10acd4c7?network=MainNet"
    );
    cy.viewport("macbook-13");
  });

  it("should have heading", () => {
    cy.get("h1").contains("Block #");
  });

  it("should have block hash", () => {
    cy.findByTestId("block-hash").should(
      "have.text",
      "f66c334c4aa6ea3f3dd18187447d16ae2c6f73941d80eab3ef0e2f1b10acd4c7"
    );
  });

  it("should have block detail height", () => {
    cy.findByTestId("block-detail-height").should("have.text", "1130580");
  });

  it("should have block detail transaction-count", () => {
    cy.findByTestId("block-detail-transaction-count").should("have.text", "64");
  });

  it("should have block detail timestamp", () => {
    cy.findByTestId("block-detail-timestamp").should(
      "have.text",
      "Aug 25, 2021, 3:33:51 AM"
    );
  });

  it("should have block detail confirmations", () => {
    cy.findByTestId("block-detail-confirmations").contains(/\d+/);
  });

  it("should have block detail minter", () => {
    cy.findByTestId("block-detail-minter").should(
      "have.text",
      "8Xy1uEVp4WQkktYAmKJ5mmpWTE9fQ8zuCj"
    );
    cy.findByTestId("block-detail-minter")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/8Xy1uEVp4WQkktYAmKJ5mmpWTE9fQ8zuCj"
      );
  });

  it("should have block detail difficulty", () => {
    cy.findByTestId("block-detail-difficulty").should(
      "have.text",
      "16893394709.78455"
    );
  });

  it("should have block detail size", () => {
    cy.findByTestId("block-detail-size").should("have.text", "18713");
  });

  it("should have block detail version", () => {
    cy.findByTestId("block-detail-version").should("have.text", "536870912");
  });

  it("should have block detail merkle root", () => {
    cy.findByTestId("block-detail-merkle-root").should(
      "have.text",
      "c0bf8aa08389c89f17296ba1d813f4741e25b7096ba924e0a141b6ea7d48f39e"
    );
  });

  it("should have OverflowTable header information", () => {
    cy.findByTestId("OverflowTable.Header").then((ele) => {
      cy.wrap(ele).findByText("TX ID").should("be.visible");
      cy.wrap(ele).findByText("VIN/VOUT").should("be.visible");
      cy.wrap(ele).findByText("TIMESTAMP").should("be.visible");
      cy.wrap(ele).findByText("CONFIRMATIONS").should("be.visible");
    });
  });

  it("should CursorPagination.Next", () => {
    cy.findAllByTestId("OverflowTable.Cell").then((ele) => {
      cy.scrollTo("bottom");
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

context("/blocks/[blockId] on mobile", () => {
  beforeEach(() => {
    cy.visit(
      "/blocks/f66c334c4aa6ea3f3dd18187447d16ae2c6f73941d80eab3ef0e2f1b10acd4c7?network=MainNet"
    );
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.get("h1").contains("Block #");
  });

  it("should have heading", () => {
    cy.findByTestId("block-hash").should(
      "have.text",
      "f66c334c4aa6ea3f3dd18187447d16ae2c6f73941d80eab3ef0e2f1b10acd4c7"
    );
  });

  it("should have OverflowTable header information", () => {
    cy.findByTestId("OverflowTable.Header").then((ele) => {
      cy.wrap(ele).findByText("TX ID").should("be.visible");
    });
  });

  it("should have block hash", () => {
    cy.findByTestId("block-hash").should(
      "have.text",
      "f66c334c4aa6ea3f3dd18187447d16ae2c6f73941d80eab3ef0e2f1b10acd4c7"
    );
  });

  it("should have block detail height", () => {
    cy.findByTestId("block-detail-height").should("have.text", "1130580");
  });

  it("should have block detail transaction-count", () => {
    cy.findByTestId("block-detail-transaction-count").should("have.text", "64");
  });

  it("should have block detail timestamp", () => {
    cy.findByTestId("block-detail-timestamp").should(
      "have.text",
      "Aug 25, 2021, 3:33:51 AM"
    );
  });

  it("should have block detail confirmations", () => {
    cy.findByTestId("block-detail-confirmations").contains(/\d+/);
  });

  it("should have block detail minter", () => {
    cy.findByTestId("block-detail-minter").should(
      "have.text",
      "8Xy1uEVp4WQkktYAmKJ5mmpWTE9fQ8zuCj"
    );
    cy.findByTestId("block-detail-minter")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/address/8Xy1uEVp4WQkktYAmKJ5mmpWTE9fQ8zuCj"
      );
  });

  it("should have block detail difficulty", () => {
    cy.findByTestId("block-detail-difficulty").should(
      "have.text",
      "16893394709.78455"
    );
  });

  it("should have block detail size", () => {
    cy.findByTestId("block-detail-size").should("have.text", "18713");
  });

  it("should have block detail version", () => {
    cy.findByTestId("block-detail-version").should("have.text", "536870912");
  });

  it("should have block detail merkle root", () => {
    cy.findByTestId("block-detail-merkle-root").should(
      "have.text",
      "c0bf8aa08389c89f17296ba1d813f4741e25b7096ba924e0a141b6ea7d48f39e"
    );
  });

  it("should CursorPagination.Next", () => {
    cy.findAllByTestId("OverflowTable.Cell").then((ele) => {
      cy.scrollTo("bottom");
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
