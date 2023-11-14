context("/transactions/[txid] - DfTx Composite Swap on desktop", () => {
  before(() => {
    cy.visit(
      "/transactions/8958eb8541bf65a8604b828b4aac33bd2933f5879827b89d4dd25cb52bd6de61?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("macbook-16");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Composite Swap");
  });

  it("should have DfTxCompositeSwap SwapFrom", () => {
    cy.findByTestId("DfTxCompositeSwap.SwapFrom").within(() => {
      cy.findByTestId("DfTxCompositeSwap.SwapFromTitle").should(
        "have.text",
        "Swap From"
      );

      cy.findByTestId("DfTxCompositeSwap.FromAddress").should(
        "have.text",
        "df1qcmmkar3spm3q2ts3v5g52xjwqdvtd2a8e72tzm"
      );

      cy.findByTestId("DfTxCompositeSwap.FromTokenSymbol").should(
        "have.text",
        "DUSD"
      );

      cy.findByTestId("DfTxCompositeSwap.FromTokenSymbol").should("be.visible");

      cy.findByTestId("DfTxCompositeSwap.FromAmount").should(
        "have.text",
        "0.00100000"
      );
    });
  });

  it("should have DfTxCompositeSwap SwapTo", () => {
    cy.findByTestId("DfTxCompositeSwap.SwapTo").within(() => {
      cy.findByTestId("DfTxCompositeSwap.SwapToTitle").should(
        "have.text",
        "Swap To"
      );

      cy.findByTestId("DfTxCompositeSwap.ToAddress").should(
        "have.text",
        "df1qcmmkar3spm3q2ts3v5g52xjwqdvtd2a8e72tzm"
      );

      cy.findByTestId("DfTxCompositeSwap.ToTokenSymbol").should(
        "have.text",
        "dBTC"
      );

      cy.findByTestId("DfTxCompositeSwap.ToTokenSymbol").should("be.visible");

      cy.findByTestId("DfTxCompositeSwap.MaxPrice").should(
        "have.text",
        "51,500.00000000"
      );

      cy.findByTestId("DfTxCompositeSwap.toAmount").should(
        "have.text",
        "0.00000002"
      );
    });
  });

  it("should have DfTxCompositeSwap SwapPath", () => {
    cy.findByTestId("DfTxCompositeSwap.SwapPath").within(() => {
      cy.findByTestId("DfTxCompositeSwap.SwapPathTitle").should(
        "have.text",
        "Swap Path"
      );

      cy.findByTestId("DfTxCompositeSwap.SwapPathDiv").should("be.visible");
    });
  });
});

context("/transactions/[txid] - DfTx Composite Swap on mobile", () => {
  before(() => {
    cy.visit(
      "/transactions/8958eb8541bf65a8604b828b4aac33bd2933f5879827b89d4dd25cb52bd6de61?network=MainNet"
    );
  });

  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.findByTestId("DfTxHeader.Title").contains("DeFi Transaction");
  });

  it("should have DfTx type", () => {
    cy.findByTestId("DfTxHeader.Subtitle").contains("Type:Composite Swap");
  });

  it("should have DfTxCompositeSwap SwapFrom", () => {
    cy.findByTestId("DfTxCompositeSwap.SwapFrom").within(() => {
      cy.findByTestId("DfTxCompositeSwap.SwapFromTitle").should(
        "have.text",
        "Swap From"
      );

      cy.findByTestId("DfTxCompositeSwap.FromAddress").should(
        "have.text",
        "df1qcmmkar3spm3q2ts3v5g52xjwqdvtd2a8e72tzm"
      );

      cy.findByTestId("DfTxCompositeSwap.FromTokenSymbol").should(
        "have.text",
        "DUSD"
      );

      cy.findByTestId("DfTxCompositeSwap.FromTokenSymbol").should("be.visible");

      cy.findByTestId("DfTxCompositeSwap.FromAmount").should(
        "have.text",
        "0.00100000"
      );
    });
  });

  it("should have DfTxCompositeSwap SwapTo", () => {
    cy.findByTestId("DfTxCompositeSwap.SwapTo").within(() => {
      cy.findByTestId("DfTxCompositeSwap.SwapToTitle").should(
        "have.text",
        "Swap To"
      );

      cy.findByTestId("DfTxCompositeSwap.ToAddress").should(
        "have.text",
        "df1qcmmkar3spm3q2ts3v5g52xjwqdvtd2a8e72tzm"
      );

      cy.findByTestId("DfTxCompositeSwap.ToTokenSymbol").should(
        "have.text",
        "dBTC"
      );

      cy.findByTestId("DfTxCompositeSwap.ToTokenSymbol").should("be.visible");
      cy.findByTestId("DfTxCompositeSwap.MaxPrice").should(
        "have.text",
        "51,500.00000000"
      );

      cy.findByTestId("DfTxCompositeSwap.toAmount").should(
        "have.text",
        "0.00000002"
      );
    });
  });

  it("should have DfTxCompositeSwap SwapPath", () => {
    cy.findByTestId("DfTxCompositeSwap.SwapPath").within(() => {
      cy.findByTestId("DfTxCompositeSwap.SwapPathTitle").should(
        "have.text",
        "Swap Path"
      );

      cy.findByTestId("DfTxCompositeSwap.SwapPathDiv").should("be.visible");
    });
  });
});
