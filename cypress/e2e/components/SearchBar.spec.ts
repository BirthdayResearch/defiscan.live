context("search component macbook-16", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.visit("/blocks?network=MainNet");
  });

  it("should have SearchBar.Input", () => {
    cy.findAllByTestId("SearchBar.Input").should("be.visible");
  });

  it("should have search results - blocks", () => {
    cy.findByTestId("Desktop.HeaderSearchBar").within(() => {
      cy.findByTestId("SearchBar.Input").should("be.visible").clear();
      cy.findByTestId("SearchBar.Input").click().type("123");
      cy.findByTestId("SearchResultRow.Block.123").should(
        "have.attr",
        "href",
        "/blocks/61899dc1c56e96e404baadb78af1c9eb06b7800981322d6c2ea453e708d424a2"
      );
    });
  });

  it("should have search results - txn", () => {
    cy.findByTestId("Desktop.HeaderSearchBar").within(() => {
      cy.findByTestId("SearchBar.Input").should("be.visible").clear();
      cy.findByTestId("SearchBar.Input")
        .click()
        .type(
          "ef8583af7b8ab2f18a423b0097a82bf38ebf2775d5e7042159dcc0da73450f36"
        );
      cy.findByTestId(
        "SearchResultRow.Transaction.ef8583af7b8ab2f18a423b0097a82bf38ebf2775d5e7042159dcc0da73450f36"
      ).should(
        "have.attr",
        "href",
        "/transactions/ef8583af7b8ab2f18a423b0097a82bf38ebf2775d5e7042159dcc0da73450f36"
      );
    });
  });

  it("should have search results - address", () => {
    cy.findByTestId("Desktop.HeaderSearchBar").within(() => {
      cy.findByTestId("SearchBar.Input").should("be.visible").clear();
      cy.findByTestId("SearchBar.Input")
        .click()
        .type("8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8");
      cy.findByTestId(
        "SearchResultRow.Address.8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8"
      ).should(
        "have.attr",
        "href",
        "/address/8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8"
      );
    });
  });
});

context("search component macbook-16 - different network", () => {
  before(() => {
    cy.visit("/blocks?network=TestNet");
  });

  beforeEach(() => {
    cy.viewport("macbook-16");
  });

  it("should have network context", () => {
    cy.findByTestId("Desktop.HeaderSearchBar").within(() => {
      cy.findByTestId("SearchBar.Input").clear();
      cy.findByTestId("SearchBar.Input").type("1");
      cy.findByTestId("SearchResultRow.Block.1").click();
      cy.url().should("include", "?network=TestNet");
    });
  });
});

context("search component ipad-2", () => {
  beforeEach(() => {
    cy.visit("/blocks?network=MainNet");
    cy.viewport("ipad-2");
  });

  it("should have SearchBar.Input", () => {
    cy.findAllByTestId("SearchBar.Input").should("be.visible");
  });

  it("should have search results - blocks", () => {
    cy.findByTestId("Tablet.HeaderSearchBar").within(() => {
      cy.findByTestId("SearchBar.Input").should("be.visible").clear();
      cy.findByTestId("SearchBar.Input").click().type("123");
      cy.findByTestId("SearchResultRow.Block.123").should(
        "have.attr",
        "href",
        "/blocks/61899dc1c56e96e404baadb78af1c9eb06b7800981322d6c2ea453e708d424a2"
      );
    });
  });

  it("should have search results - txn", () => {
    cy.findByTestId("Tablet.HeaderSearchBar").within(() => {
      cy.findByTestId("SearchBar.Input").should("be.visible").clear();
      cy.findByTestId("SearchBar.Input")
        .click()
        .type(
          "ef8583af7b8ab2f18a423b0097a82bf38ebf2775d5e7042159dcc0da73450f36"
        );
      cy.findByTestId(
        "SearchResultRow.Transaction.ef8583af7b8ab2f18a423b0097a82bf38ebf2775d5e7042159dcc0da73450f36"
      ).should(
        "have.attr",
        "href",
        "/transactions/ef8583af7b8ab2f18a423b0097a82bf38ebf2775d5e7042159dcc0da73450f36"
      );
    });
  });

  it("should have search results - address", () => {
    cy.findByTestId("Tablet.HeaderSearchBar").within(() => {
      cy.findByTestId("SearchBar.Input").should("be.visible").clear();
      cy.findByTestId("SearchBar.Input")
        .click()
        .type("8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8");
      cy.findByTestId(
        "SearchResultRow.Address.8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8"
      ).should(
        "have.attr",
        "href",
        "/address/8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8"
      );
    });
  });
});

