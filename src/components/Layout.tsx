import React, { PropsWithChildren } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout(props: PropsWithChildren) {
  return (
    <div className='flex flex-col min-h-screen' style={{ backgroundColor: '#151937' }}>
      <Header />

      <main className='flex-grow px-4 container  mx-auto'>{props.children}</main>
      <Footer />
    </div>
  )
}
