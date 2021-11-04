import { PlaygroundApiClient, PlaygroundRpcClient } from '@defichain/playground-api-client'
import { wait } from 'next/dist/build/output/log'

const api = new PlaygroundApiClient({
  url: 'http://localhost:19553'
})
const rpc = new PlaygroundRpcClient(api)

context('/vaults', () => {
  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have vaultId', async () => {
    let vaultId
    cy.wrap(null).then(async () => {
      const address = await rpc.wallet.getNewAddress()
      vaultId = await rpc.loan.createVault({
        loanSchemeId: '1',
        ownerAddress: address
      })
      // this method isn't mapped yet, so we are calling it raw via `rpc.call`
      await rpc.call('waitfornewblock', [], 'number')
      return vaultId
    })

    cy.visit('/vaults?network=Local')
    // cy.findByTestId('TEST_JSON').contains('ownerAddress')
  })
})
