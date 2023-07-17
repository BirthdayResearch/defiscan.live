context("/blocks/countdown/[query] on desktop - Event Name", () => {
  beforeEach(() => {
    cy.visit("/blocks/countdown/testEvent");
    cy.viewport("macbook-16");
  });

  it("should have InfoSection", () => {
    cy.findByTestId("InfoSection.EventTitle").should("have.text", "Test Event");
    cy.findByTestId("InfoSection.EventHeight").should(
      "have.text",
      "Target Height - 99,999,999"
    );
  });

  it("should have CountdownSection", () => {
    cy.findByTestId("CountdownSection.Days").within(() => {
      cy.findByTestId("CountdownSection.Days.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Days.label")
        .should("be.visible")
        .should("have.text", "Days");
    });
    cy.findByTestId("CountdownSection.Hours").within(() => {
      cy.findByTestId("CountdownSection.Hours.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Hours.label")
        .should("be.visible")
        .should("have.text", "Hours");
    });
    cy.findByTestId("CountdownSection.Minutes").within(() => {
      cy.findByTestId("CountdownSection.Minutes.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Minutes.label")
        .should("be.visible")
        .should("have.text", "Minutes");
    });
    cy.findByTestId("CountdownSection.Seconds").within(() => {
      cy.findByTestId("CountdownSection.Seconds.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Seconds.label")
        .should("be.visible")
        .should("have.text", "Seconds");
    });
  });

  it("should have BlocksInfoSection", () => {
    cy.findByTestId("BlocksInfoSection").should("be.visible");
    cy.findByTestId("BlocksInfoSection.Current.Label")
      .should("be.visible")
      .should("have.text", "Current Height:");
    cy.findByTestId("BlocksInfoSection.Current.Value")
      .should("be.visible")
      .contains(/\d+/);
    cy.findByTestId("BlocksInfoSection.Remaining.Label")
      .should("be.visible")
      .should("have.text", "Remaining Blocks:");
    cy.findByTestId("BlocksInfoSection.Remaining.Value")
      .should("be.visible")
      .contains(/\d+/);
  });
});

context("/blocks/countdown/[query] on desktop - Block Number", () => {
  beforeEach(() => {
    cy.visit("/blocks/countdown/99999998");
    cy.viewport("macbook-16");
  });

  it("should have InfoSection", () => {
    cy.findByTestId("InfoSection.BlockHeight").should(
      "have.text",
      "Block #99,999,998"
    );
    cy.findByTestId("InfoSection.EventTitle").should("not.exist");
    cy.findByTestId("InfoSection.EventHeight").should("not.exist");
  });

  it("should have CountdownSection", () => {
    cy.findByTestId("CountdownSection.Days").within(() => {
      cy.findByTestId("CountdownSection.Days.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Days.label")
        .should("be.visible")
        .should("have.text", "Days");
    });
    cy.findByTestId("CountdownSection.Hours").within(() => {
      cy.findByTestId("CountdownSection.Hours.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Hours.label")
        .should("be.visible")
        .should("have.text", "Hours");
    });
    cy.findByTestId("CountdownSection.Minutes").within(() => {
      cy.findByTestId("CountdownSection.Minutes.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Minutes.label")
        .should("be.visible")
        .should("have.text", "Minutes");
    });
    cy.findByTestId("CountdownSection.Seconds").within(() => {
      cy.findByTestId("CountdownSection.Seconds.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Seconds.label")
        .should("be.visible")
        .should("have.text", "Seconds");
    });
  });

  it("should have BlocksInfoSection", () => {
    cy.findByTestId("BlocksInfoSection").should("be.visible");
    cy.findByTestId("BlocksInfoSection.Current.Label")
      .should("be.visible")
      .should("have.text", "Current Height:");
    cy.findByTestId("BlocksInfoSection.Current.Value")
      .should("be.visible")
      .contains(/\d+/);
    cy.findByTestId("BlocksInfoSection.Remaining.Label")
      .should("be.visible")
      .should("have.text", "Remaining Blocks:");
    cy.findByTestId("BlocksInfoSection.Remaining.Value")
      .should("be.visible")
      .contains(/\d+/);
  });
});

