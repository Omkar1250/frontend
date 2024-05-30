import { toast } from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";
import { logout } from "./authAPI";
import { setUser } from "../../slices/profileSlice";

const { GET_USER_DETAILS_API, GET_ALL_USERS_API } = profileEndpoints;

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorisation: `Bearer ${token}`,
      })
     

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}    

export const getAllUsers = async (token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    console.log("entry------3")
      const response = await apiConnector("GET", GET_ALL_USERS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      if (!response.data.success) {
          throw new Error("No users found");
      }
      result = response.data.data; // Assuming the users data is under `data.data`
  } catch (error) {
      throw new Error("Something went wrong while fetching users");
  } finally {
      toast.dismiss(toastId);
  }
  return result;
};