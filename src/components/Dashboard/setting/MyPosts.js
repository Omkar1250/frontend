import React, { useState, useEffect } from 'react';
import { getAllPosts } from '../../../services/operations/postAPI';
import IconBtn from '../../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { VscAdd } from 'react-icons/vsc';
import PostTable from '../AdminCourses/PostTable';
export default function MyPosts() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const result = await getAllPosts(); 
                if (result) {
                    setPosts(result);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className='mt-10'>
            <div className='mb-14  flex items-center justify-between'>
                <h1 className='text-3xl font-medium text-richblack-5'> My Posts   </h1>
                <IconBtn
                  text="Add Post"
                  onclick={()=> navigate("/dashboard/add-post")}
                >
                <VscAdd/>

                </IconBtn>
             
            </div>
            
            {posts && <PostTable posts={posts} setPosts={setPosts}/>}
          
        </div>
    );
}
