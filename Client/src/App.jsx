import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router'

function App() {
  return (
    <>
      <div className='min-h-screen flex flex-col  bg-linear-to-b from-slate-900 via-slate-900 to-black'>
      <Header/>
      <div className=''>
        <Outlet/>
      </div>
      </div>
    </>
  )
}

export default App