context("search component ipad-2 - different network", () => {
  before(() => {
    cy.visit("/blocks?network=TestNet");
  });

  beforeEach(() => {
    cy.viewport("ipad-2");
  });

  it("should have network context", () => {
    cy.findByTestId("Tablet.HeaderSearchBar").within(() => {
      cy.findByTestId("SearchBar.Input").clear();
      cy.findByTestId("SearchBar.Input").type("1");
      cy.findByTestId("SearchResultRow.Block.1").click();
      cy.url().should("include", "?network=TestNet");
    });
  });
});

context("search component iphone-x", () => {
  beforeEach(() => {
    cy.viewport("iphone-x");
    cy.visit("/blocks?network=MainNet");
  });

  it("should have SearchBar.Input", () => {
    cy.findByTestId("Header.Mobile.SearchIcon").click();
    cy.findByTestId("Mobile.HeaderSearchBar").within(() => {
      cy.findByTestId("SearchBar.Input").should("be.visible");
    });
  });

  it("should have search results - blocks", () => {
    cy.findByTestId("Header.Mobile.SearchIcon").click();
    cy.findByTestId("Mobile.HeaderSearchBar").within(() => {
      cy.findByTestId("SearchBar.Input").should("be.visible").clear();
      cy.findByTestId("SearchBar.Input").click().type("123");
      cy.findByTestId("SearchResultRow.Block.123").should(
        "have.attr",
        "href",
        "/blocks/61899dc1c56e96e404baadb78af1c9eb06b7800981322d6c2ea453e708d424a2"
      );
    });
  });

  it("should have search results - txn", () => {
    cy.findByTestId("Header.Mobile.SearchIcon").click();
    cy.findByTestId("Mobile.HeaderSearchBar").within(() => {
      cy.findByTestId("SearchBar.Input").should("be.visible").clear();
      cy.findByTestId("SearchBar.Input")
        .click()
        .type(
          "ef8583af7b8ab2f18a423b0097a82bf38ebf2775d5e7042159dcc0da73450f36"
        );
      cy.findByTestId(
        "SearchResultRow.Transaction.ef8583af7b8ab2f18a423b0097a82bf38ebf2775d5e7042159dcc0da73450f36"
      ).should(
        "have.attr",
        "href",
        "/transactions/ef8583af7b8ab2f18a423b0097a82bf38ebf2775d5e7042159dcc0da73450f36"
      );
    });
  });

  it("should have search results - address", () => {
    cy.findByTestId("Header.Mobile.SearchIcon").click();
    cy.findByTestId("Mobile.HeaderSearchBar").within(() => {
      cy.findByTestId("SearchBar.Input").should("be.visible").clear();
      cy.findByTestId("SearchBar.Input")
        .click()
        .type("8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8");
      cy.findByTestId(
        "SearchResultRow.Address.8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8"
      ).should(
        "have.attr",
        "href",
        "/address/8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8"
      );
    });
  });
});

context("search component iphone-x - different network", () => {
  beforeEach(() => {
    cy.visit("/blocks?network=TestNet");
    cy.viewport("iphone-x");
  });

  it("should have network context", () => {
    cy.findByTestId("Header.Mobile.SearchIcon").click();
    cy.findByTestId("Mobile.HeaderSearchBar").within(() => {
      cy.findByTestId("SearchBar.Input").clear();
      cy.findByTestId("SearchBar.Input").type("1");
      cy.findByTestId("SearchResultRow.Block.1").click();
      cy.url().should("include", "?network=TestNet");
    });
  });
});
