import Paperboat from '../../public/Paperboat.svg'


const Loading = () => {
    return(
        <div className='loading-dock'>
            <div className="loading-icon-container">
                <div></div>
                <img className='loading-icon' src={Paperboat} alt="Paper Boat Icon Loader" />
                <div></div>
            </div>
            <div className='loading-text'>Loading dreams, paper boat sets sail...</div>
        </div>
    )
}

export default Loading