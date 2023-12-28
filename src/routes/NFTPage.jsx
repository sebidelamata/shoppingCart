import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NFTPage = () => {

    const location = useLocation()
    const [openSeaSingleNFTData, listing, collection] = location.state || {}

    console.log(collection)

    return(
        <div className="nft-page">
            <Link 
                className="back-link" 
                to={`/shop/collections/${openSeaSingleNFTData.nft.contract}`}
                state={collection.collection}
            >
                {`Back to ${collection.collection.name}`}
            </Link>
        </div>
    )
}

export default NFTPage