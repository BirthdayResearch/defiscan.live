import { PlaygroundApiClient, PlaygroundRpcClient } from '@defichain/playground-api-client'
import { RegTestFoundationKeys } from '@defichain/jellyfish-network'

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
      await rpc.blockchain.waitForNewBlock()

      await rpc.loan.depositToVault({
        vaultId: vaultId,
        from: RegTestFoundationKeys[0].operator.address,
        amount: '1@BTC'
      })
      await rpc.blockchain.waitForNewBlock()
      return vaultId
    })

    cy.visit('/vaults?network=Local')
    // cy.findByTestId('TEST_JSON').contains('ownerAddress')
  })
})
