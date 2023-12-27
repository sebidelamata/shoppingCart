import { useState, useEffect } from "react"
import Loading from "./Loading"

const SingleNFTCard = ({nft}) => {
    console.log(nft)
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
              console.log(response)
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
    console.log(openSeaSingleNFTData)

    //fetch function here
    return(
        <div className="single-nft-card">
            <strong>{`#${nft.name}`}</strong>
            {
                nft &&
                nft.image_url &&
                (
                    <div className="nft-image-container">
                        <img className="nft-image" src={nft.image_url} alt={`nft ${nft.identifier} image`} />
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
        </div>
    )
}

export default SingleNFTCard