context('/blocks/countdown/[height] on desktop - Event Name', () => {
  before(() => {
    cy.visit('/blocks/countdown/testEvent')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have InfoSection', () => {
    cy.findByTestId('InfoSection.EventTitle').should('have.text', 'Test Event')
    cy.findByTestId('InfoSection.EventHeight').should('have.text', 'Target Height - 99999999')
  })

  it('should have CountdownSection', () => {
    cy.findByTestId('CountdownSection.Days').within(() => {
      cy.findByTestId('CountdownSection.Days.value').should('be.visible').contains(/\d+/)
      cy.findByTestId('CountdownSection.Days.label').should('be.visible').should('have.text', 'Days')
    })
    cy.findByTestId('CountdownSection.Hours').within(() => {
      cy.findByTestId('CountdownSection.Hours.value').should('be.visible').contains(/\d+/)
      cy.findByTestId('CountdownSection.Hours.label').should('be.visible').should('have.text', 'Hours')
    })
    cy.findByTestId('CountdownSection.Mins').within(() => {
      cy.findByTestId('CountdownSection.Mins.value').should('be.visible').contains(/\d+/)
      cy.findByTestId('CountdownSection.Mins.label').should('be.visible').should('have.text', 'Mins')
    })
    cy.findByTestId('CountdownSection.Secs').within(() => {
      cy.findByTestId('CountdownSection.Secs.value').should('be.visible').contains(/\d+/)
      cy.findByTestId('CountdownSection.Secs.label').should('be.visible').should('have.text', 'Secs')
    })
  })

  it('should have BlocksInfoSection', () => {
    cy.findByTestId('BlocksInfoSection').should('be.visible')
    cy.findByTestId('BlocksInfoSection.Current.Label').should('be.visible').should('have.text', 'Current Height:')
    cy.findByTestId('BlocksInfoSection.Current.Value').should('be.visible').contains(/\d+/)
    cy.findByTestId('BlocksInfoSection.Remaining.Label').should('be.visible').should('have.text', 'Remaining Blocks:')
    cy.findByTestId('BlocksInfoSection.Remaining.Value').should('be.visible').contains(/\d+/)
  })
})

context('/blocks/countdown/[height] on desktop - Block Number', () => {
  before(() => {
    cy.visit('/blocks/countdown/99999998')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have InfoSection', () => {
    cy.findByTestId('InfoSection.BlockHeight').should('have.text', 'Block #99999998')
    cy.findByTestId('InfoSection.EventTitle').should('not.exist')
    cy.findByTestId('InfoSection.EventHeight').should('not.exist')
  })

  it('should have CountdownSection', () => {
    cy.findByTestId('CountdownSection.Days').within(() => {
      cy.findByTestId('CountdownSection.Days.value').should('be.visible').contains(/\d+/)
      cy.findByTestId('CountdownSection.Days.label').should('be.visible').should('have.text', 'Days')
    })
    cy.findByTestId('CountdownSection.Hours').within(() => {
      cy.findByTestId('CountdownSection.Hours.value').should('be.visible').contains(/\d+/)
      cy.findByTestId('CountdownSection.Hours.label').should('be.visible').should('have.text', 'Hours')
    })
    cy.findByTestId('CountdownSection.Mins').within(() => {
      cy.findByTestId('CountdownSection.Mins.value').should('be.visible').contains(/\d+/)
      cy.findByTestId('CountdownSection.Mins.label').should('be.visible').should('have.text', 'Mins')
    })
    cy.findByTestId('CountdownSection.Secs').within(() => {
      cy.findByTestId('CountdownSection.Secs.value').should('be.visible').contains(/\d+/)
      cy.findByTestId('CountdownSection.Secs.label').should('be.visible').should('have.text', 'Secs')
    })
  })

  it('should have BlocksInfoSection', () => {
    cy.findByTestId('BlocksInfoSection').should('be.visible')
    cy.findByTestId('BlocksInfoSection.Current.Label').should('be.visible').should('have.text', 'Current Height:')
    cy.findByTestId('BlocksInfoSection.Current.Value').should('be.visible').contains(/\d+/)
    cy.findByTestId('BlocksInfoSection.Remaining.Label').should('be.visible').should('have.text', 'Remaining Blocks:')
    cy.findByTestId('BlocksInfoSection.Remaining.Value').should('be.visible').contains(/\d+/)
  })
})

context('/blocks/countdown/[height] on desktop - Block Number = Event', () => {
  before(() => {
    cy.visit('/blocks/countdown/99999999')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have InfoSection', () => {
    cy.findByTestId('InfoSection.EventTitle').should('have.text', 'Test Event')
    cy.findByTestId('InfoSection.EventHeight').should('have.text', 'Target Height - 99999999')
  })
})

