import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { categoryPageData, fetchPostCategories } from '../services/operations/postAPI';
import { formatDate } from '../services/formatDate';
import Pagination from '../components/core/Pagination';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { htmlToText } from 'html-to-text';
import Error from './Error';
export default function Category() {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const TRUNCATE_BODY_LENGTH = 25;
  const TRUNCATE_TITLE_LENGTH = 12;
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetchPostCategories();
        const category = res.find((ct) => ct.name.split(' ').join('-').toLowerCase() === catalogName);
        if (category) {
          setCategoryId(category._id);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryPageDetails = async () => {
        setLoading(true)
      if (!categoryId) return;
      try {
        const res = await categoryPageData(categoryId);
        setCatalogPageData(res);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching category page details:', error);
      }
    };
    getCategoryPageDetails();
  }, [categoryId]);

  const sortedPosts =
    catalogPageData?.data?.selectedCategory?.posts?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ) || [];

  // Filter posts based on search query
  const filteredPosts = sortedPosts.filter(
    (post) =>
      htmlToText(post.body, { wordwrap: false }).toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
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

  if (!catalogPageData) {
    return (
      <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
        <div className='spinner'></div>
      </div>
    );
  }
  if (!loading && !catalogPageData.success) {
    return <Error />;
  }
  
  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className='lg:w-4/5 mx-auto px-4'>
        {/* Hero Section */}
        <div className='box-content bg-richblack-700 px-4 mt-8'>
          <div className='mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent'>
            <p className='text-sm text-richblack-300'>
              {`Home / Catalog / `}
              <span className='text-yellow-25'>{catalogPageData?.data?.selectedCategory?.name}</span>
            </p>
            <p className='text-3xl text-richblack-5'>{catalogPageData?.data?.selectedCategory?.name}</p>
            <p className='max-w-[870px] text-richblack-200'>
              {catalogPageData?.data?.selectedCategory?.description}
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className='my-4'>
          <input
            type='text'
            placeholder='Search posts...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='form-style w-full'
          />
        </div>

        {/* Posts Section */}
        {catalogPageData.success === false ? (
          <div className='flex text-2xl font-medium items-center justify-center text-richblack-100'>
            No Posts found for this category
          </div>
        ) : (
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {currentPosts.map((post) => (
              <div key={post._id} className='flex flex-col rounded-md border-[1px] border-richblack-600 overflow-hidden'>
                <div className='h-56 overflow-hidden text-white shadow-md bg-clip-border rounded-md'>
                  <img className='w-full h-full object-cover' src={post.thumbnail} alt={post.title} />
                </div>
                <div className='flex flex-col p-2 flex-1 text-richblack-25  font-medium'>
                 <Link to={`/post/${post?._id}`}>
                 <h5 className='text-lg font-semibold text-richblack-25  mb-2 '>
                 {truncateText(post.title, TRUNCATE_TITLE_LENGTH)}
                  </h5>
                 
                 </Link>
                  <p className='text-richblack-25  text-sm flex-grow'>
                  {truncateText(post.body, TRUNCATE_BODY_LENGTH)}
                  </p>
                  <span>
                    <p className='text-xs text-blue-100 underline'>Category: {catalogPageData.data.selectedCategory.name}</p>
                    <p className='text-xs text-blue-100 underline'>Created: {formatDate(post.createdAt)}</p>
                  </span>
                  <Link to={`/post/${post?._id}`}>
                    <button className='mt-4  mb-2 p-1 bg-caribbeangreen-100 text-white w-full rounded'>Read More</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className='flex justify-between mt-4'>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={filteredPosts.length}
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
}
