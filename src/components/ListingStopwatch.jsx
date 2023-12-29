import { useState, useEffect } from "react";

const ListingStopwatch = ({listingInfo}) => {
    
    const timeRemaining = listingInfo.slice().reverse()[0].expiration_time - (Date.now() / 1000).toFixed(0)

    const [timeLeft, setTimeLeft] = useState(timeRemaining)

    useEffect(() => {
        const key = setInterval(() => {
            setTimeLeft(count => count - 1)
          }, 1000);
          return () => {
            clearInterval(key);
          };
    },[])

    return(
        <div>
            {timeLeft}
        </div>
    )

}

export default ListingStopwatch