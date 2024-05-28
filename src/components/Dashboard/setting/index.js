import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'

export default function Settings() {
  return (
    <>
        <h1 className=' mt-20 text-3xl font-medium text-richblack-5'>
            Edit Profile

        </h1>
        <ChangeProfilePicture/>

        <EditProfile/>



    </>
  )
}
