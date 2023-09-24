import React from 'react'
import axios from 'axios';
import './Login.css'
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Loader from "../components/Loader";
import { toast } from 'react-toastify';

import { Typography } from '@mui/material';
import { clearAuthError, clearAuthMessage, existingUser, login } from '../redux/actions/userActions';

function Login() {
  
  const [name, setName] = useState(null);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

   const { loading, error, isAuthenticated, user,message,admin} = useSelector(state => state.authState)

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(name, email, mobile))
   
  }
  useEffect(() => {
    if (user && name) {
      toast('login Successfully!', {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => navigate('/home')
      })


    }
    if(user){
      navigate('/home')
    }
    if(admin){
      navigate('/home')
    }
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'error',
        onOpen: () => { dispatch(clearAuthError) }
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
  }, [error, isAuthenticated, dispatch, navigate, loading,message,admin])

useEffect(() => {

    dispatch(existingUser)
 
}, [])

  

  return (
    <Fragment>
      {
      loading?<Loader/>:
    <>
      <div className='loginMain'>
        
          <div className='loginLeft_sub'>

          {/* <div className="formHead_main">
                
                <h2 className="formHead_h2">Welcome</h2>
                <img className='FormHead_imgL' src='/images/NxtBusNow.png' alt='logo'/>
            </div> */}
            <form onSubmit={submitHandler}>
              
              
              <div className="labelDiv1">
                <label htmlFor="email_fieldL" className="labelTop1">
                <input
                    id="email_fieldL"
                    className='inputMainLogin'
                    type="text" name="name"
                    placeholder='Enter Name'
                    
                    onChange={e => setName(e.target.value)}
                  />
                  <input
                    id="email_fieldL"
                    className='inputMainLogin'
                    type="text" name="email"
                    placeholder='Enter Email'
                    
                    onChange={e => setEmail(e.target.value)}
                  />
                </label><br />
                <label htmlFor="password_fieldL" >

                  <input
                    id="password_fieldL"
                    className='inputMainLogin'
                    
                    name="mobile"
                    placeholder='Enter Mobile Number'
                   type='number'
                    onChange={e => setMobile(e.target.value)}
                  />
                  <div className='passIcon' ><div className='iconimage'>
                

                  </div></div>
                </label>

                <input className='loginbtn inputMain2Login' type="submit" value="Log in" />
              </div>
              
            </form>



          
        </div>
        {/* <div className='loginRight'>
          <img className='loginRightImg' src='/images/loginRight.png' alt='loginphoto'/>
        </div> */}


      </div>
      </>
  }
    </Fragment>
  )
}

export default Login