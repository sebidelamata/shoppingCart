import { useState, useEffect } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const SingleListedNFTCard = ({listing, collection}) => {

    const OpenSeaSingleNFT = (listing) => {
        const [openSeaSingleNFTData, setOpenSeaSingleNFTData] = useState(null)
        const [error, setError] = useState(null)
        const [loading, setLoading] = useState(true)

        const fetchSingleNFTOpenSea = async (listing) => {

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-api-key': import.meta.env.VITE_OPENSEA_API_KEY
                }
            }

            const url = `https://api.opensea.io/api/v2/chain/ethereum/contract/${listing.protocol_data.parameters.offer[0].token}/nfts/${listing.protocol_data.parameters.offer[0].identifierOrCriteria}`;
            try{
                const response = await fetch(url, options);
                  if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                  }
              
                  const data = await response.json();
                  setOpenSeaSingleNFTData(data);
            } catch(error){
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
    
        useEffect(() => {
            fetchSingleNFTOpenSea(listing)
        }, [])
    
        return { openSeaSingleNFTData, error, loading}
    }

    const {
        openSeaSingleNFTData, 
        error, 
        loading
    } = OpenSeaSingleNFT(listing)

    const handlePageScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
    }

    console.log(openSeaSingleNFTData)

    if(error) return <p>A network error was encountered</p>
    if(loading) return <Loading/>

    return(
        openSeaSingleNFTData &&
        listing.protocol_data.parameters &&
        <Link 
            to={`/shop/collections/${openSeaSingleNFTData.nft.contract}/${openSeaSingleNFTData.nft.identifier}`}
            className="single-nft-card"
            state={[openSeaSingleNFTData, collection]}
            onClick={() => handlePageScroll()}
        >
            <div className="single-listed-nft-card">
                <strong>{openSeaSingleNFTData.nft.name}</strong>
            </div>
            <div className="nft-list-nft-image-container">
                <img className="nft-image" src={openSeaSingleNFTData.nft.image_url} alt={`nft ${openSeaSingleNFTData.nft.identifier} image`} loading="lazy"/>
            </div>
            <div className="nft-card-offer">
                {`Offer: ${(listing.price.current.value / (10 ** listing.price.current.decimals)).toFixed(4)} ${listing.price.current.currency}`}
            </div>
        </Link>
    )
}

export default SingleListedNFTCard