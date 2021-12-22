context('/transactions/[txid]?rawTx=[] on desktop', () => {
	before(() => {
		cy.visit('/transactions/66109674cad41dbde99fcf687821b044b4610ba2921dfc1fd014b42320f8cf71?rawtx=04000000000101b0ed5e4ac2817af0018addd1d418b67654990e5ed5b6407c966f9266b0ee46680100000000ffffffff020000000000000000526a4c4f44665478691600145f787ab67fcbf179a9995b5dded40a0db62abc1c0f5cdddc09000000001600145f787ab67fcbf179a9995b5dded40a0db62abc1c000300000000000000a5e01a0000000000011100e0ba4c11000000001600145f787ab67fcbf179a9995b5dded40a0db62abc1c000247304402206e7025dc68f875df20d4de9aa6d25e8de96a6a4ae978b2cb365033d22ce70fa4022061a636fa90b1918d8b14fb3a378b5f9486debde04dd605fe3f945136fb5cb3d601210376893753c38b995acd841d5ea24165b4e1a41635cb7821cffa025e3b42ef5a2300000000')
	})

	beforeEach(() => {
		cy.viewport('macbook-16')
	})

	it('should have RawTransaction Title', function () {
		cy.findByTestId('RawTransaction.Title').should('have.text', 'Pending Transactions')
	})

	it('should have RawTransaction Total', function () {
		cy.findByTestId('RawTransaction.total').should('contain.text', '2.90241248 DFI')
	})

	it('should RawTransaction Vin Index', function () {
		cy.findByTestId('RawTransaction.VinIndex').should('have.text', '1')
	})

	it('should RawTransaction Vin Tx ID', function () {
		cy.findByTestId('RawTransaction.VinTxId').should('have.text', '6846eeb066926f967c40b6d55e0e995476b618d4d1dd8a01f07a81c24a5eedb0')
	})

	it('should RawTransaction Vout token', function () {
		cy.findAllByTestId('RawTransaction.VoutToken').eq(1).should('have.text', 'DFI')
	})

	it('should RawTransaction Vout Address', function () {
		cy.findAllByTestId('RawTransaction.VoutAddress').eq(0).should('have.text', 'df1qtau84dnle0chn2vetdwaa4q2pkmz40qu4hqynw')
	})

	it('should RawTransaction Vout Value', function () {
		cy.findAllByTestId('RawTransaction.VoutValue').eq(1).should('have.text', '2.90241248')
	})
})


context('/transactions/[txid]?rawTx=[] on mobile', () => {
	before(() => {
		cy.visit('/transactions/66109674cad41dbde99fcf687821b044b4610ba2921dfc1fd014b42320f8cf71?rawtx=04000000000101b0ed5e4ac2817af0018addd1d418b67654990e5ed5b6407c966f9266b0ee46680100000000ffffffff020000000000000000526a4c4f44665478691600145f787ab67fcbf179a9995b5dded40a0db62abc1c0f5cdddc09000000001600145f787ab67fcbf179a9995b5dded40a0db62abc1c000300000000000000a5e01a0000000000011100e0ba4c11000000001600145f787ab67fcbf179a9995b5dded40a0db62abc1c000247304402206e7025dc68f875df20d4de9aa6d25e8de96a6a4ae978b2cb365033d22ce70fa4022061a636fa90b1918d8b14fb3a378b5f9486debde04dd605fe3f945136fb5cb3d601210376893753c38b995acd841d5ea24165b4e1a41635cb7821cffa025e3b42ef5a2300000000')
	})

	beforeEach(() => {
		cy.viewport('iphone-x')
	})

	it('should have RawTransaction Title', function () {
		cy.findByTestId('RawTransaction.Title').should('have.text', 'Pending Transactions')
	})

	it('should have RawTransaction Total', function () {
		cy.findByTestId('RawTransaction.total').should('contain.text', '2.90241248 DFI')
	})

	it('should RawTransaction Vin Index', function () {
		cy.findByTestId('RawTransaction.VinIndex').should('have.text', '1')
	})

	it('should RawTransaction Vin Tx ID', function () {
		cy.findByTestId('RawTransaction.VinTxId').should('have.text', '6846eeb066926f967c40b6d55e0e995476b618d4d1dd8a01f07a81c24a5eedb0')
	})

	it('should RawTransaction Vout token', function () {
		cy.findAllByTestId('RawTransaction.VoutToken').eq(1).should('have.text', 'DFI')
	})

	it('should RawTransaction Vout Address', function () {
		cy.findAllByTestId('RawTransaction.VoutAddress').eq(0).should('have.text', 'df1qtau84dnle0chn2vetdwaa4q2pkmz40qu4hqynw')
	})

	it('should RawTransaction Vout Value', function () {
		cy.findAllByTestId('RawTransaction.VoutValue').eq(1).should('have.text', '2.90241248')
	})
})
