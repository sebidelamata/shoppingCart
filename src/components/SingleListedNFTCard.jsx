import { useState, useEffect } from "react";

const SingleListedNFTCard = ({listing}) => {

    return(
        <div className="single-listed-nft-card">
            {listing.protocol_data.parameters.offer[0].identifierOrCriteria}
        </div>
    )
}

export default SingleListedNFTCard