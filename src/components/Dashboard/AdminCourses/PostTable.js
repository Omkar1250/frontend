import React, { useState, useEffect } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllPosts, deletePost } from '../../../services/operations/postAPI';
import { RiDeleteBin6Line } from 'react-icons/ri';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { formatDate } from '../../../services/formatDate';
import Pagination from '../../core/Pagination';
import DOMPurify from 'dompurify';
import { htmlToText } from 'html-to-text';

export default function PostTable({ posts, setPosts }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    const [searchQuery, setSearchQuery] = useState("");
    const TRUNCATE_LENGTH = 30;

    useEffect(() => {
        // Fetch posts on component mount or token change
        const fetchPosts = async () => {
            const result = await getAllPosts(token);
            if (result) {
                setPosts(result);
            }
        };

        fetchPosts();
    }, [token, setPosts]);

    const handlePostDelete = async (postId) => {
        setLoading(true);
        await deletePost({ postId }, token);
        const result = await getAllPosts(token);
        if (result) {
            setPosts(result);
        }
        setConfirmationModal(null);
        setLoading(false);
    };

    const sortedPosts = posts?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || [];

    const filteredPosts = sortedPosts.filter(post =>
        htmlToText(post.body, { wordwrap: false }).toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredPosts.length / postsPerPage)));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    const truncateText = (htmlContent) => {
        const sanitizedContent = DOMPurify.sanitize(htmlContent);
        const plainText = htmlToText(sanitizedContent, { wordwrap: false });
        return plainText.split(' ').length > TRUNCATE_LENGTH
            ? plainText.split(' ').slice(0, TRUNCATE_LENGTH).join(' ') + '...'
            : plainText;
    };

    return (
        <>
            <div>
                <input
                    type="text"
                    value={searchQuery}
                    className="form-style w-full"
                    placeholder="Search post..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {filteredPosts.length === 0 ? (
                <div className="flex text-2xl font-medium items-center justify-center text-richblack-100">
                    No post Found
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {currentPosts.map((post) => (
                        <div key={post._id} className="relative flex flex-col mt-6 text-white shadow-md bg-clip-border rounded-xl">
                            <div className="relative h-56 mx-4 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-50 shadow-blue-25">
                                <img className="w-full h-full object-cover" src={post.thumbnail} alt={post.title} />
                            </div>
                            <div className="p-6">
                                <h5 className="block mb-2 text-l antialiased font-semibold loading-snug tracking-normal text-blue-100">
                                    {post.title.split(" ").length > 30
                                        ? post.title.split(' ').slice(0, 30).join(' ') + '...'
                                        : post.title}
                                </h5>
                                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                    {truncateText(post.body)}
                                </p>
                                <span>
                                    <p className="text-blue-100 underline text-sm">Category: {post.category.name}</p>
                                    <p className="text-blue-100 text-sm">Created: {formatDate(post.createdAt)}</p>
                                    <p className="text-blue-100 text-sm">Created By: {post.author.email}</p>
                                </span>
                            </div>
                            <div className="flex items-center justify-center bg-caribbeangreen-50 p-2 rounded-lg">
                                <button
                                    disabled={loading}
                                    onClick={() => navigate(`/dashboard/edit-post/${post._id}`)}
                                    title="Edit"
                                    className="px-2 transition-all duration-200 hover-scale-110 hover:text-caribbeangreen-300"
                                >
                                    <FiEdit2 size={23} />
                                </button>
                                <button
                                    disabled={loading}
                                    onClick={() => {
                                        setConfirmationModal({
                                            text1: 'Do you want to delete this post?',
                                            text2: 'All the data related to this post will be deleted',
                                            btn1Text: !loading ? 'Delete' : 'Loading...',
                                            btn2Text: 'Cancel',
                                            btn1Handler: !loading ? () => handlePostDelete(post._id) : () => {},
                                            btn2Handler: !loading ? () => setConfirmationModal(null) : () => {},
                                        });
                                    }}
                                    title="Delete"
                                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                >
                                    <RiDeleteBin6Line size={23} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-between mt-4">
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={filteredPosts.length}
                    paginate={paginate}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    currentPage={currentPage}
                />
            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    );
}
