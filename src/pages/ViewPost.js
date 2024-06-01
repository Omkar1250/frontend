import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFullPostDetails } from '../services/operations/postAPI';
import AddComment from '../components/AddComment';
import Post from './Post';
import { formatDate } from '../services/formatDate';

export default function ViewPost() {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [tags, setTags] = useState([])

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const result = await getFullPostDetails(postId);
            if (result) {
                setPost(result);
                setComments(result?.comments?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
                setTags(result?.tag)
            }
            setLoading(false);
        };
        fetchPost();
    }, [postId]);

   

    if (loading || !comments) {
        return (
            <div className="grid flex-1 place-items-center">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className=" py-10 w-screen p-2 lg:w-4/5 px-2 mx-auto bg-richblack-800">
            <div className=" p-2 border-1 shadow-md rounded-lg overflow-hidden  mt-4 text-richblack-25">
                <h2 className="text-xl text-blue-200 font-semibold  mt-5 mb-4">{post?.title || 'Untitled Post'}</h2>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span className=' bg-caribbeangreen-200 rounded-md border text-sm px-2 border-caribbeangreen-50'>Created at: {post?.createdAt ? new Date(post?.createdAt).toLocaleDateString() : 'Unknown date'}</span>
                    <span className='bg-caribbeangreen-200 rounded-md border text-sm px-2 border-caribbeangreen-50' >Category: {post?.category?.name || 'Uncategorized'}</span>
                </div>
                 <div className='flex items-center justify-center'>
                 <div className="shadow-md shadow-blue-200 rounded overflow-hidden w-250 h-96 mb-4 ">
    <img className="w-full h-full object-cover" 
         src={post?.thumbnail || 'https://via.placeholder.com/150x150'} 
         alt={post?.title || 'Post thumbnail'} />
</div>
                 </div>

                
                <p className="text-lg leading-relaxed text-pretty mb-3 " dangerouslySetInnerHTML={{ __html: post?.body || 'No content available' }} />
                <div className='mb-2 mt-2'>Tags:</div>
               {
               tags?.map((tag, index)=>(
                  <span className='bg-caribbeangreen-200 rounded-md border text-sm px-2 border-caribbeangreen-50 break-all mt-4' key={index}>
                  {tag } {" "}
                 </span>
                ))
               }
                <div className='mt-4'>
                    <AddComment  />
                </div>

                <div className='p-1 mt-4'>
                    {comments.length === 0 ? (
                        <div className='text-richblack-5 font-semibold'>
                            No Comments Found For this Post
                        </div>
                    ) : (
                        <div className='flex  flex-col  max-w-[580px] lg:ml-52 mx-auto'>
                            {
                        comments.map((comment) => (
                            <div key={comment?._id} className='bg-richblack-800 p-2 rounded-md shadow-md mb-4  gap-4 
                            text-wrap  text-ellipsis overflow-hidden '>
                                <div className=''>
                                            <div className='flex justify-between bg-richblack-600 p-2 rounded-md'>
                                                                  
                                                        <div className='flex items-center justify-center'>
                                                        <img
                                                                src={comment?.user?.image || 'https://via.placeholder.com/150'}
                                                                alt={`${comment?.user?.firstName}`}
                                                                className="w-10 h-10 rounded-full object-cover border-2 border-blue-300"
                                                            />
                                                             <div className='ml-3'>
                                                        <p className='text-sm font-medium text-richblack-25'>
                                                                {comment?.user?.firstName} {comment?.user?.lastName}

                                                            </p>
                                                        </div>
                                                        </div>
                                                       
                                                        <div className='text-xs flex flex-end text-richblack-25'>{formatDate(comment?.createdAt)}</div>
                                            </div>
                                  
                                    <div className='mt-3'>
                                    <p className='text-sm rounded-md break-all mt-2 '>
                                        {comment?.commentDesc}
                                    </p>
                                    </div>
                                     <div>
                                  

                                     </div>
                                </div>
                            </div>
   
                        ))}
                        </div>
                    )}
                </div>

                
            </div>
            <Post/>
          
        </div>
    );
}
