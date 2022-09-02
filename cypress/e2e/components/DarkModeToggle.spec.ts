context("Dark mode toggle on desktop", () => {
  before(() => {
    cy.visit("/?network=MainNet", {
      onBeforeLoad(win) {
        cy.stub(win, "matchMedia")
          .withArgs("(prefers-color-scheme: dark)")
          .returns({
            matches: false,
          });
      },
    });
  });

  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.clearLocalStorage("color-theme");
  });

  it("should have dark mode toggle", () => {
    cy.get("html").should("have.class", "light");
    cy.findByTestId("DarkModeToggle").should("be.visible");
    cy.findByTestId("DarkModeToggle").click();
    cy.get("html").should("have.class", "dark");
  });
});

context("Dark mode toggle on mobile", () => {
  before(() => {
    cy.visit("/?network=MainNet", {
      onBeforeLoad(win) {
        cy.stub(win, "matchMedia")
          .withArgs("(prefers-color-scheme: dark)")
          .returns({
            matches: false,
          });
      },
    });
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
    cy.clearLocalStorage("color-theme");
  });

  it("should have dark mode toggle", () => {
    cy.get("html").should("have.class", "light");

    cy.findByTestId("Header.OpenMenu").click();
    cy.findByTestId("MobileMenu").within(() => {
      cy.findByTestId("DarkModeToggle").should("be.visible");
      cy.findByTestId("DarkModeToggle").click();
    });

    cy.get("html").should("have.class", "dark");
  });
});
