import { useState, useEffect } from "react";

const ListingStopwatch = ({listingInfo, handleCountdownZero}) => {

    const loadPage = () => {
        const timeRemaining = ((listingInfo.slice().reverse()[0].expiration_time * 100) - Math.floor(Date.now() / 10)) / 100
        const [timeLeft, setTimeLeft] = useState(timeRemaining)

        useEffect(() => {
            const key = setInterval(() => {
                setTimeLeft((count) => {
                    if (count <= 0) {
                        handleCountdownZero()
                        clearInterval(key)
                        return timeRemaining;
                      }
                    return count - 0.01
                })
              }, 10);
            return () => {
            clearInterval(key);
            };
        },[])

        return{timeLeft}
    }

    const{timeLeft} = loadPage()
    const days = Math.floor(timeLeft / (60 * 60 * 24));
    const hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / (60));
    const seconds = (timeLeft % 60).toFixed(2);

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

export default ListingStopwatch