import { useState, useEffect } from "react";

const ListingStopwatch = ({listingInfo}) => {

    const loadPage = () => {
        const timeRemaining = ((listingInfo.slice().reverse()[0].expiration_time * 100) - Math.floor(Date.now() / 10)) / 100
        console.log(timeRemaining)
        const [timeLeft, setTimeLeft] = useState(timeRemaining)

        useEffect(() => {
            const key = setInterval(() => {
                setTimeLeft(count => count - 0.01)
              }, 10);
            return () => {
            clearInterval(key);
            };
        },[])

        return{timeLeft}
    }

    const{timeLeft} = loadPage()

    return(
        <div>
            {timeLeft.toFixed(2)}
        </div>
    )

}

export default ListingStopwatch