context("/blocks/countdown/[query] on desktop - Block Number = Event", () => {
  beforeEach(() => {
    cy.visit("/blocks/countdown/99999999");
    cy.viewport("macbook-16");
  });

  it("should have InfoSection", () => {
    cy.findByTestId("InfoSection.EventTitle").should("have.text", "Test Event");
    cy.findByTestId("InfoSection.EventHeight").should(
      "have.text",
      "Target Height - 99,999,999"
    );
  });
});

context("/blocks/countdown/[query] on desktop - NextFutureSwap", () => {
  beforeEach(() => {
    cy.visit("/blocks/countdown/NextFutureSwap");
    cy.viewport("macbook-16");
  });

  it("should have InfoSection", () => {
    cy.findByTestId("InfoSection.EventTitle").should(
      "have.text",
      "Next Future Settlement Block"
    );
    cy.findByTestId("InfoSection.EventHeight").should("exist");
  });

  it("should have CountdownSection", () => {
    cy.findByTestId("CountdownSection.Days").within(() => {
      cy.findByTestId("CountdownSection.Days.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Days.label")
        .should("be.visible")
        .should("have.text", "Days");
    });
    cy.findByTestId("CountdownSection.Hours").within(() => {
      cy.findByTestId("CountdownSection.Hours.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Hours.label")
        .should("be.visible")
        .should("have.text", "Hours");
    });
    cy.findByTestId("CountdownSection.Minutes").within(() => {
      cy.findByTestId("CountdownSection.Minutes.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Minutes.label")
        .should("be.visible")
        .should("have.text", "Minutes");
    });
    cy.findByTestId("CountdownSection.Seconds").within(() => {
      cy.findByTestId("CountdownSection.Seconds.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Seconds.label")
        .should("be.visible")
        .should("have.text", "Seconds");
    });
  });

  it("should have BlocksInfoSection", () => {
    cy.findByTestId("BlocksInfoSection").should("be.visible");
    cy.findByTestId("BlocksInfoSection.Current.Label")
      .should("be.visible")
      .should("have.text", "Current Height:");
    cy.findByTestId("BlocksInfoSection.Current.Value")
      .should("be.visible")
      .contains(/\d+/);
    cy.findByTestId("BlocksInfoSection.Remaining.Label")
      .should("be.visible")
      .should("have.text", "Remaining Blocks:");
    cy.findByTestId("BlocksInfoSection.Remaining.Value")
      .should("be.visible")
      .contains(/\d+/);
  });
});

context("/blocks/countdown/[query] on mobile - Event Name", () => {
  beforeEach(() => {
    cy.visit("/blocks/countdown/testEvent");
    cy.viewport("iphone-x");
  });

  it("should have InfoSection", () => {
    cy.findByTestId("InfoSection.EventTitle").should("have.text", "Test Event");
    cy.findByTestId("InfoSection.EventHeight").should(
      "have.text",
      "Target Height - 99,999,999"
    );
  });

  it("should have CountdownSection", () => {
    cy.findByTestId("CountdownSection.Days").within(() => {
      cy.findByTestId("CountdownSection.Days.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Days.label")
        .should("be.visible")
        .should("have.text", "Days");
    });
    cy.findByTestId("CountdownSection.Hours").within(() => {
      cy.findByTestId("CountdownSection.Hours.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Hours.label")
        .should("be.visible")
        .should("have.text", "Hours");
    });
    cy.findByTestId("CountdownSection.Minutes").within(() => {
      cy.findByTestId("CountdownSection.Minutes.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Minutes.label")
        .should("be.visible")
        .should("have.text", "Minutes");
    });
    cy.findByTestId("CountdownSection.Seconds").within(() => {
      cy.findByTestId("CountdownSection.Seconds.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Seconds.label")
        .should("be.visible")
        .should("have.text", "Seconds");
    });
  });

  it("should have BlocksInfoSection", () => {
    cy.findByTestId("BlocksInfoSection").should("be.visible");
    cy.findByTestId("BlocksInfoSection.Current.Label")
      .should("be.visible")
      .should("have.text", "Current Height:");
    cy.findByTestId("BlocksInfoSection.Current.Value")
      .should("be.visible")
      .contains(/\d+/);
    cy.findByTestId("BlocksInfoSection.Remaining.Label")
      .should("be.visible")
      .should("have.text", "Remaining Blocks:");
    cy.findByTestId("BlocksInfoSection.Remaining.Value")
      .should("be.visible")
      .contains(/\d+/);
  });
});

