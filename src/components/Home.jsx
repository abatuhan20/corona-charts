import React from 'react'
import CovidData from './CovidData'

const Home = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl'>Home</h1>
    <CovidData/>
    </div>
  )
}

export default Home