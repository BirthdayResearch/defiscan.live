import {
	CTransaction,
	CTransactionSegWit,
	Transaction,
	TransactionSegWit,
	Vin,
	Vout
} from '@defichain/jellyfish-transaction'
import {AdaptiveList} from '@components/commons/AdaptiveList'
import {AddressLink} from '@components/commons/link/AddressLink'
import {TxIdLink} from '@components/commons/link/TxIdLink'
import {TokenSymbol} from '@components/commons/TokenSymbol'
import {useNetwork} from '@contexts/NetworkContext'
import {fromScript} from '@defichain/jellyfish-address'
import BigNumber from 'bignumber.js'
import {SmartBuffer} from 'smart-buffer'

export function RawTransaction({rawTx}: { rawTx: string }): JSX.Element {
	const network = useNetwork().name
	let rawTransaction: Transaction | TransactionSegWit | undefined

	if (rawTx !== undefined) {
		const buffer = SmartBuffer.fromBuffer(Buffer.from(rawTx, 'hex'))
		if (rawTx.startsWith('040000000001')) {
			rawTransaction = new CTransactionSegWit(buffer)
		} else {
			rawTransaction = new CTransaction(buffer)
		}
	}

	function getTotalVoutValue(vout: Vout[] | undefined): string {
		let total: BigNumber = new BigNumber(0)
		if (vout !== undefined) {
			vout.forEach(v => {
				total = new BigNumber(v.value).plus(total)
			})
		}
		return total.toFixed(8)
	}

	return (
		<div>
			<Heading/>
			<div className='flex space-x-2 space-y-2'>
				<div className='w-full lg:w-1/2'>
					<h3 className='text-lg font-semibold mb-4'>Input</h3>
					{rawTransaction?.vin.map(vin => {
						return (
							<TransactionInput vin={vin} key={vin.txid}/>
						)
					})}
				</div>
				<div className='w-full lg:w-1/2 space-y-2'>
					<h3 className='text-lg font-semibold mb-4'>Output</h3>
					{rawTransaction?.vout.map((vout, index) => {
						const decoded = fromScript(vout.script, network)
						return (
							<TransactionOutput vout={vout} address={decoded?.address} key={index}/>
						)
					})}
				</div>
			</div>
			<div className='flex flex-col items-end justify-between mt-8'>
				<div className='flex justify-between space-x-3 mt-2' data-testid='TransactionDetailsSummary.total'>
					<span>Total:</span>
					<span>{getTotalVoutValue(rawTransaction?.vout)} DFI</span>
				</div>
			</div>
		</div>
	)
}

function TransactionInput({vin}: { vin: Vin }): JSX.Element {
	return (
		<AdaptiveList>
			<AdaptiveList.Row name='Index'>
				{vin.index}
			</AdaptiveList.Row>
			<AdaptiveList.Row name='TxId'>
				<TxIdLink txid={vin.txid} className='break-all'/>
			</AdaptiveList.Row>
		</AdaptiveList>
	)
}

function TransactionOutput({vout, address}: { vout: Vout, address: string | undefined }): JSX.Element {
	return (
		<AdaptiveList>
			<AdaptiveList.Row name='Token'>
				<TokenSymbol tokenId={vout.tokenId}/>
			</AdaptiveList.Row>
			<AdaptiveList.Row name='Value'>{vout.value.toFixed(8)}</AdaptiveList.Row>
			{(() => {
				if (address !== undefined) {
					return (
						<AdaptiveList.Row name='Address'>
							<AddressLink address={address}/>
						</AdaptiveList.Row>
					)
				}
			})()}
		</AdaptiveList>
	)
}

function Heading(): JSX.Element {
	return (
		<div>
			<h1 className='font-medium text-2xl mt-6' data-testid='DfTxHeader.Title'>Pending Transactions</h1>
		</div>
	)
}
