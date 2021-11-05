import { PlaygroundApiClient, PlaygroundRpcClient } from '@defichain/playground-api-client'
import BigNumber from 'bignumber.js'
import { RegTestGenesisKeys } from '@defichain/jellyfish-network/dist/RegTestFoundationKeys'

const api = new PlaygroundApiClient({
  url: 'http://localhost:19553'
})
const rpc = new PlaygroundRpcClient(api)

context('/vaults', () => {
  before(async () => {
    await rpc.loan.setCollateralToken({
      token: 'DFI',
      factor: new BigNumber(1),
      fixedIntervalPriceId: 'DFI/USD'
    })

    const sourceAddress = RegTestGenesisKeys[0].operator.address
    const address = await rpc.wallet.getNewAddress()

    const vaultId = await rpc.loan.createVault({
      loanSchemeId: '1',
      ownerAddress: address
    })
    await rpc.call('waitfornewblock', [], 'number')

    await rpc.loan.depositToVault({
      vaultId: vaultId,
      from: sourceAddress,
      amount: '10@DFI'
    })

  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have vaultId', async () => {
    cy.visit('/vaults?network=Local')
    // cy.findByTestId('TEST_JSON').contains('ownerAddress')
  })
})
