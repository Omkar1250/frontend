const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS 
export const endpoints = {
    SENDOTP_API: `${BASE_URL}/auth/sendotp`,
    SIGNUP_API: `${BASE_URL}/auth/signup`,
    LOGIN_API: `${BASE_URL}/auth/login`,
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
    GET_USER_DETAILS_API: `${BASE_URL}/profile/getprofiledetails`,
};

// CATEGORIES API 
export const categories = {
    CATEGORIES_API: `${BASE_URL}/post/showallcategory`,
    CATALOGPAGEDATA_API: `${BASE_URL}/post/getcategorypagedetails`,
};

// POST ENDPOINTS
export const postEndpoints = {
    GET_ALL_POST_API: `${BASE_URL}/post/getallposts`,
    DELETE_POST_API: `${BASE_URL}/post/deletepost`,
    GET_FULL_POST_DETAILS: `${BASE_URL}/post/getpostdetails`,
    CREATE_POST_API: `${BASE_URL}/post/createpost`,
    EDIT_POST_API: `${BASE_URL}/post/editpost`,
};

// SETTING ENDPOINTS
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: `${BASE_URL}/profile/updateprofilepicture`,
    UPDATE_PROFILE_API: `${BASE_URL}/profile/updateprofile`,
    DELETE_PROFILE_API: `${BASE_URL}/profile/deleteaccount`,
};

//comments ENDPOINT
export const commentsENDPOINTS = {
    CREATE_COMMENT_API: `${BASE_URL}/comment/createcomment`
}
