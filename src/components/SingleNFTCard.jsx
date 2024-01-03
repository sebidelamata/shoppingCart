import { useState, useEffect } from "react"
import Loading from "./Loading"
import { Link, useLocation } from "react-router-dom"

const SingleNFTCard = ({nft, collection}) => {
    
    const OpenSeaSingleNFT = (nft) => {
        const [openSeaSingleNFTData, setOpenSeaSingleNFTData] = useState(null)
        const [error, setError] = useState(null)
        const [loading, setLoading] = useState(true)

        const fetchSingleNFTOpenSea = async (nft) => {

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-api-key': import.meta.env.VITE_OPENSEA_API_KEY
                }
            }

            const url = `https://api.opensea.io/api/v2/chain/ethereum/contract/${nft.contract}/nfts/${nft.identifier}`;
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
            fetchSingleNFTOpenSea(nft)
        }, [])
    
        return { openSeaSingleNFTData, error, loading}
    }

    const {openSeaSingleNFTData, error, loading} = OpenSeaSingleNFT(nft)

    if(error) return <p>A network error was encountered</p>
    if(loading) return <Loading/>
    
    const handlePageScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
    }

    //fetch function here
    return(
        nft.image_url &&
        <Link 
            to={`/shop/collections/${openSeaSingleNFTData.nft.contract}/${openSeaSingleNFTData.nft.identifier}`} 
            className="single-nft-card"
            state={[openSeaSingleNFTData, collection]}
            onClick={() => handlePageScroll()}
        >
            <strong>{nft.name}</strong>
            {
                nft &&
                nft.image_url &&
                (
                    <div className="nft-image-container">
                        <img className="nft-image" src={nft.image_url} alt={`nft ${nft.identifier} image`} loading="lazy"/>
                    </div>
                )
            }
            {
                openSeaSingleNFTData &&
                openSeaSingleNFTData.nft.owners &&
                (
                    <a className="owner" href={`https://etherscan.io/address/${openSeaSingleNFTData.nft.owners[0].address}`} target="_blank" rel="noreferrer">
                        <button><strong>Owner</strong></button>
                    </a>
                )
            }
        </Link>
    )
}

export default SingleNFTCard