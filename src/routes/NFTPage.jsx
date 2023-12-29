import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import NFTPageOffers from "../components/NFTPageOffers";
import NFTPageListings from "../components/NFTPageListings";

const NFTPage = () => {

    const location = useLocation()
    const [openSeaSingleNFTData, collection] = location.state || {}
    const [showTraits, setShowTraits] = useState(false)

    const handleTraitsClick = () => {
        setShowTraits(!showTraits)
    }

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
                        {
                            openSeaSingleNFTData &&
                            openSeaSingleNFTData.nft.owners &&
                            (
                                <a className="owner" href={`https://etherscan.io/address/${openSeaSingleNFTData.nft.owners[0].address}`} target="_blank" rel="noreferrer">
                                    <button><strong>Owner</strong></button>
                                </a>
                            )
                        }
                    </div>
                }
                <div className="traits-container" onClick={() => handleTraitsClick()}>
                    <div className="traits-title">
                        <strong>Traits</strong>
                    </div>
                    {   
                        showTraits === true &&
                        <ul className="traits-list">
                            {
                                openSeaSingleNFTData.nft.traits.map((trait) => {
                                    return(
                                        <li key={trait.trait_type} className="trait-card">
                                            <div className="trait-title">
                                                <strong>{trait.trait_type}</strong>
                                            </div>
                                            {
                                                trait.value &&
                                                <div className="trait-value">
                                                    {trait.value}
                                                </div>
                                            }
                                            {
                                                trait.trait_count &&
                                                <div className="trait-count">
                                                    {((trait.trait_count / collection.collection.totalSupply) * 100).toFixed(2)}%
                                                </div>
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    }
                </div>
            </div>
            <NFTPageListings openSeaSingleNFTData={openSeaSingleNFTData}/>
            <NFTPageOffers openSeaSingleNFTData={openSeaSingleNFTData}/>
        </div>
    )
}

export default NFTPage