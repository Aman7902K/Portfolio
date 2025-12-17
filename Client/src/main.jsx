import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import AboutMe from './components/About/AboutMe.jsx'
import Project from './components/Projects/Project.jsx'
import Admin from './components/Admin/index.jsx'
import ContactMe from './components/contactMe/ContactMe.jsx'


const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<AboutMe/>}/>
      <Route path='/projects' element={<Project/>}/>
      <Route path='/admin/:pswd' element={<Admin/>} />
      <Route path='contactMe' element={<ContactMe/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {Router}/>
  </StrictMode>,
)
