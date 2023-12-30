import { useState, useEffect } from "react";

const OfferStopwatch = ({offerInfo, handleCountdownZero}) => {

    // console.log((offerInfo.protocol_data.parameters.endTime / 1000) - (Math.floor(Date.now()) / 1000))
    console.log(offerInfo.protocol_data.parameters.endTime)
    console.log(Math.floor(Date.now()))

    const calculateTimeRemaining = (offerInfo) => {
        let timeRemaining = ((offerInfo.protocol_data.parameters.endTime) - (Math.floor(Date.now()) / 1000))
        if(timeRemaining < 0){
            calculateTimeRemaining(offerInfo)
        }
        return timeRemaining
    }

    const [offerTimeLeft, setofferTimeLeft] = useState(calculateTimeRemaining(offerInfo))

    useEffect(() => {
        const key = setInterval(() => {
            setofferTimeLeft((count) => {
                if (count <= 0) {
                    handleCountdownZero()
                    clearInterval(key)
                    return calculateTimeRemaining(offerInfo);
                  }
                return count - 0.01
            })
          }, 10);
        return () => {
        clearInterval(key);
        };
    },[handleCountdownZero, calculateTimeRemaining])

    const days = Math.floor(offerTimeLeft / (60 * 60 * 24));
    const hours = Math.floor((offerTimeLeft % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((offerTimeLeft % (60 * 60)) / (60));
    const seconds = (offerTimeLeft % 60).toFixed(2);

    return(
        <div className="stopwatch">
            <div className="stopwatch-labels">
                <div className="stopwatch-days-label"><strong>Days</strong></div>
                <div className="stopwatch-hours-label"><strong>Hours</strong></div>
                <div className="stopwatch-minutes-label"><strong>Minutes</strong></div>
                <div className="stopwatch-seconds-label"><strong>Seconds</strong></div>
            </div>
            <div className="stopwatch-values">
                <div className="stopwatch-days-label">
                    {days}
                </div>
                <div className="stopwatch-hours">
                    {hours}
                </div>
                <div className="stopwatch-minutes">
                    {minutes}
                </div>
                <div className="stopwatch-seconds">
                    {seconds}
                </div>
            </div>
        </div>
    )

}

export default OfferStopwatch