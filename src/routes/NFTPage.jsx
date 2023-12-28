import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import NFTPageOffers from "../components/NFTPageOffers";
import NFTPageListings from "../components/NFTPageListings";

const NFTPage = () => {

    const location = useLocation()
    const [openSeaSingleNFTData, collection] = location.state || {}

    console.log(openSeaSingleNFTData)

    return(
        <div className="nft-page-body">
            <Link 
                className="back-link" 
                to={`/shop/collections/${openSeaSingleNFTData.nft.contract}`}
                state={collection.collection}
            >
                <button>
                    {`Back to ${collection.collection.name}`}
                </button>
            </Link>
            <div className="image-and-info">
                {
                    openSeaSingleNFTData.nft &&
                    openSeaSingleNFTData.nft.image_url &&
                    <div className="nft-image-container">
                        <div className="nft-page-nft-name">
                            <strong>{openSeaSingleNFTData.nft.name || `${collection.collection.name} #${openSeaSingleNFTData.nft.identifier}`}</strong>
                        </div>
                        <img className="nft-page-nft-image" src={openSeaSingleNFTData.nft.image_url} alt="NFT Image" />
                    </div>
                }
            </div>
            <NFTPageListings openSeaSingleNFTData={openSeaSingleNFTData}/>
            <NFTPageOffers openSeaSingleNFTData={openSeaSingleNFTData}/>
        </div>
    )
}

export default NFTPage