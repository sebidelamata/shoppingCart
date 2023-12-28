import { useState, useEffect } from "react"
import fetchCollectionSlug from "../scripts/fetchCollectionSlug"
import Loading from "./Loading"
import PaginationRow from "./PaginationRow"
import SingleListedNFTCard from "./SingleListedNFTCard"


const ListedNFTsList = ({collection}) => {
    const ListedNFTsListColllection = (collection) => {

        const [listedOpenSeaCollectionNFTs, setListedOpenSeaCollectionNFTs] = useState(null)
        
        const [listedOpenSeaCollectionNFTsError, setListedOpenSeaCollectionNFTsError] = useState(null)
        const [listedOpenSeaCollectionNFTsLoading, setListedOpenSeaCollectionNFTsLoading] = useState(true)

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
                const url = nextPage ? `https://api.opensea.io/api/v2/listings/collection/${slug}/all?next=${nextPage}` : `https://api.opensea.io/api/v2/listings/collection/${slug}/all`
                try{
                    const response = await fetch(url, options);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    
                    const data = await response.json();
                    allNFTs = allNFTs.concat(await data.listings);
                    nextPage = await data.next;
                } catch(error){
                    setListedOpenSeaCollectionNFTsError(error.message)
                } finally {
                    setListedOpenSeaCollectionNFTs(allNFTs)
                    setListedOpenSeaCollectionNFTsLoading(false)
                }
            } while (nextPage)

        }

        //separate useEffect for the looped fetch
        useEffect(() => {
            const handleFetches = async () => {
                try {
                    await fetchOpenSeaCollectionNFTs(collection);
                } catch (error) {
                    listedOpenSeaCollectionNFTsError(error);
                } finally {
                    setListedOpenSeaCollectionNFTsLoading(false);
                }
            };
        
            handleFetches();
        }, []);

        return {
            listedOpenSeaCollectionNFTs,
            listedOpenSeaCollectionNFTsError,
            listedOpenSeaCollectionNFTsLoading,
            currentpage, 
            setCurrentPage
        }

    }

    const {
        listedOpenSeaCollectionNFTs,
        listedOpenSeaCollectionNFTsError,
        listedOpenSeaCollectionNFTsLoading,
        currentpage, 
        setCurrentPage
    } = ListedNFTsListColllection(collection)

    if(listedOpenSeaCollectionNFTsError) return <p>A network error was encountered</p>
    if(listedOpenSeaCollectionNFTsLoading) return <Loading/>

    console.log(listedOpenSeaCollectionNFTs)

    let startCollectionIndex = (10 * currentpage)
    let endCollectionIndex = (10 * currentpage) + 9

    return(
        <ul className='listed-nfts-list'>
            {
                !listedOpenSeaCollectionNFTs &&
                <Loading/>
            }
            {
                listedOpenSeaCollectionNFTs &&
                (
                    <>
                        <div className="listed-nft-cards-list">
                            {
                                listedOpenSeaCollectionNFTs.slice(startCollectionIndex, endCollectionIndex).map((listing) => {
                                    return (
                                                listing &&
                                                <li key={listing.order_hash} className='nfts-list-item'>
                                                    <SingleListedNFTCard listing={listing}/>
                                                </li>
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

export default ListedNFTsList