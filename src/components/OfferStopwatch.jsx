import { useState, useEffect } from "react";

const OfferStopwatch = ({offerInfo, handleCountdownZero}) => {

    const calculateTimeRemaining = (offerInfo) => {
        let timeRemaining = ((offerInfo.protocol_data.parameters.endTime) - (Math.floor(Date.now()) / 1000))
        if(timeRemaining < 0){
            setInterval(() => {}, 100)
            timeRemaining = ((offerInfo.protocol_data.parameters.endTime) - (Math.floor(Date.now()) / 1000))
        }
        return timeRemaining
    }

    const [offerTimeLeft, setOfferTimeLeft] = useState(calculateTimeRemaining(offerInfo))

    useEffect(() => {
        const updateOfferTimeLeft = () => {
            setOfferTimeLeft(calculateTimeRemaining(offerInfo));
          };
        const key = setInterval(() => {
            setOfferTimeLeft((count) => {
                if (count <= 0) {
                    handleCountdownZero()
                    clearInterval(key)
                    clearInterval(minuteRun)
                    return calculateTimeRemaining(offerInfo);
                  }
                return count - 0.01
            })
          }, 10);

        const minuteRun = setInterval(() => {
            handleCountdownZero()
            updateOfferTimeLeft()
        }, 60000)

        return () => {
        clearInterval(key);
        clearInterval(minuteRun)
        };
    },[handleCountdownZero, offerInfo])

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