context('/blocks/countdown/[height] on mobile - Event Name', () => {
  before(() => {
    cy.visit('/blocks/countdown/testEvent')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have InfoSection', () => {
    cy.findByTestId('InfoSection.EventTitle').should('have.text', 'Test Event')
    cy.findByTestId('InfoSection.EventHeight').should('have.text', 'Target Height - 99999999')
  })

  it('should have CountdownSection', () => {
    cy.findByTestId('CountdownSection.Days').within(() => {
      cy.findByTestId('CountdownSection.Days.value').should('be.visible').contains(/\d+/)
      cy.findByTestId('CountdownSection.Days.label').should('be.visible').should('have.text', 'Days')
    })
    cy.findByTestId('CountdownSection.Hours').within(() => {
      cy.findByTestId('CountdownSection.Hours.value').should('be.visible').contains(/\d+/)
      cy.findByTestId('CountdownSection.Hours.label').should('be.visible').should('have.text', 'Hours')
    })
    cy.findByTestId('CountdownSection.Mins').within(() => {
      cy.findByTestId('CountdownSection.Mins.value').should('be.visible').contains(/\d+/)
      cy.findByTestId('CountdownSection.Mins.label').should('be.visible').should('have.text', 'Mins')
    })
    cy.findByTestId('CountdownSection.Secs').within(() => {
      cy.findByTestId('CountdownSection.Secs.value').should('be.visible').contains(/\d+/)
      cy.findByTestId('CountdownSection.Secs.label').should('be.visible').should('have.text', 'Secs')
    })
  })

  it('should have BlocksInfoSection', () => {
    cy.findByTestId('BlocksInfoSection').should('be.visible')
    cy.findByTestId('BlocksInfoSection.Current.Label').should('be.visible').should('have.text', 'Current Height:')
    cy.findByTestId('BlocksInfoSection.Current.Value').should('be.visible').contains(/\d+/)
    cy.findByTestId('BlocksInfoSection.Remaining.Label').should('be.visible').should('have.text', 'Remaining Blocks:')
    cy.findByTestId('BlocksInfoSection.Remaining.Value').should('be.visible').contains(/\d+/)
  })
})

context('/blocks/countdown/[height] on mobile - Block Number', () => {
  before(() => {
    cy.visit('/blocks/countdown/99999998')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have InfoSection', () => {
    cy.findByTestId('InfoSection.BlockHeight').should('have.text', 'Block #99999998')
    cy.findByTestId('InfoSection.EventTitle').should('not.exist')
    cy.findByTestId('InfoSection.EventHeight').should('not.exist')
  })

  it('should have CountdownSection', () => {
    cy.findByTestId('CountdownSection.Days').within(() => {
      cy.findByTestId('CountdownSection.Days.value').should('be.visible').contains(/\d+/)
      cy.findByTestId('CountdownSection.Days.label').should('be.visible').should('have.text', 'Days')
    })
    cy.findByTestId('CountdownSection.Hours').within(() => {
      cy.findByTestId('CountdownSection.Hours.value').should('be.visible').contains(/\d+/)
      cy.findByTestId('CountdownSection.Hours.label').should('be.visible').should('have.text', 'Hours')
    })
    cy.findByTestId('CountdownSection.Mins').within(() => {
      cy.findByTestId('CountdownSection.Mins.value').should('be.visible').contains(/\d+/)
      cy.findByTestId('CountdownSection.Mins.label').should('be.visible').should('have.text', 'Mins')
    })
    cy.findByTestId('CountdownSection.Secs').within(() => {
      cy.findByTestId('CountdownSection.Secs.value').should('be.visible').contains(/\d+/)
      cy.findByTestId('CountdownSection.Secs.label').should('be.visible').should('have.text', 'Secs')
    })
  })

  it('should have BlocksInfoSection', () => {
    cy.findByTestId('BlocksInfoSection').should('be.visible')
    cy.findByTestId('BlocksInfoSection.Current.Label').should('be.visible').should('have.text', 'Current Height:')
    cy.findByTestId('BlocksInfoSection.Current.Value').should('be.visible').contains(/\d+/)
    cy.findByTestId('BlocksInfoSection.Remaining.Label').should('be.visible').should('have.text', 'Remaining Blocks:')
    cy.findByTestId('BlocksInfoSection.Remaining.Value').should('be.visible').contains(/\d+/)
  })
})

context('/blocks/countdown/[height] on mobile - Event Name = Event', () => {
  before(() => {
    cy.visit('/blocks/countdown/99999999')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have InfoSection', () => {
    cy.findByTestId('InfoSection.EventTitle').should('have.text', 'Test Event')
    cy.findByTestId('InfoSection.EventHeight').should('have.text', 'Target Height - 99999999')
  })
})

context('/blocks/countdown/[height] - block number < current height - Redirect to Blocks Page', () => {
  before(() => {
    cy.visit('/blocks/countdown/1')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have redirect to blocks page', () => {
    cy.url().should('include', '/blocks/1')
  })
})
