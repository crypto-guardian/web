// pages/ShowBalance.tsx
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { fetchBalance, fetchToken } from '@wagmi/core'

const ShowBalance: React.FC = () => {
  const { address } = useAccount()
  console.log('Account data:', address)
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
          setMaticBalance(maticBalanceData.formatted)

          // Fetch LINK Balance
          const linkBalanceData = await fetchBalance({
            address: address,
            token: '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39',
            chainId: 137, // Polygon Mainnet
          })
          setLinkBalance(linkBalanceData.formatted)
        } catch (error) {
          console.error('Error fetching balance:', error)
        }
      }
    }

    getBalance()
  }, [address]) // Dependency array includes accountData.address

  return (
    <div>
      Balance: {maticBalance} MATIC
      <br />
      LINK: {linkBalance} LINK
    </div>
  )
}

export default ShowBalance
