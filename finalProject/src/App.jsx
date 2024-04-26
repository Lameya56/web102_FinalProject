import { useState, useEffect } from 'react'
import './App.css'
import Home from './components/Home';
import Create from './components/Create';
import AboutPage from './components/AboutPage';
import Details from './components/Details';
import DeletePost from './components/DeletePost';
import Edit from './components/EditPost';
import { useRoutes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import EditPost from './components/EditPost';
import bunnyEars from './assets/bunny.jpg'; 


function App() {
  
  let element = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/about",
      element: <AboutPage />
    },
    {
      path: "/create",
      element: <Create />
    },
    {
      path: "/details/:id",
      element: <Details />
    },
    {
      path: "/details/:id/edit",
      element: <EditPost/>
    },
    {
      path: "/details/:id/delete",
      element: <DeletePost/>
    }
  ]);
    return (
      <div className='App'>
      <div className='topnav'>
        <img src={bunnyEars} alt='Bunny Ears Logo' />
        <Link to= "/about">About</Link>
        <Link to= "/create">Create</Link>
        <Link to= "/">Home</Link>
      </div>
      {element}
      </div>
    )
}
export default App;
