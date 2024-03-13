import styles from './App.module.css';
import {BrowserRouter , Route , Routes , Navigate, Outlet} from 'react-router-dom'
import Application from './components/pages/Application/Application';
import ProfileSettings from './components/pages/ProfileSettings/ProfileSettings';
import Login from './components/pages/Auth/Login/Login';
import Register from './components/pages/Auth/Register/Register';
import { useEffect, useState } from 'react';
import useAuth from './components/hooks/useAuth';
import { useSelector } from 'react-redux';
import Loading from './components/shared/Loading/Loading';

function App() {
  
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute/>}>
            <Route path='/' element={<Application/>} ></Route>
            <Route path='/profil' element={<ProfileSettings/>}></Route>          
          </Route>
          <Route path='/login' element={<Login/>}></Route>          
          <Route path='/register' element={<Register/>}></Route>          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function ProtectedRoute(){
  // if user is authenticated show the component otherwise redirect to login page
  // you can customize this logic according to your needs
  const {isAuth , getAuthenticatedUser} = useAuth()  
  const [isLoading ,setIsLoading] = useState(true)

  useEffect(()=>{
    getAuthenticatedUser()
    .finally(()=>
      setIsLoading(false)
    )
  },[])

  if(isLoading) return <Loading/>

  if(!isAuth) return <Navigate replace to='/login' />

  return <Outlet/>
} 
export default App
