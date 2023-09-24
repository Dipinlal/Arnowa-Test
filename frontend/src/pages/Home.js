import React from 'react'
import axios from 'axios';
import './home.css'
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearAuthError, clearAuthMessage, existingUser, login, logout, logoutAdmin, sendMessage } from '../redux/actions/userActions';
import Loader from "../components/Loader";
import MessageTable from '../components/MessageTable';
import UsersTable from '../components/UsersTable';
import { logoutAdminSuccess } from '../redux/slices/auth';

function Home() {

  const [userMessage, setMessage] = useState('');
  const [lastLoginTime, setLastLoginTime] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

   const { loading, error, isAuthenticated, user,message,messages,users,admin} = useSelector(state => state.authState)

   const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if(user){
      dispatch(sendMessage(userMessage,user.Email,lastLoginTime))
    }
    else{
      navigate('/login')
    }
   
    
  };
  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout)
    
  };
  const handleLogin = () => {
    dispatch(logoutAdmin)
   
  };
  useEffect(() => {
    if (!user && !admin) {
      navigate('/login')


    }
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'error',
        onOpen: () => { dispatch(clearAuthError); navigate('/login'); }
      })
      return;
    }
    // if (message) {
    //   toast(message, {
    //     position: toast.POSITION.BOTTOM_CENTER,
    //     type: 'success',
    //     onOpen: () => { dispatch(clearAuthMessage) }
    //   })
    //   return;
    // }
  }, [user,error, isAuthenticated, dispatch, navigate, loading])

  useEffect(() => {
    if(user){
    if (user.timeOfLogin && user.timeOfLogin.length > 0) {
      // Extract the loginTime from the last login session
      const lastLoginSession = user.timeOfLogin[user.timeOfLogin.length - 1];
      const lastLoginTimeString = lastLoginSession.loginTime;
      setLastLoginTime(lastLoginTimeString);
    }
  }
  }, [user]);

  return (<>
  <Fragment>
    {
      loading?<Loader/>:
    <>
    {user &&
    <div className='homemain'>
      <div className='NameDiv'>
        <h1>Welcome <span className='username'> {user.Name}</span></h1>
        <button className='logoutButton' onClick={handleLogout}> Logout</button>
      </div>
      <div className='MessageDiv'>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter your message"
        className='textBox'
        onChange={handleInputChange}
      />
      <br />
      <button className='submitButton' onClick={handleFormSubmit}>Submit</button>
      </div>
      <div className='tableDiv'>
      <h2>Your Message Table</h2>
      <MessageTable timeOfLogin={user.timeOfLogin}  messages={messages} />
    </div>
      
    </div>
    }
   
    {admin &&
    <div className='homemain'>
      <div className='NameDiv'>
        <h1>Welcome <span className='username'> Admin</span></h1>
        <button className='logoutButton' onClick={handleLogin}> Goto Login</button>
      </div>
      
      <div className='tableDiv'>
      <h2>All Users Data</h2>
      <UsersTable users={users}/>
    </div>
      
    </div>
    }
    </>
  }
  </Fragment>
    </>
  )
}

export default Home