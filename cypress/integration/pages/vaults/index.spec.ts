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

  it('should have Active', { defaultCommandTimeout: 20000 }, async () => {
      cy.wrap(null).then(async () => {
        let vaultId: string

        const address = await rpc.wallet.getNewAddress()
        vaultId = await rpc.loan.createVault({
          loanSchemeId: '1',
          ownerAddress: address
        })

        await rpc.blockchain.waitForNewBlock()
        await rpc.poolpair.poolSwap({
          from: RegTestFoundationKeys[0].operator.address,
          tokenFrom: 'BTC',
          amountFrom: 200,
          to: RegTestFoundationKeys[0].operator.address,
          tokenTo: 'DFI'
        })

        await rpc.blockchain.waitForNewBlock()
        await rpc.loan.depositToVault({
          vaultId: vaultId,
          from: RegTestFoundationKeys[0].operator.address,
          amount: '100@DFI'
        })

        await rpc.blockchain.waitForNewBlock()
        await rpc.loan.takeLoan({
          vaultId: vaultId,
          amounts: '20@TS25'
        })

        await rpc.blockchain.waitForNewBlock()
        return vaultId
      }).then((vaultId) => {
        cy.visit('/vaults?network=Local')
        cy.findByTestId(`VaultRow.VaultID.${vaultId}`).should('contain.text', `${vaultId.substr(0, 6)}...${vaultId.substr(vaultId.length - 6, 6)}`)
        cy.findByTestId(`VaultRow.${vaultId}.VaultStatus`).should('contain.text', 'ACTIVE')
        cy.findByTestId(`VaultRow.${vaultId}.LoansValue`).should('contain.text', '500.')
        cy.findByTestId(`VaultRow.${vaultId}.CollateralValue`).should('contain.text', '5,000.00')
        cy.findByTestId(`VaultRow.${vaultId}.CollateralRatio`).should('contain.text', '1000%')
      })
    }
  )
})
