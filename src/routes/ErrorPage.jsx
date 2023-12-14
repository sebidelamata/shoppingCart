import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const ErrorPage = () => {
    return(
        <div className='error-page'>
            <Navbar />
            <h1>Oops, we couldn&apos;t find the page you&apos;re looking for!</h1>
            <Link to='/'>
                You can go back to the home page by clicking here!
            </Link>
        </div>
    )
}

export default ErrorPage