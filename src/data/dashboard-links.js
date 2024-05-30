import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
 
  {
    id: 2,
    name: "All Posts",
    path: "/dashboard/my-posts",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscVm",
  },
  {
    id: 3,
    name: "Add Post",
    path: "/dashboard/add-post",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscAdd",
  },
  {
    id: 4,
    name: "Add Category",
    path: "/dashboard/add-category",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Registerd Users",
    path: "/dashboard/all-user",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscFeedback",
  },
 
 
];
