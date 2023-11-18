import { SITE_DESCRIPTION } from '@/utils/site'
import Image from 'next/image'
import heroImage from '@/assets/images/crypto-guardian.png'
export default function Home() {
  return (
    <>
      <div className='flex align-middle gap-10 mt-20'>
        <div className='w-1/2 flex items-center flex-col justify-center'>
          <h2 className='text-4xl font-bold mt-8 text-white'>
            {' '}
            Your Assets, Your Decisions - Beyond Courts and Governments
          </h2>
          <p className='text-xl text-white mt-8'>
            Secure and manage your crypto assets effortlessly with CryptoGuardian. Connect your wallet, monitor your
            investments, and safeguard your digital wealth with ease.
          </p>
        </div>
        <div className='w-1/2'>
          <Image src={heroImage} alt='hero' width={'100%'} />
        </div>
        {/* <p>{SITE_DESCRIPTION}</p> */}
      </div>
    </>
  )
}
