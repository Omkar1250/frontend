import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllPosts } from '../services/operations/postAPI';
import Pagination from '../components/core/Pagination';
import { formatDate } from '../services/formatDate';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { htmlToText } from 'html-to-text';

export default function Post() {
  const { token } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const postsPerPage = 6;
  const TRUNCATE_BODY_LENGTH = 25;
  const TRUNCATE_TITLE_LENGTH = 12;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const result = await getAllPosts(token);
      if (result) {
        setPosts(result);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [token]);

  const sortedPosts = posts?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || [];
  const filteredPosts = searchQuery
    ? sortedPosts.filter(
        (post) =>
          htmlToText(post.body, { wordwrap: false }).toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sortedPosts;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredPosts.length / postsPerPage)));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const truncateText = (htmlContent, length) => {
    const sanitizedContent = DOMPurify.sanitize(htmlContent);
    const plainText = htmlToText(sanitizedContent, { wordwrap: false });
    return plainText.split(' ').length > length
      ? plainText.split(' ').slice(0, length).join(' ') + '...'
      : plainText;
  };

  return loading ? (
    <div className="grid flex-1 place-items-center">
      <div className="spinner"></div>
    </div>
  ) : (
    <div className='lg:w-4/5 mx-auto px-4'>
      <div className='mt-20 text-richblack-50 text-2xl font-semibold'>
        All Posts
      </div>
      <div className='mt-20 mb-10'>
        <input
          type='text'
          value={searchQuery}
          className='form-style w-full'
          placeholder='Search post...'
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredPosts.length === 0 ? (
        <div className='flex text-2xl font-medium items-center justify-center text-richblack-100'>
          No post Found
        </div>
      ) : (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 overflow-hidden'>
          {currentPosts.map((post) => (
            <div key={post._id} className='flex flex-col rounded-md border-[1px] border-richblack-600 overflow-hidden'>
              <div className='h-56 overflow-hidden text-white shadow-md bg-clip-border rounded-md  '>
                <img className='w-full h-full object-cover' src={post.thumbnail} alt={post.title} />
              </div>
              <div className='flex flex-col p-2 flex-1 text-richblack-25  font-medium'>
                <Link to={`/post/${post._id}`}>
                  <h5 className='text-lg font-semibold text-richblack-25  mb-2 '>
                    {truncateText(post.title, TRUNCATE_TITLE_LENGTH)}
                  </h5>
                </Link>
                <p className=' text-richblack-25  text-sm flex-grow'>
                  {truncateText(post.body, TRUNCATE_BODY_LENGTH)}
                </p>
                <div className='mt-4'>
                  <p className='text-xs text-blue-100 underline'>Category: {post.category.name}</p>
                  <p className='text-xs text-blue-100'>Created: {formatDate(post.createdAt)}</p>
                </div>
                <Link to={`/post/${post._id}`}>
                  <button className='mt-4  mb-2 p-1 bg-caribbeangreen-100 text-white w-full rounded'>
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className='flex justify-between mt-4'>
        <Pagination
          key={filteredPosts.length}
          postsPerPage={postsPerPage}
          totalPosts={filteredPosts.length}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
