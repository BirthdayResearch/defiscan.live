import "@testing-library/cypress/add-commands";

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Intercept SSR /_next/data/* page load click and wait
       * @param {() => void} exec to execute before waiting
       */
      interceptServerSideWait(exec: () => void): Chainable<null>;
      getNetSupplyValueBySymbol(symbol: string): Chainable<null>;
    }
  }
}

Cypress.Commands.add("interceptServerSideWait", (exec: () => void) => {
  cy.intercept("GET", "/_next/data/**").as("nextData");
  exec();
  cy.wait("@nextData");
  cy.wait(500);
});

Cypress.Commands.add("getNetSupplyValueBySymbol", (symbol) => {
  cy.findByTestId(`netSupply-value-${symbol}`)
    .invoke("text")
    .then((s) => {
      s = s.substring(0, s.lastIndexOf(" "));
      return s.replaceAll(",", "");
    });
});
