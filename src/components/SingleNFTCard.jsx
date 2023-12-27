const SingleNFTCard = ({nft}) => {
    console.log(nft)
    return(
        <div className="single-nft-card">
            {nft.identifier}
            {
                nft &&
                nft.image_url &&
                (
                    <div className="nft-image-container">
                        <img className="nft-image" src={nft.image_url} alt={`nft ${nft.identifier} image`} />
                    </div>
                )
            }
        </div>
    )
}

export default SingleNFTCard