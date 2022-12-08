
context("/consortium/proof_of_assets on macbook-16", () => {
    before(() => {
        cy.visit("/consortium/proof_of_assets?network=MainNet");
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

    it("should have OverflowTable header information", () => {
        cy.findByTestId("OverflowTable.Header").then((ele) => {
            cy.wrap(ele).findByText("Token").should("be.visible");
            cy.wrap(ele).findByText("Member").should("be.visible");
            cy.wrap(ele).findByText("Address(es)").should("be.visible");
        });
    });

    it('should display no results if list is empty', () => {
        cy.findByTestId("ConsortiumSearchBar.Input").type("xxx");
        cy.findByTestId('ProofOfAssets.EmptyResults').should("have.text", 'No Results found for "xxx"')
    })

    /* Stats to be updated post-hf */
    it('should filter the results by member', () => {
        cy.findByTestId("ConsortiumSearchBar.Input").clear().type("Cake");
        cy.findAllByTestId("OverflowTable.Row").should("have.length", 2); // rowCount is by member
    })

    /* Stats to be updated post-hf */
    it('should filter the results by token', () => {
        cy.findByTestId("ConsortiumSearchBar.Input").clear().type("BTC");
        cy.findAllByTestId("OverflowTable.Row").should("have.length", 2); // rowCount is by member
        cy.findAllByTestId("OverflowTable.Cell").within(() => {
            cy.get("span").should('not.have.text', 'ETH')
        })
    })

    /* Stats to be updated post-hf */
    it('should filter the results by address', () => {
        cy.findByTestId("ConsortiumSearchBar.Input").clear().type("38pZuWUti3vSQuvuFYs8Lwbyje8cmaGhrT");
        cy.findAllByTestId("OverflowTable.Row").should("have.length", 1); // rowCount is by member
    })
});

context.only("/consortium/proof_of_assets on iphone-x", () => {
    before(() => {
        cy.visit("/consortium/proof_of_assets?network=MainNet");
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
})