'use client'
// pages/settings.js
import { useState } from 'react'

export default function Settings() {
  const [checkWalletAutomatically, setCheckWalletAutomatically] = useState(false)
  const [checkingPeriod, setCheckingPeriod] = useState('monthly')
  const [alertMethod, setAlertMethod] = useState('email')
  const [alertDetail, setAlertDetail] = useState('')

  const handleAlertMethodChange = (e: any) => {
    setAlertMethod(e.target.value)
    setAlertDetail('')
  }

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Settings</h1>
      <form>
        <div className='mb-4'>
          <label className='block mb-2 font-medium'>
            Check my wallet activity automatically
            <input
              type='checkbox'
              checked={checkWalletAutomatically}
              onChange={(e) => setCheckWalletAutomatically(e.target.checked)}
              className='ml-2'
            />
          </label>
          <p className='text-sm text-gray-600'>If I have transactions, there is no need to check by cryptoguardians.</p>
        </div>

        <div className='mb-4'>
          <label htmlFor='checkingPeriod' className='block mb-2 font-medium'>
            Checking Period
          </label>
          <select
            id='checkingPeriod'
            value={checkingPeriod}
            onChange={(e) => setCheckingPeriod(e.target.value)}
            className='p-2 border border-gray-300 rounded'>
            <option value='monthly'>Monthly</option>
            <option value='3-months'>3 Months</option>
            <option value='6-months'>6 Months</option>
          </select>
        </div>

        <div className='mb-4'>
          <label htmlFor='alertMethod' className='block mb-2 font-medium'>
            How to send alert activity
          </label>
          <select
            id='alertMethod'
            value={alertMethod}
            onChange={handleAlertMethodChange}
            className='p-2 border border-gray-300 rounded'>
            <option value='email'>Email</option>
            <option value='sms'>SMS</option>
            {/* Add more options here if needed */}
          </select>
        </div>

        {alertMethod === 'email' && (
          <div className='mb-4'>
            <label htmlFor='emailAddress' className='block mb-2 font-medium'>
              Email Address
            </label>
            <input
              type='email'
              id='emailAddress'
              value={alertDetail}
              onChange={(e) => setAlertDetail(e.target.value)}
              className='p-2 border border-gray-300 rounded w-full'
              placeholder='Enter your email'
            />
          </div>
        )}

        {alertMethod === 'sms' && (
          <div className='mb-4'>
            <label htmlFor='phoneNumber' className='block mb-2 font-medium'>
              Phone Number
            </label>
            <input
              type='tel'
              id='phoneNumber'
              value={alertDetail}
              onChange={(e) => setAlertDetail(e.target.value)}
              className='p-2 border border-gray-300 rounded w-full'
              placeholder='Enter your phone number'
            />
          </div>
        )}

        {/* Add more conditional inputs here if needed for other alert methods */}

        <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
          Save Settings
        </button>
      </form>
    </div>
  )
}
