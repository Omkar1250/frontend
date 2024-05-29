import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { setPost, setEditPost } from "../../../slices/postSlice"
import RenderSteps from "../AddPost/RenderSteps"
import { getFullPostDetails } from "../../../services/operations/postAPI"

export default function EditPost() {
  const dispatch = useDispatch()
  const { postId } = useParams()

 const {post} = useSelector((state)=> state.post)
 
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)   

  useEffect(() => {
    (async () => {
      setLoading(true)
      const result = await getFullPostDetails(postId, token)
 
      if (result) {
        dispatch(setEditPost(true))
        dispatch(setPost(result))
      }
      setLoading(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

 

  if (loading) {
    return ( 
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course
      </h1>
      <div className="mx-auto max-w-[600px]">
        {post ? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Post not found
          </p>
        )}
      </div>
    </div>
  )
} 