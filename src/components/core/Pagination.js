import React from 'react'
import '../../App'
export default function Pagination({
    postsPerPage, 
    totalPosts, 
    paginate,
    nextPage,
    prevPage, 
    currentPage
}){
    const pageNumbers = []
    for(let i = 1; i<=Math.ceil(totalPosts/ postsPerPage); i++){
            pageNumbers.push(i)
    }

    return (
        <>
            
                <div className={`page-item  ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button onClick={prevPage} className='page-link font-semibold '>
                        Back
                    </button>
                </div>
                 <p className='text-richblack-25  text-lg font-semibold' >{currentPage}</p>
                <div className={`page-item  ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
                    <button onClick={nextPage} className='page-link font-semibold'>
                        Next
                    </button>
                </div>
            
        </>
    );
};
