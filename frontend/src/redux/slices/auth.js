import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
    admin:false,
  },
  reducers: {
    loginRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    loginSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        message: action.payload.message,
        messages: action.payload.messages,
      };
    },
    loginFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    clearMessage(state,action){
      return {
        ...state,
        message: null,
      }
    },
    logoutRequest(state,action){
      return {
          ...state,
          loading: true,
          
          
      }
  },
  logoutSuccess(state, action){
      return {
          loading: false,
          isAuthenticated: false,
          user:null,
          message:"Logout Success"
          
      }
  },
  logoutFail(state, action){
      return {
          ...state,
          error: action.payload,
          loading: false,
      }
  },
  sendRequest(state,action){
    return {
      ...state,
        loading: true,
        
        
    }
},
sendSuccess(state, action){
    return {
       ...state,
        messages:action.payload,
        message:"Message sent",
        loading: false,
        
    }
},
sendFail(state, action){
    return {
        ...state,
        error: action.payload,
        loading: false,
    }
},
adminSuccess(state, action){
  return {
     ...state,
      users:action.payload.users,
      admin:true,
      loading: false,
      
      
  }
},
logoutAdminSuccess(state, action){
  return {
     
     
      admin:false,
      loading: false,
      
      
  }
},
  
  }
});
const { actions, reducer } = authSlice;
export const { loginRequest, loginSuccess, loginFail, clearError,clearMessage,
  logoutRequest,
    logoutSuccess,
    logoutFail,
    sendRequest,sendSuccess,sendFail,
    adminSuccess,logoutAdminSuccess
  } = actions;
export default reducer;