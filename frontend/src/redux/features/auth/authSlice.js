import { createSlice } from "@reduxjs/toolkit";

// get the name from local storage
const name = JSON.parse(localStorage.getItem("name"));

const initialState = {
  isLoggedIn: false,
  // if name found in local storage, use it, otherwise use empty string
  name: name ? name : "",
  // user data
  user: {
    name: "",
    email: "",
    profilePicture: "",
    phone: "",
    bio: "",
  },
  userID: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Get the login status
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    // Name is used in several places
    // store it in case user refreshes the page
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    // Payload is going to be an object with user data
    SET_USER(state, action) {
      const profile = action.payload;

      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.profilePicture = profile.profilePicture;
      state.user.phone = profile.phone;
      state.user.bio = profile.bio;
    },
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
