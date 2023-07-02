import { toast } from "react-toastify";
import axios from "axios";
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// http requests related to authentication (backend calls)

// register a new user to db
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/users/register`,
      userData,
      // for example purposes, its globally set in App.js
      { withCredentials: true }
    );
    if (response.statusText === "OK") {
      toast.success("Registration successful");
    }
    return response.data;
  } catch (error) {
    // list of possible error formats
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    toast.error(message);
  }
};
