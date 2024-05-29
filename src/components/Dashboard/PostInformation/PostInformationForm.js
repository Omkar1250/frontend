import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addPostDetails, editPostDetails, fetchPostCategories } from '../../../services/operations/postAPI'
import ChipInput from './ChipInput'
import { setStep, setPost } from '../../../slices/postSlice'
import IconBtn from '../../../common/IconBtn'
import { MdNavigateNext } from 'react-icons/md'
import toast from 'react-hot-toast'
import Upload from '../AddPost/Upload'
import JoditEditor from 'jodit-react'

export default function PostInformationForm() {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { post, editPost } = useSelector((state) => state.post)
  const [loading, setLoading] = useState(false)
  const [postCategories, setPostCategories] = useState([])
  const [postShortDesc] = useState('')
  const editor = useRef(null)

 
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchPostCategories()
      setPostCategories(categories)
      setLoading(false)
    }
    // If form is in edit mode
    if (editPost) {
      setValue("postTitle", post.title)
      setValue("postShortDesc", post.body)
      setValue("postTags", post.tag)
      setValue("postCategory", post.category._id)
      setValue("postImage", post.thumbnail)
    }
    getCategories()
  }, [editPost, post, setValue])

  const isFormUpdated = () => {
    const currentValues = getValues()
    return (
      currentValues.postTitle !== post.title ||
      currentValues.postShortDesc !== post.body ||
      currentValues.postTags.toString() !== post.tag.toString() ||
      currentValues.postCategory !== post.category._id ||
      currentValues.postImage !== post.thumbnail
    )
  }

  // Handle form submission
  const onSubmit = async (data) => {
    if (editPost) {
      if (isFormUpdated()) {
        const formData = new FormData()
        formData.append("postId", post._id)
        formData.append("title", data.postTitle)
        formData.append("body", data.postShortDesc)
        formData.append("tag", JSON.stringify(data.postTags))
        formData.append("category", data.postCategory)
        formData.append("thumbnailImage", data.postImage[0])

        setLoading(true)
        const result = await editPostDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setPost(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("title", data.postTitle)
    formData.append("body", data.postShortDesc)
    formData.append("tag", JSON.stringify(data.postTags))
    formData.append("category", data.postCategory)
    formData.append("thumbnailImage", data.postImage)

    setLoading(true)
    const result = await addPostDetails(formData, token)
    setLoading(false)
    if (result) {
      dispatch(setStep(2))
      dispatch(setPost(result))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className='text-richblack-5' htmlFor="postTitle">
          Post Title <sup className='text-pink-200'>*</sup>
        </label>
        <input
          id='postTitle'
          placeholder='Enter Post Title'
          {...register("postTitle", { required: true })}
          className='form-style w-full'
          type="text"
        />
        {errors.postTitle && (
          <span className='text-xs ml-2 tracking-wide text-pink-200'>
            Post title is required
          </span>
        )}
      </div>

      <div>
        <label htmlFor="postShortDesc">
          Post Description <sup className='text-pink-200'>*</sup>
        </label>
        <JoditEditor
          ref={editor}
          value={getValues("postShortDesc")}
          onChange={newContent => setValue("postShortDesc", newContent)}
          
        />
        {errors.postShortDesc && (
          <span className='text-xs ml-2 tracking-wide text-pink-200'>
            Post description is required
          </span>
        )}
      </div>

      <div>
        <label htmlFor="postCategory" className='text-richblack-5'>
          Post Category <sup className='text-pink-200'>*</sup>
        </label>
        <select
          {...register("postCategory", { required: true })}
          name="postCategory"
          id="postCategory"
          className='form-style w-full'
          defaultValue={1}
        >
          <option value={1} disabled>
            Choose a Category
          </option>
          {!loading && postCategories.map((category, index) => (
            <option key={index} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.postCategory && (
          <span className='ml-2 text-xs tracking-wide text-pink-200'>
            Post category is required
          </span>
        )}
      </div>

      <ChipInput
        label="Tags"
        name="postTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <Upload
        name="postImage"
        label="Post Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editPost ? post?.thumbnail : null}
      />

      <div className="flex justify-end gap-x-2">
        {editPost && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editPost ? "Add post" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
      {postShortDesc}
    </form>
  )
}
