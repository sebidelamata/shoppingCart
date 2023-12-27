import { useState, useEffect } from "react";
import NFTsList from "./NFTsList";

const NFTsListSwitcher = (collection) => {

    const [selectedButton, setSelectedButton] = useState('all')

    const handleAllNFTsClick = () => {
        if(selectedButton === 'listed'){
            setSelectedButton('all')
        }
    } 

    const handleListedNFTsClick = () => {
        if(selectedButton === 'all'){
            setSelectedButton('listed')
        }
    }

    return(
        <div  className="nft-list-and-switcher">
            <div className="nft-list-switcher">
                <button className="all-nfts-button" onClick={() => handleAllNFTsClick()} autoFocus>All NFTs</button>
                <button className="listed-nfts-button" onClick={() => handleListedNFTsClick()}>Listed NFTs</button>
            </div>
            {
                selectedButton === 'all' &&
                <div className="all-nfts-list-and-title">
                    <div className="all-nfts-title">All NFTs</div>
                    <NFTsList className='all-nfts-list' collection={collection}/>
                </div>
            }
            {
                selectedButton === 'listed' &&
                <div className="listed-nfts-list-and-title">
                    <div className="listed-nfts-title">Listed NFTs</div>
                </div>
            }
        </div>
    )
}

export default NFTsListSwitcher
