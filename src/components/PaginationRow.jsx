import { useState } from "react";

const PaginationRow = ({allCollectionsURL, currentpage, setCurrentPage}) => {
    const numPages = Math.ceil(allCollectionsURL.length / 10)

    const handlePaginationPageClick = (e) => {
        let value = e.target.textContent - 1
        setCurrentPage(value)
        
    }
    const handlePaginationLeftArrowClick = () => {
        let value = currentpage - 1
        if(value < 0){
            value = 0
        }
        setCurrentPage(value)
    }
    const handlePaginationRightArrowClick = () => {
        let value = currentpage + 1
        if(value > numPages - 1){
            value = numPages -1
        }
        setCurrentPage(value)
    }
    const handlePaginationStartClick = () => {
        setCurrentPage(0)
    }
    const handlePaginationEndClick = () => {
        setCurrentPage(numPages - 1)
    }
    const highlightCurrentPage = (page) => {
        if(page == currentpage + 1){
            return 'bold'
        }
    }

    let paginationArray = Array.from({ length: 5}, (_, index) => {
        let out = currentpage + index + 1
        if(out > (numPages - 4)){
            out = (numPages - 4) + index
        }
        return out
    })
    let startCollectionIndex = (25 * currentpage)
    let endCollectionIndex = (25 * currentpage) + 24
    if(endCollectionIndex > allCollectionsURL.length){
        endCollectionIndex = allCollectionsURL.length
    }
    return(
        <div className='pagination-row'>
            <div className='pagination-row-start' onClick={() => handlePaginationStartClick()}>
                Start
            </div>
            <div className='pagination-row-left-arrow' onClick={() => handlePaginationLeftArrowClick()}>
                <strong>
                    &#10594;
                </strong>
            </div>
            <div className='pagination-div'>
                <ul className='pagination-numbers-list'>
                    {
                        paginationArray.map((page) => {
                            return (
                                <li key={page} className='pagination-list-page' onClick={(e) => handlePaginationPageClick(e)} style={{fontWeight: highlightCurrentPage(page)}}>
                                    {page}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className='pagination-row-right-arrow' onClick={() => handlePaginationRightArrowClick()}>
                <strong>
                    &#10596;
                </strong>
            </div>
            <div className='pagination-row-end' onClick={() => handlePaginationEndClick()}>
                End
            </div>
        </div>
    )
}

export default PaginationRow