import { defineConfig } from '@wagmi/cli'
import { actions } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/abis.ts',
  contracts: [
    // Define your contracts here if you have any. For example:
    // {
    //   name: 'MyContract',
    //   address: '0x...',
    //   abi: 'src/abis/MyContract.json',
    // },
  ],
  plugins: [
    actions({
      getContract: true,
      readContract: true,
      prepareWriteContract: true,
      watchContractEvent: false,
    }),
    // Any other plugins you might want to use
  ],
})
