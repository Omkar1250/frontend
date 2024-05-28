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
 
 
];
