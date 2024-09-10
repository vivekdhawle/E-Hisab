import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: {},
  change:0,
  hisabId:"",
  hisab:[],
  hisabadd:0,
  isEditing:false

};

const authSlice = createSlice({
  name: "auth",
  initialState,  // make sure it's initialState, not intialState
  reducers: {
    logine: (state, action) => { // Corrected function name to login
      state.status = true;
      state.userData = action.payload.userData;
      console.log("in",state.userData)
    },
    logoute: (state) => {
      state.status = false;
      state.userData = null;
      state.change=0
      console.log("out",state.userData)
    },
    change:(state)=>{
      state.change=state.change+1
    },
    setHisabId:(state,action)=>{
      state.hisabId=action.payload

    },
    setHisab:(state,action)=>{
      state.hisab=action.payload
    },
      sethisabadd:(state,action)=>{
        state.hisabadd=state.hisabadd+1
    },
    setIsEditing:(state,action)=>{
      console.log(state.isEditing)

      state.isEditing=!(state.isEditing)
      console.log(state.isEditing)
    }
  },
});

// Export actions and reducer correctly
export const { logine, logoute,change,setHisabId ,setHisab,sethisabadd,setIsEditing} = authSlice.actions;
export default authSlice.reducer;