import { NavLink } from 'react-router-dom';
import pleaseLoginImage from '../assets/please-login-image.svg';
import Navbar from '../components/Navbar';

function PleaseLoginPage() {
    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center h-[100vh] w-[100%]">
                <div className="w-[275px] flex flex-col items-center justify-center">
                    <p className="text-[25px]">Please Login</p>
                    <p className="text-[#9D9D9D] text-[15px]">Login to view items in your wishlist</p>
                    <img className="h-[75px] w-[65px] !my-[25px]" src={pleaseLoginImage}   alt="Please Login"
                    />
                    <NavLink to={'/login'}>
                        <button className='border border-[#A03037] w-[130px] h-[35px] text-[#A03037] text-[12px] cursor-pointer hover:bg-[#A03037] hover:text-white transition-all duration-300'>Login/Signup</button>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default PleaseLoginPage
