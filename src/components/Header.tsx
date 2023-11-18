import React from 'react'
import { LinkComponent } from './LinkComponent'
import { SITE_NAME } from '@/utils/site'
import { Connect } from './Connect'
import Image from 'next/image'
import logo from '@/assets/images/logo.png'

export function Header() {
  return (
    <header className='navbar flex justify-between p-4 pt-2'>
      <LinkComponent href='/' className='w-1/3'>
        {/* <h1 className='text-2xl font-bold text-white'>{SITE_NAME}</h1> */}
        <h1 className='text-2xl font-bold text-white'>
          <Image src={logo} alt={'CryptoGuardian'} height={120} />
        </h1>
      </LinkComponent>

      <div className='menu flex flex-row gap-8 w-1/3 justify-center'>
        <LinkComponent href='/'>
          <h1 className='text-lg text-gray-100'>Home</h1>
        </LinkComponent>
        <LinkComponent href='/manage'>
          <h1 className='text-lg text-gray-100'>Manage My Assets</h1>
        </LinkComponent>
        <LinkComponent href='/setting'>
          <h1 className='text-lg text-gray-100'>Setting</h1>
        </LinkComponent>
      </div>

      <div className='w-1/3 text-right flex justify-end'>
        <Connect />
      </div>
    </header>
  )
}
