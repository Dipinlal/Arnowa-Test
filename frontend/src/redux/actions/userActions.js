import axios from "axios";
import {

      loginRequest,
      loginSuccess,
      loginFail,
      clearError,
      clearMessage,
      logoutRequest,
    logoutSuccess,
    logoutFail,
    sendRequest,sendSuccess,sendFail,
    adminSuccess,logoutAdminSuccess
    } from "../slices/auth";
export const login = (Name,Email,MobileNumber) => async (dispatch) => {


    console.log(Name,Email,MobileNumber);
    if(Name==="admin" && Email == "admin@admin.com" && MobileNumber==="0000000000"){
      try {
        dispatch(loginRequest());
        // const { data } = await axios.put(`http://localhost:8000/api/v1/login`, {
        //   Name,Email,MobileNumber
        // });
        // console.log(data)
        // dispatch(loginSuccess(data));
        const usersData  = await axios.get(`http://localhost:8000/api/v1/getAllUsers`);
       console.log(usersData.data)
        dispatch(adminSuccess(usersData.data))
      } catch (error) {
        console.log(error)
          if (error.response.data.error) {
              dispatch(loginFail(error.response.data.error))
          } else if ((error.response.data.message)) {
              dispatch(loginFail(error.response.data.message))
          }
      }
    }
    else if(Name === "admin" || Email === "admin@admin.com" || MobileNumber === "0000000000"){
     
      dispatch(loginFail("Please Enter Correct Admin Data"))
    }
    else{
      try {
        dispatch(loginRequest());
        const { data } = await axios.put(`http://localhost:8000/api/v1/login`, {
          Name,Email,MobileNumber
        });
        console.log(data)
        dispatch(loginSuccess(data));
      } catch (error) {
        console.log(error)
          if (error.response.data.error) {
              dispatch(loginFail(error.response.data.error))
          } else if ((error.response.data.message)) {
              dispatch(loginFail(error.response.data.message))
          }
      }

    }
  
  };
  export const clearAuthError = async(dispatch) => {
    dispatch(clearError());
  };

  export const existingUser = async (dispatch) => {
    
    try {
      dispatch(loginRequest());
      const { data } = await axios.get(`http://localhost:8000/api/v1/checkUser`);
      console.log(data)
      dispatch(loginSuccess(data));
    } catch (error) {
      console.log(error)
        if (error.response.data.error) {
            dispatch(loginFail(error.response.data.error))
        } else if ((error.response.data.message)) {
            dispatch(loginFail(error.response.data.message))
        }
    }
  };

  export const logout =  async (dispatch) => {

    try {
        dispatch(logoutRequest())
        await axios.get(`http://localhost:8000/api/v1/logout`);
        dispatch(logoutSuccess())
       
    } catch (error) {
        dispatch(logoutFail())
    }

}
export const logoutAdmin =  async (dispatch) => {

  try {
      
      dispatch(logoutAdminSuccess())
     
  } catch (error) {
      dispatch(logoutFail())
  }

}
export const clearAuthMessage = async(dispatch) => {
  dispatch(clearMessage());
};

export const sendMessage = (Message,Email,timeOfLogin) => async (dispatch) => {
  console.log(Message,Email,timeOfLogin)
  try {
    dispatch(sendRequest());
    const { data } = await axios.post(`http://localhost:8000/api/v1/sendMessage`, {
     Message,Email,timeOfLogin});
    console.log(data)
    dispatch(sendSuccess(data.messagesForEmail));
  } catch (error) {
    console.log(error)
      if (error.response.data.error) {
          dispatch(sendFail(error.response.data.error))
      } else if ((error.response.data.message)) {
          dispatch(sendFail(error.response.data.message))
      }
  }

}


  