context("/blocks/countdown/[query] on mobile - Block Number", () => {
  beforeEach(() => {
    cy.visit("/blocks/countdown/99999998");
    cy.viewport("iphone-x");
  });

  it("should have InfoSection", () => {
    cy.findByTestId("InfoSection.BlockHeight").should(
      "have.text",
      "Block #99,999,998"
    );
    cy.findByTestId("InfoSection.EventTitle").should("not.exist");
    cy.findByTestId("InfoSection.EventHeight").should("not.exist");
  });

  it("should have CountdownSection", () => {
    cy.findByTestId("CountdownSection.Days").within(() => {
      cy.findByTestId("CountdownSection.Days.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Days.label")
        .should("be.visible")
        .should("have.text", "Days");
    });
    cy.findByTestId("CountdownSection.Hours").within(() => {
      cy.findByTestId("CountdownSection.Hours.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Hours.label")
        .should("be.visible")
        .should("have.text", "Hours");
    });
    cy.findByTestId("CountdownSection.Minutes").within(() => {
      cy.findByTestId("CountdownSection.Minutes.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Minutes.label")
        .should("be.visible")
        .should("have.text", "Minutes");
    });
    cy.findByTestId("CountdownSection.Seconds").within(() => {
      cy.findByTestId("CountdownSection.Seconds.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Seconds.label")
        .should("be.visible")
        .should("have.text", "Seconds");
    });
  });

  it("should have BlocksInfoSection", () => {
    cy.findByTestId("BlocksInfoSection").should("be.visible");
    cy.findByTestId("BlocksInfoSection.Current.Label")
      .should("be.visible")
      .should("have.text", "Current Height:");
    cy.findByTestId("BlocksInfoSection.Current.Value")
      .should("be.visible")
      .contains(/\d+/);
    cy.findByTestId("BlocksInfoSection.Remaining.Label")
      .should("be.visible")
      .should("have.text", "Remaining Blocks:");
    cy.findByTestId("BlocksInfoSection.Remaining.Value")
      .should("be.visible")
      .contains(/\d+/);
  });
});

context("/blocks/countdown/[query] on mobile - Event Name = Event", () => {
  beforeEach(() => {
    cy.visit("/blocks/countdown/99999999");
    cy.viewport("iphone-x");
  });

  it("should have InfoSection", () => {
    cy.findByTestId("InfoSection.EventTitle").should("have.text", "Test Event");
    cy.findByTestId("InfoSection.EventHeight").should(
      "have.text",
      "Target Height - 99,999,999"
    );
  });
});

