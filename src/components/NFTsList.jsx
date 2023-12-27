import { useEffect, useState } from "react"
import PaginationRow from './PaginationRow'
import fetchCollectionSlug from '../scripts/fetchCollectionSlug.js'
import Loading from "./Loading.jsx"
import SingleNFTCard from "./SingleNFTCard.jsx"

const NFTsList = ({collection}) => {

    const NFTsListColllection = (collection) => {

        const [openSeaCollectionNFTs, setOpenSeaCollectionNFTs] = useState(null)
        
        const [OpenSeaCollectionNFTsError, setOpenSeaCollectionNFTsError] = useState(null)
        const [OpenSeaCollectionNFTsLoading, setOpenSeaCollectionNFTsLoading] = useState(true)

        //handle pagination
        const [currentpage, setCurrentPage] = useState(0)

        const fetchOpenSeaCollectionNFTs = async (collection) => {
            let slug = await fetchCollectionSlug(collection.collection.collectionId)

            let allNFTs = []; // To store all NFTs
            let nextPage = null; // To store the next page URL

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-api-key': import.meta.env.VITE_OPENSEA_API_KEY
                }
            }


            do{
                const url = nextPage ? `https://api.opensea.io/api/v2/collection/${slug}/nfts?limit=200&next=${nextPage}` : `https://api.opensea.io/api/v2/collection/${slug}/nfts?limit=200`
                try{
                    const response = await fetch(url, options);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    
                    const data = await response.json();
                    allNFTs = allNFTs.concat(await data.nfts);
                    nextPage = await data.next;
                } catch(error){
                    setOpenSeaCollectionNFTsError(error.message)
                } finally {
                    setOpenSeaCollectionNFTs(allNFTs)
                    setOpenSeaCollectionNFTsLoading(false)
                }
            } while (nextPage)

        }

        //separate useEffect for the looped fetch
        useEffect(() => {
            const handleFetches = async () => {
                try {
                    await fetchOpenSeaCollectionNFTs(collection);
                } catch (error) {
                    setOpenSeaCollectionNFTsError(error);
                } finally {
                    setOpenSeaCollectionNFTsLoading(false);
                }
            };
        
            handleFetches();
        }, []);

        return {
            openSeaCollectionNFTs,
            OpenSeaCollectionNFTsError,
            OpenSeaCollectionNFTsLoading,
            currentpage, 
            setCurrentPage
        }

    }

    const {
        openSeaCollectionNFTs,
        OpenSeaCollectionNFTsError,
        OpenSeaCollectionNFTsLoading,
        currentpage, 
        setCurrentPage
    } = NFTsListColllection(collection)

    if(OpenSeaCollectionNFTsError) return <p>A network error was encountered</p>
    if(OpenSeaCollectionNFTsLoading) return <Loading/>

    let startCollectionIndex = (10 * currentpage)
    let endCollectionIndex = (10 * currentpage) + 9

    return(
        <ul className='nfts-list'>
            {
                !openSeaCollectionNFTs &&
                <Loading/>
            }
            {
                openSeaCollectionNFTs &&
                (
                    <>
                        <div className="nft-cards-list">
                            {
                                openSeaCollectionNFTs.slice(startCollectionIndex, endCollectionIndex).map((nft) => {
                                    return (
                                                <>
                                                <li key={nft.identifier} className='nfts-list-item'>
                                                    <SingleNFTCard nft={nft}/>
                                                </li>
                                                </>
                                    )
                                })
                            }
                        </div>
                        <PaginationRow allCollectionsURL={collection} currentpage={currentpage} setCurrentPage={setCurrentPage}/>
                    </>
                )
            }
        </ul>
    )


}

export default NFTsList