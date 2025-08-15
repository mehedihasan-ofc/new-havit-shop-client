import { Link } from 'react-router-dom';
import ErrorImg from '../../../assets/static/error.png';

const Error = () => {

    return (
        <section className='flex items-center p-16 text-gray-900'>
            <div className='container flex flex-col items-center justify-center px-5 mx-auto'>
                <div className='w-full md:w-64'>
                    <img src={ErrorImg} alt="Error" />
                </div>
                <div className='text-center'>
                    <h1 className='text-xl font-semibold font-ubuntu md:text-2xl mb-4 font-serif'>Oops! Something went wrong.</h1>
                    <p className="text-gray-600 mb-6">The page you are looking for may have been moved or does not exist.</p>
                    <Link to='/' className="border px-10 py-2 hover:bg-primary hover:text-white transition duration-300 ease-in-out">Back to homepage</Link>
                </div>
            </div>
        </section>
    );
};

export default Error;