context("/blocks/countdown/[query] on mobile - Event Name", () => {
  beforeEach(() => {
    cy.visit("/blocks/countdown/testEvent");
    cy.viewport("iphone-x");
  });

  it("should have InfoSection", () => {
    cy.findByTestId("InfoSection.EventTitle").should("have.text", "Test Event");
    cy.findByTestId("InfoSection.EventHeight").should(
      "have.text",
      "Target Height - 99,999,999"
    );
  });

  it("should have CountdownSection", () => {
    cy.findByTestId("CountdownSection.Days").within(() => {
      cy.findByTestId("CountdownSection.Days.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Days.label")
        .should("be.visible")
        .should("have.text", "Days");
    });
    cy.findByTestId("CountdownSection.Hours").within(() => {
      cy.findByTestId("CountdownSection.Hours.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Hours.label")
        .should("be.visible")
        .should("have.text", "Hours");
    });
    cy.findByTestId("CountdownSection.Minutes").within(() => {
      cy.findByTestId("CountdownSection.Minutes.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Minutes.label")
        .should("be.visible")
        .should("have.text", "Minutes");
    });
    cy.findByTestId("CountdownSection.Seconds").within(() => {
      cy.findByTestId("CountdownSection.Seconds.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Seconds.label")
        .should("be.visible")
        .should("have.text", "Seconds");
    });
  });

  it("should have BlocksInfoSection", () => {
    cy.findByTestId("BlocksInfoSection").should("be.visible");
    cy.findByTestId("BlocksInfoSection.Current.Label")
      .should("be.visible")
      .should("have.text", "Current Height:");
    cy.findByTestId("BlocksInfoSection.Current.Value")
      .should("be.visible")
      .contains(/\d+/);
    cy.findByTestId("BlocksInfoSection.Remaining.Label")
      .should("be.visible")
      .should("have.text", "Remaining Blocks:");
    cy.findByTestId("BlocksInfoSection.Remaining.Value")
      .should("be.visible")
      .contains(/\d+/);
  });
});

context("/blocks/countdown/[query] on mobile - NextFutureSwap", () => {
  beforeEach(() => {
    cy.visit("/blocks/countdown/NextFutureSwap");
    cy.viewport("iphone-x");
  });

  it("should have InfoSection", () => {
    cy.findByTestId("InfoSection.EventTitle").should(
      "have.text",
      "Next Future Settlement Block"
    );
    cy.findByTestId("InfoSection.EventHeight").should("exist");
  });

  it("should have CountdownSection", () => {
    cy.findByTestId("CountdownSection.Days").within(() => {
      cy.findByTestId("CountdownSection.Days.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Days.label")
        .should("be.visible")
        .should("have.text", "Days");
    });
    cy.findByTestId("CountdownSection.Hours").within(() => {
      cy.findByTestId("CountdownSection.Hours.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Hours.label")
        .should("be.visible")
        .should("have.text", "Hours");
    });
    cy.findByTestId("CountdownSection.Minutes").within(() => {
      cy.findByTestId("CountdownSection.Minutes.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Minutes.label")
        .should("be.visible")
        .should("have.text", "Minutes");
    });
    cy.findByTestId("CountdownSection.Seconds").within(() => {
      cy.findByTestId("CountdownSection.Seconds.value")
        .should("be.visible")
        .contains(/\d+/);
      cy.findByTestId("CountdownSection.Seconds.label")
        .should("be.visible")
        .should("have.text", "Seconds");
    });
  });

  it("should have BlocksInfoSection", () => {
    cy.findByTestId("BlocksInfoSection").should("be.visible");
    cy.findByTestId("BlocksInfoSection.Current.Label")
      .should("be.visible")
      .should("have.text", "Current Height:");
    cy.findByTestId("BlocksInfoSection.Current.Value")
      .should("be.visible")
      .contains(/\d+/);
    cy.findByTestId("BlocksInfoSection.Remaining.Label")
      .should("be.visible")
      .should("have.text", "Remaining Blocks:");
    cy.findByTestId("BlocksInfoSection.Remaining.Value")
      .should("be.visible")
      .contains(/\d+/);
  });
});

context(
  "/blocks/countdown/[query] - block number < current height - Redirect to Blocks Page",
  () => {
    before(() => {
      cy.visit("/blocks/countdown/1");
    });

    beforeEach(() => {
      cy.viewport("macbook-16");
    });

    it("should have redirect to blocks page", () => {
      cy.url().should("include", "/blocks/1");
    });
  }
);
