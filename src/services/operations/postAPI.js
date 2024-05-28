import toast from "react-hot-toast";
import {  categories, commentsENDPOINTS, postEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";



const {
    GET_ALL_POST_API,
    DELETE_POST_API,
    CREATE_POST_API,
    EDIT_POST_API,
    GET_FULL_POST_DETAILS,
    
} = postEndpoints


const {
    CATEGORIES_API,
    CATALOGPAGEDATA_API
} = categories

const {
    CREATE_COMMENT_API
} = commentsENDPOINTS

export const getAllPosts = async () => {
    const toastId = toast.loading("Loading...")
    let result = []
    
    try {
        const response = await apiConnector("GET", GET_ALL_POST_API)
        if(!response?.data?.success){
                throw new Error("Could not fetch Post")
        }
        result= response?.data?.data
    } catch (error) {
        console.log("GET_ALL_POST_API...ERROR.........", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const fetchPostCategories = async () => {
    let result = []
    try {
        const response = await apiConnector("GET", CATEGORIES_API)
        console.log("Printing response from apis file............", response)
        console.log("POST_CATEGORIES_API...RESPONE" ,response)
        if(!response?.data?.success){
            throw new Error("Could not fetch Categories")

        }
        result = response?.data?.data
        
    } catch (error) {
            console.log('POST_CATEGORY_API_ERROR....', error)
            toast.error(error.message)        
    }          
    return result
}

export const addPostDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", CREATE_POST_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization:`Bearer ${token}`
        })
        console.log("CREATE COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
          throw new Error("Could Not Add Course Details")
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.data
      } catch (error) {
        console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message)
      }
      toast.dismiss(toastId)
      return result
    }


export const getFullPostDetails = async(postId, token) =>{

    const toastId = toast.loading("Loading...")
    let result = null

    try {
        const response = await apiConnector("POST", GET_FULL_POST_DETAILS,{
            postId,
        },
    {
        Authorization: `Bearer ${token}`,
    } )
    console.log("POST_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  }catch(error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}


export const editPostDetails = async(data, token)=>{
    let result = null
    const toastId = toast.loading("Loading...")

    try {
            const response = await apiConnector("POST", EDIT_POST_API, data, {
                "Content-Type":"multipart/form-data",
                 Authorization: `Bearer ${token}`,
            })    
            console.log("EDIT POST API RESPONSE.......", response)
            if(!response?.data?.success){
                throw new Error("Could not update post details")
            }
            toast.success("Poast updated successfully")
            result = response?.data?.data
    } catch (error) {
        console.log("EDIT COURSE API ERROR............", error)
        toast.error(error.message)
      }
      toast.dismiss(toastId)
      return result
    }


export const deletePost = async(data, token)=> {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("DELETE", DELETE_POST_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETE_POST_API_RESPONSE", response)
        if(!response?.data?.success) {
            throw new Error("Could Not Delete Post")

        }
        toast.success("Post Deleted")
    } catch (error) {
        console.log("DELETE COURSE API ERROR............", error)
        toast.error(error.message)
      }
      toast.dismiss(toastId)
    }



export const categoryPageData = async (categoryId)=> {
    const toastId = toast.loading("Loading...")
    let result =[]
    try {
        const response = await apiConnector("POST",  CATALOGPAGEDATA_API,
            {categoryId : categoryId,}
        );
        console.log(" PRINTING CATEGORYPAGE DATA API RESPONSE", response)
       
        if(!response?.data?.success)
            throw new Error("Could not Fetch Category page data");

         result = response?.data;

  }
  catch(error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
   
    result = error.response?.data;
   
        toast.error(result.message)
    
  }
  toast.dismiss(toastId);
  return result;
}

export const createComment = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading");

    try {
        const response = await apiConnector("POST", CREATE_COMMENT_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        if (!response.data.success) {
            throw new Error("Something went wrong!! Cannot add Comment");
        }

        toast.success("Comment added successfully");
        result = response.data; // Ensure this returns the newly created comment data
    } catch (error) {
        console.log("CREATE COMMENT API ERROR............", error);
        toast.error("Please Login to add Comment");
    } finally {
        toast.dismiss(toastId);
    }

    return result; // Return the result (comment data or null in case of an error)
};