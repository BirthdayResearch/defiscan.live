const viewPorts = ["macbook-16", "ipad-2", "iphone-x"];

viewPorts.forEach((viewPort) => {
  // todo: rewrite completely to be compatible with cypress 12: tests to not share the context
  context(`/governance/create on ${viewPort}`, () => {
    const nameOfProposal = "Test Proposal";
    const discussion = "https://github.com/DeFiCh/dfips/issues/243";
    const redditDiscussion = "https://www.reddit.com/r/defiblockchain/";
    const receivingAddress = "mswsMVsyGMj1FzDMbbxw2QW3KvQAv2FKiy";
    const amountRequested = "100";

    before(() => {
      cy.visit("/governance/create?network=Playground");
    });

    beforeEach(() => {
      cy.viewport(<Cypress.ViewportPreset>viewPort);
    });

    it("should have breadcrumb", () => {
      cy.findByTestId("Breadcrumb").should("be.visible");
    });

    it("should have heading", () => {
      cy.get("h1").should("have.text", "Create Proposal");
    });

    it("should have create proposal getting started info", () => {
      cy.findByTestId("Governance.Create.GettingStarted").should("be.visible");
      cy.findByTestId("Governance.Create.GettingStarted.Title").should(
        "have.text",
        "Getting started"
      );
      cy.findByTestId("Governance.Create.GettingStarted.Content").should(
        "be.visible"
      );
      cy.findByTestId("Governance.Create.GettingStarted.Content.GitHub").should(
        "have.attr",
        "href",
        "https://github.com/DeFiCh/dfips/issues"
      );
      cy.findByTestId("Governance.Create.GettingStarted.Content.Reddit").should(
        "have.attr",
        "href",
        "https://www.reddit.com/r/defiblockchain/"
      );
      cy.findByTestId(
        "Governance.Create.GettingStarted.Content.ReadHere"
      ).should(
        "have.attr",
        "href",
        "https://github.com/DeFiCh/dfips/blob/master/README.md"
      );
    });

    it("should have step 1 header and description", () => {
      cy.findByTestId("Governance.Create.Step1").should("be.visible");

      cy.findByTestId("Governance.Create.Step1").within(() => {
        cy.findByTestId("Governance.Create.Step1.Title").should(
          "have.text",
          "Step 1: Proposal details"
        );

        cy.findByTestId("Governance.Create.Step1.Description").should(
          "have.text",
          "Enter from GitHub or Reddit the title of the proposal and the type of proposal."
        );
      });
    });

    it("should have step 1 cfp radio group checked and dfip radio unchecked by default", () => {
      cy.findByTestId("Governance.Create.Step1.RadioGroup").should(
        "be.visible"
      );
      cy.findByTestId("Governance.Create.Step1.RadioGroup").within(() => {
        cy.findByTestId("Governance.Create.Step1.RadioGroup.CFP")
          .should("be.visible")
          .within(() => {
            cy.findByTestId(
              "Governance.Create.Step1.RadioGroup.CFP.Checked"
            ).should("be.visible");
          });

        cy.findByTestId("Governance.Create.Step1.RadioGroup.DFIP")
          .should("be.visible")
          .within(() => {
            cy.findByTestId(
              "Governance.Create.Step1.RadioGroup.DFIP.Unchecked"
            ).should("be.visible");
          });
      });
    });

    it("should be able to check dfip radio group in step 1", () => {
      cy.findByTestId("Governance.Create.Step1.RadioGroup.DFIP").click();
      // DFIP radio
      cy.findByTestId("Governance.Create.Step1.RadioGroup.DFIP")
        .should("be.visible")
        .within(() => {
          cy.findByTestId(
            "Governance.Create.Step1.RadioGroup.DFIP.Checked"
          ).should("be.visible");
        });
      // CFP radio
      cy.findByTestId("Governance.Create.Step1.RadioGroup.CFP")
        .should("be.visible")
        .within(() => {
          cy.findByTestId(
            "Governance.Create.Step1.RadioGroup.CFP.Unchecked"
          ).should("be.visible");
        });
    });

    it("should have step 1 `Name of proposal` input for DFIP proposal creation", () => {
      cy.findByTestId("Governance.Create.Step1.TextArea.NameOfProposal").should(
        "be.visible"
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.NameOfProposal").within(
        () => {
          cy.get("textarea").click().type(nameOfProposal);
        }
      );
      cy.findByTestId("Governance.Create.Step1.ReviewProposal").should(
        "be.disabled"
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.NameOfProposal").within(
        () => {
          cy.findByTestId(
            "Governance.Create.Step1.TextArea.NameOfProposal.ClearForm"
          ).click();
          cy.findByTestId("Governance.Create.Step1.TextArea.ErrorMsg").should(
            "have.text",
            "Invalid proposal name"
          );
        }
      );
    });

    it("should have step 1 `Discussion` (GitHub) input for DFIP proposal creation", () => {
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").should(
        "be.visible"
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").within(
        () => {
          cy.get("textarea").click().type(discussion);
          cy.get("Governance.Create.Step1.TextArea.ErrorMsg").should(
            "not.exist"
          );
        }
      );
      cy.findByTestId("Governance.Create.Step1.ReviewProposal").should(
        "be.disabled"
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").within(
        () => {
          cy.findByTestId(
            "Governance.Create.Step1.TextArea.Discussion.ClearForm"
          ).click();
          cy.findByTestId("Governance.Create.Step1.TextArea.ErrorMsg").should(
            "have.text",
            "Invalid URL. Only GitHub or Reddit URL are accepted"
          );
        }
      );
    });

    it("should have step 1 `Discussion` (Reddit) input for DFIP proposal creation", () => {
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").should(
        "be.visible"
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").within(
        () => {
          cy.get("textarea").click().type(redditDiscussion);
          cy.get("Governance.Create.Step1.TextArea.ErrorMsg").should(
            "not.exist"
          );
        }
      );

      cy.findByTestId("Governance.Create.Step1.ReviewProposal").should(
        "be.disabled"
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").within(
        () => {
          cy.findByTestId(
            "Governance.Create.Step1.TextArea.Discussion.ClearForm"
          ).click();
          cy.findByTestId("Governance.Create.Step1.TextArea.ErrorMsg").should(
            "have.text",
            "Invalid URL. Only GitHub or Reddit URL are accepted"
          );
        }
      );
    });

    it("should not have step 1 Amount Requested, Cycles and Receiving Address inputs for DFIP proposal creation", () => {
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.AmountRequested"
      ).should("not.exist");
      cy.findByTestId("Governance.Create.Step1.TextArea.Cycles").should(
        "not.exist"
      );
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.ReceivingAddress"
      ).should("not.exist");
    });

    it("should have step 1 `Name of proposal` input for CFP proposal creation", () => {
      // choose CFP proposal creation
      cy.findByTestId("Governance.Create.Step1.RadioGroup.CFP").click();
      cy.findByTestId("Governance.Create.Step1.TextArea.NameOfProposal").should(
        "be.visible"
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.NameOfProposal").within(
        () => {
          cy.get("textarea").click().type(nameOfProposal);
        }
      );
      cy.findByTestId("Governance.Create.Step1.ReviewProposal").should(
        "be.disabled"
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.NameOfProposal").within(
        () => {
          cy.findByTestId(
            "Governance.Create.Step1.TextArea.NameOfProposal.ClearForm"
          ).click();
          cy.findByTestId("Governance.Create.Step1.TextArea.ErrorMsg").should(
            "have.text",
            "Invalid proposal name"
          );
        }
      );
    });

    it("should have step 1 `Discussion` (GitHub) input for CFP proposal creation", () => {
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").should(
        "be.visible"
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").within(
        () => {
          cy.get("textarea").click().type(discussion);
          cy.get("Governance.Create.Step1.TextArea.ErrorMsg").should(
            "not.exist"
          );
        }
      );
      cy.findByTestId("Governance.Create.Step1.ReviewProposal").should(
        "be.disabled"
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").within(
        () => {
          cy.findByTestId(
            "Governance.Create.Step1.TextArea.Discussion.ClearForm"
          ).click();
          cy.findByTestId("Governance.Create.Step1.TextArea.ErrorMsg").should(
            "have.text",
            "Invalid URL. Only GitHub or Reddit URL are accepted"
          );
        }
      );
    });

    it("should have step 1 `Discussion` (Reddit) input for CFP proposal creation", () => {
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").should(
        "be.visible"
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").within(
        () => {
          cy.get("textarea").click().type(redditDiscussion);
          cy.get("Governance.Create.Step1.TextArea.ErrorMsg").should(
            "not.exist"
          );
        }
      );
      cy.findByTestId("Governance.Create.Step1.ReviewProposal").should(
        "be.disabled"
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").within(
        () => {
          cy.findByTestId(
            "Governance.Create.Step1.TextArea.Discussion.ClearForm"
          ).click();
          cy.findByTestId("Governance.Create.Step1.TextArea.ErrorMsg").should(
            "have.text",
            "Invalid URL. Only GitHub or Reddit URL are accepted"
          );
        }
      );
    });

    it("should have step 1 `Amount Requested` input for CFP proposal creation", () => {
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.AmountRequested"
      ).should("be.visible");

      cy.findByTestId(
        "Governance.Create.Step1.TextArea.AmountRequested"
      ).within(() => {
        cy.get("textarea").click().type(amountRequested);
        cy.get("Governance.Create.Step1.TextArea.ErrorMsg").should("not.exist");
      });
      cy.findByTestId("Governance.Create.Step1.ReviewProposal").should(
        "be.disabled"
      );
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.AmountRequested"
      ).within(() => {
        cy.findByTestId(
          "Governance.Create.Step1.TextArea.AmountRequested.ClearForm"
        ).click();
        cy.findByTestId("Governance.Create.Step1.TextArea.ErrorMsg").should(
          "have.text",
          "Invalid amount"
        );
      });
    });

    it("should have step 1 `Cycles` input for CFP proposal creation", () => {
      cy.findByTestId("Governance.Create.Step1.TextArea.Cycles").should(
        "be.visible"
      );
      cy.findByTestId("Governance.Create.Step1.ReviewProposal").should(
        "be.disabled"
      );
      // check for tooltip
      cy.findByTestId("InfoHoverPopover").should("be.visible");
      cy.findByTestId("Governance.Create.Step1.TextArea.Cycles").within(() => {
        cy.get("textarea").should("have.text", "1");
      });
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.Cycles.Increment"
      ).click();
      cy.findByTestId("Governance.Create.Step1.TextArea.Cycles").within(() => {
        cy.get("textarea").should("have.text", "2");
      });
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.Cycles.Decrement"
      ).click();
      cy.findByTestId("Governance.Create.Step1.TextArea.Cycles").within(() => {
        cy.get("textarea").should("have.text", "1");
      });
    });

    it("should have step 1 `Receiving Address` input for CFP proposal creation", () => {
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.ReceivingAddress"
      ).should("be.visible");

      cy.findByTestId(
        "Governance.Create.Step1.TextArea.ReceivingAddress"
      ).within(() => {
        cy.get("textarea").click().type(receivingAddress);
        cy.get("Governance.Create.Step1.TextArea.ErrorMsg").should("not.exist");
      });

      cy.findByTestId("Governance.Create.Step1.ReviewProposal").should(
        "be.disabled"
      );

      cy.findByTestId(
        "Governance.Create.Step1.TextArea.ReceivingAddress"
      ).within(() => {
        cy.findByTestId(
          "Governance.Create.Step1.TextArea.ReceivingAddress.ClearForm"
        ).click();
        cy.findByTestId("Governance.Create.Step1.TextArea.ErrorMsg").should(
          "have.text",
          "Invalid payout address. Only DFI addresses are accepted"
        );
      });
    });

    it("should be able to clear input using clear form button in step 1", () => {
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.ReceivingAddress"
      ).within(() => {
        cy.get("textarea").click().type(receivingAddress);
      });
      cy.findByTestId("Governance.Create.Step1.ClearForm").click();
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.ReceivingAddress"
      ).within(() => {
        cy.get("textarea").should("have.text", "");
      });
    });

    it("should be able to fill in CFP proposal inputs in step 1 and Review Proposal", () => {
      cy.findByTestId("Governance.Create.Step1.TextArea.NameOfProposal").within(
        () => {
          cy.get("textarea").click().type(nameOfProposal);
        }
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").within(
        () => {
          cy.get("textarea").click().type(discussion);
        }
      );
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.AmountRequested"
      ).within(() => {
        cy.get("textarea").click().type(amountRequested);
      });
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.ReceivingAddress"
      ).within(() => {
        cy.get("textarea").click().type(receivingAddress);
      });
      cy.findByTestId("Governance.Create.Step1.ReviewProposal").click();
    });

    it("should have step 1 fields hidden when step 2", () => {
      cy.findByTestId("Governance.Create.Step1.ExpandedPanel").should(
        "not.exist"
      );
    });

    it("should have step 2 header and description", () => {
      cy.findByTestId("Governance.Create.Step2").should("be.visible");
      cy.findByTestId("Governance.Create.Step2").within(() => {
        cy.findByTestId("Governance.Create.Step2.Title").should(
          "have.text",
          "Step 2: Review proposal"
        );

        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.Description"
        ).should(
          "have.text",
          "Make sure all details are correct as on-chain proposals are irreversible. You can edit details by going back to the previous steps."
        );
      });
    });

    it("should have `Name of proposal` in step 2 review details", () => {
      cy.findByTestId("Governance.Create.Step2").within(() => {
        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputProposalNameTitle"
        ).should("be.visible");
        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputProposalName"
        ).should("have.text", nameOfProposal);
      });
    });

    it("should have `Type` in step 2 review details", () => {
      cy.findByTestId("Governance.Create.Step2").within(() => {
        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputProposalTypeTitle"
        ).should("be.visible");
        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputProposalType"
        ).should("have.text", "CFP");
      });
    });

    it("should have `Discussion` in step 2 review details", () => {
      cy.findByTestId("Governance.Create.Step2").within(() => {
        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputProposalDiscussionTitle"
        ).should("be.visible");
        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputProposalDiscussion"
        ).should("have.text", discussion);
      });
    });

    it("should have `Amount requested` in step 2 review details", () => {
      cy.findByTestId("Governance.Create.Step2").within(() => {
        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputAmountRequestedTitle"
        ).should("be.visible");
        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputAmountRequested"
        ).should("have.text", `${amountRequested} DFI`);
      });
    });

    it("should have `Cycles` in step 2 review details", () => {
      cy.findByTestId("Governance.Create.Step2").within(() => {
        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputCycleTitle"
        ).should("be.visible");
        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputCycle"
        ).should("have.text", 1);
      });
    });

    it("should have `Receiving address` in step 2 review details", () => {
      cy.findByTestId("Governance.Create.Step2").within(() => {
        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputReceivingAddressTitle"
        ).should("be.visible");
        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputReceivingAddress"
        ).should("have.text", receivingAddress);
      });
    });

    it("should have step 2 command line info", () => {
      cy.findByTestId("Governance.Create.Step2").within(() => {
        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.CommandLineInfo"
        )
          .should("be.visible")
          .should(
            "have.text",
            "A command line will be generated once all details are confirmed"
          );
      });
    });

    it("should have step 2 confirm details button", () => {
      cy.findByTestId("Governance.Create.Step2").within(() => {
        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.ConfirmDetails"
        ).should("be.visible");
        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.ConfirmDetails"
        ).click();
      });
    });

    it("should have step 2 fields hidden when step 3", () => {
      cy.findByTestId("Governance.Create.Step2.ExpandedPanel").should(
        "not.exist"
      );
    });

    it("should have step 3 header and description", () => {
      cy.findByTestId("Governance.Create.Step3").within(() => {
        cy.findByTestId("Governance.Create.Step3.Title").should(
          "have.text",
          "Step 3: Submit proposal on-chain"
        );

        cy.findByTestId("Governance.Create.Step3.SubmitProposal.Description")
          .should("be.visible")
          .within(() => {
            cy.get("a").should(
              "have.attr",
              "href",
              "https://defichain.com/downloads"
            );
          });
      });
    });

    it("should have step 3 command line that was generated", () => {
      cy.findByTestId("Governance.Create.Step3").within(() => {
        cy.findByTestId("Governance.Create.Step3.SubmitProposal.Command")
          .should("be.visible")
          .should(
            "have.text",
            `creategovcfp '{"title": "${nameOfProposal}" ,"context":"${discussion}","amount": ${amountRequested} ,"payoutAddress":"${receivingAddress}", "cycles": 1}'`
          );
      });
    });

    it("should be able to copy step 3 command line that was generated", () => {
      cy.findByTestId("Governance.Create.Step3").within(() => {
        cy.findByTestId("Governance.Create.Step3.SubmitProposal.Copy")
          .should("be.visible")
          .click();
        cy.window().then((window) => {
          window.navigator.clipboard.readText().then((text) => {
            expect(text).to.eq(
              `creategovcfp '{"title": "${nameOfProposal}" ,"context":"${discussion}","amount": ${amountRequested} ,"payoutAddress":"${receivingAddress}", "cycles": 1}'`
            );
          });
        });
      });
    });

    it("should have step 3 info note", () => {
      cy.findByTestId("Governance.Create.Step3").within(() => {
        cy.findByTestId(
          "Governance.Create.Step3.SubmitProposal.InfoNote"
        ).should(
          "have.text",
          "Command submitted into defi-cli will not be editable. Please check your details carefully before submitting."
        );
      });
    });

    it("should be able to edit proposal", () => {
      cy.findByTestId("Governance.Create.Step1.Edit")
        .should("be.visible")
        .click();

      cy.findByTestId("Governance.Create.Step1.TextArea.NameOfProposal").within(
        () => {
          cy.get("textarea").click().clear().type("Edited Proposal");
        }
      );
      cy.findByTestId("Governance.Create.Step1.ReviewProposal").click();
      cy.findByTestId(
        "Governance.Create.Step2.ReviewProposal.InputProposalName"
      ).should("have.text", "Edited Proposal");

      cy.findByTestId(
        "Governance.Create.Step2.ReviewProposal.ConfirmDetails"
      ).click();

      cy.findByTestId("Governance.Create.Step3.SubmitProposal.Command")
        .should("be.visible")
        .should(
          "have.text",
          `creategovcfp '{"title": "Edited Proposal" ,"context":"${discussion}","amount": ${amountRequested} ,"payoutAddress":"${receivingAddress}", "cycles": 1}'`
        );
    });

    it("should be able to cancel switching proposal when editing", () => {
      cy.findByTestId("Governance.Create.Step1.Edit")
        .should("be.visible")
        .click();

      cy.findByTestId("Governance.Create.Step1.RadioGroup.DFIP").click();
      cy.findByTestId("Governance.Create.ConfirmDialog.CancelButton")
        .should("be.visible")
        .click();

      cy.findByTestId(
        "Governance.Create.Step1.TextArea.AmountRequested"
      ).should("be.visible");
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.AmountRequested"
      ).should("be.visible");
      cy.findByTestId("Governance.Create.Step1.TextArea.Cycles").should(
        "be.visible"
      );
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.ReceivingAddress"
      ).should("be.visible");
    });

    it("should be able to switch proposal type", () => {
      cy.findByTestId("Governance.Create.Step1.RadioGroup.DFIP").click();

      cy.findByTestId("Governance.Create.ConfirmDialog.Title").should(
        "have.text",
        "Confirm Edit"
      );

      cy.findByTestId("Governance.Create.ConfirmDialog.Description").should(
        "have.text",
        "Changing the type of proposal would cause all data to reset. Are you sure you want to continue?"
      );

      cy.findByTestId("Governance.Create.ConfirmDialog.ConfirmButton")
        .should("be.visible")
        .click();

      cy.findByTestId("Governance.Create.Step1.RadioGroup.DFIP")
        .should("be.visible")
        .within(() => {
          cy.findByTestId(
            "Governance.Create.Step1.RadioGroup.DFIP.Checked"
          ).should("be.visible");
        });

      cy.findByTestId("Governance.Create.Step1.TextArea.NameOfProposal").within(
        () => {
          cy.get("textarea").should("have.text", "");
        }
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").within(
        () => {
          cy.get("textarea").should("have.text", "");
        }
      );
    });

    it("should be able to create DFIP proposal", () => {
      cy.findByTestId("Governance.Create.Step1.TextArea.NameOfProposal").within(
        () => {
          cy.get("textarea").click().type(nameOfProposal);
        }
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").within(
        () => {
          cy.get("textarea").click().type(discussion);
        }
      );
      cy.findByTestId("Governance.Create.Step1.ReviewProposal").click();
      cy.findByTestId(
        "Governance.Create.Step2.ReviewProposal.InputProposalNameTitle"
      ).should("be.visible");
      cy.findByTestId(
        "Governance.Create.Step2.ReviewProposal.InputProposalName"
      ).should("have.text", nameOfProposal);

      cy.findByTestId(
        "Governance.Create.Step2.ReviewProposal.InputProposalTypeTitle"
      ).should("be.visible");
      cy.findByTestId(
        "Governance.Create.Step2.ReviewProposal.InputProposalType"
      ).should("have.text", "DFIP");

      cy.findByTestId(
        "Governance.Create.Step2.ReviewProposal.InputProposalDiscussionTitle"
      ).should("be.visible");
      cy.findByTestId(
        "Governance.Create.Step2.ReviewProposal.InputProposalDiscussion"
      ).should("have.text", discussion);
      cy.findByTestId(
        "Governance.Create.Step2.ReviewProposal.ConfirmDetails"
      ).click();
      cy.findByTestId("Governance.Create.Step3.SubmitProposal.Command")
        .should("be.visible")
        .should(
          "have.text",
          `creategovvoc '{"title": "${nameOfProposal}" ,"context":"${discussion}"}'`
        );
    });
  });
});
