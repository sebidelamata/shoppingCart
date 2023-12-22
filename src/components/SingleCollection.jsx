import { useState, useEffect } from 'react'
import PaginationRow from './PaginationRow'
import { useLocation } from 'react-router-dom'

const SingleCollection = () => {

    const location = useLocation()
    const collection = location.state || {}

    return(
        <div>
            {collection.name}
        </div>
    )

}

export default SingleCollection