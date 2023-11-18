'use client'
import ShowBalance from '@/components/ShowBalance'
import { fetchBalance } from '@wagmi/core'
// pages/manage.tsx
import { useState, useEffect, ChangeEvent } from 'react'
import { useAccount } from 'wagmi'

export interface CryptoAsset {
  token: string
  network: string
}

const mockCryptoAssets: CryptoAsset[] = [
  { token: 'MATIC', network: 'Polygon' },
  { token: 'Link', network: 'Polygon' },
  // Add more mock assets here
]

interface WalletAddresses {
  [key: string]: string[]
}

export default function Manage() {
  const { address } = useAccount()
  // console.log('Account data:', address)
  const [maticBalance, setMaticBalance] = useState<string | null>(null)
  const [linkBalance, setLinkBalance] = useState<string | null>(null)
  useEffect(() => {
    const getBalance = async () => {
      if (address) {
        try {
          const maticBalanceData = await fetchBalance({
            address: address,
            chainId: 137, // Polygon Mainnet
          })
          setMaticBalance(parseFloat(maticBalanceData.formatted).toFixed(2))
          // Fetch LINK Balance
          const linkBalanceData = await fetchBalance({
            address: address,
            token: '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39',
            chainId: 137, // Polygon Mainnet
          })
          setLinkBalance(parseFloat(linkBalanceData.formatted).toFixed(3))
        } catch (error) {
          console.error('Error fetching balance:', error)
        }
      }
    }

    getBalance()
  }, [address]) // Dependency array includes accountData.address

  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset | null>(null)
  const [walletAddresses, setWalletAddresses] = useState<WalletAddresses>({})
  const [divisionCount, setDivisionCount] = useState<number>(1)

  const handleAssetClick = (asset: CryptoAsset) => {
    setSelectedAsset(asset)
    setWalletAddresses({ ...walletAddresses, [asset.token]: Array(divisionCount).fill('') })
  }

  useEffect(() => {
    if (selectedAsset) {
      setWalletAddresses({ ...walletAddresses, [selectedAsset.token]: Array(divisionCount).fill('') })
    }
  }, [divisionCount, selectedAsset, walletAddresses])

  const handleAddressChange = (token: string, index: number, value: string) => {
    const addresses = [...walletAddresses[token]]
    addresses[index] = value
    setWalletAddresses({ ...walletAddresses, [token]: addresses })
  }

  const handleDivisionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDivisionCount(parseInt(e.target.value, 10))
  }

  const getPercentage = (): string => {
    return divisionCount > 0 ? (100 / divisionCount).toFixed(0) : '0'
  }

  return (
    <div className='flex h-screen'>
      <div className='w-1/4 bg-gray-800 p-4 text-white'>
        <h2 className='text-xl mb-4'>Your Assets</h2>
        <ul>
          <li className='cursor-pointer p-2 bg-gray-700' onClick={() => handleAssetClick(mockCryptoAssets[0])}>
            {mockCryptoAssets[0].token} ({mockCryptoAssets[0].network}): &nbsp; {maticBalance}
          </li>
          <li className='cursor-pointer p-2' onClick={() => handleAssetClick(mockCryptoAssets[1])}>
            {mockCryptoAssets[1].token} ({mockCryptoAssets[1].network}): &nbsp; {linkBalance}
          </li>
          {/* {mockCryptoAssets.map((asset, index) => {
            console.log('asset: ', asset)
            console.log('index', index)
            return (
              <li
                key={index}
                className={`cursor-pointer p-2 ${selectedAsset === asset ? 'bg-gray-700' : ''}`}
                onClick={() => handleAssetClick(asset)}>
                {asset.token} ({asset.network}): &nbsp; {index === 0 ? maticBalance : linkBalance}
              </li>
            )
          })} */}
        </ul>
      </div>
      <div className='w-3/4 p-4'>
        {selectedAsset && (
          <div>
            <h2 className='text-xl mb-4'>Divide {selectedAsset.token}</h2>
            <div className='mb-4'>
              <label htmlFor='divisionCount' className='block mb-2'>
                Number of Divisions:
              </label>
              <select
                id='divisionCount'
                value={divisionCount}
                onChange={handleDivisionChange}
                className='p-2 border border-gray-300 rounded'>
                {[0, 1, 2, 3, 4, 5].map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
            {walletAddresses[selectedAsset.token]?.map((address, index) => (
              <div key={index} className='mb-2'>
                <label className='block mb-1'>{getPercentage()}% to:</label>
                <input
                  type='text'
                  placeholder={`Address ${index + 1}`}
                  value={address}
                  onChange={(e) => handleAddressChange(selectedAsset.token, index, e.target.value)}
                  className='p-2 border border-gray-300 rounded w-full'
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
