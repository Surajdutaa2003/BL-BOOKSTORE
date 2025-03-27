import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import educationImage from '../assets/education.svg';
import { User, ShoppingCart, Search, Wallet, Heart } from 'lucide-react';
import { setSearchQuery } from "../redux/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { totalCount } = useSelector(
        (state: RootState) => state.cart
    );

    return (
        <div className='h-[60px] w-[100%] bg-[#A03037] flex justify-center fixed z-50 overflow-visible'>
            <div className='h-[100%] w-[70%] max-w-7xl flex justify-between max-sm:w-[100%] max-lg:w-[90%] relative'>
                <NavLink to={'/'}>
                    <div className='h-[100%] w-[200px] flex items-center justify-center gap-5 max-sm:gap-2 cursor-pointer'>
                        <img src={educationImage} alt='Image Not Found' className='max-sm:h-[15px]' />
                        <p className='text-white text-[25px] max-sm:text-[18px]'>BookStore</p>
                    </div>
                </NavLink>

                <div className='h-[100%] w-[80%] flex max-md:justify-end'>
                    <div className='h-[100%] w-[75%] flex items-center max-md:hidden'>
                        <div className="w-[75%] h-[40px] flex items-center gap-2 rounded-[3px] bg-white border pl-[10px]">
                            <Search className="text-gray-500 w-4 h-4 !ml-4" />
                            <input
                                type="text"
                                placeholder="Search..."
                                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                                className="w-full bg-transparent outline-none px-2 placeholder-gray-400"
                            />
                        </div>
                    </div>
                    <div className='h-[100%] w-[25%] flex relative max-md:justify-end max-md:w-[500px] max-sm:w-[300px]'>
                        <div className='bg-[#A03037] h-[100%] w-[80px] text-white hidden max-md:flex justify-center items-center max-md:w-[75px] max-sm:w-[50px]'>
                            <Search className="w-[25px] h-[25px] max-md:w-[22px] max-md:h-[22px] max-sm:w-[18px] max-sm:h-[18px]" />
                        </div>
                        <div className='relative'>
                            <div
                                className='bg-[#A03037] h-[100%] w-[80px] flex flex-col justify-center items-center gap-1 text-white max-md:w-[75px] max-sm:w-[50px] cursor-pointer'
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <User className="w-[25px] h-[25px] max-md:w-[22px] max-md:h-[22px] max-sm:w-[18px] max-sm:h-[18px]" />
                                <p className="text-[10px] hidden md:block">Profile</p>
                            </div>
                            {
                                isDropdownOpen && (
                                    <div className="fixed top-[60px] left-[65%] !ml-[10px] max-w-[260px] !pr-[50px] !pl-[15px] !py-[15px] bg-white shadow-lg text-black flex flex-col z-[999] max-[768px]:left-[50%] max-[640px]:left-[45%] max-[450px]:left-[25%]">
                                        {
                                            (() => {
                                                const tokenData = JSON.parse(localStorage.getItem("token") || "{}");
                                                return tokenData.name ? (
                                                    <>
                                                        <p className="text-[#0A0102] text-[18px] !mb-[5px]">Welcome, {tokenData.name}</p>
                                                        <div className='flex gap-1 text-[#878787] items-center !mb-[5px] hover:bg-gray-100 cursor-pointer'>
                                                            <User className='h-[15px] w-[15px]' />
                                                            <NavLink to="/profile" className="px-3 py-2 text-[15px]">Profile</NavLink>
                                                        </div>
                                                        <div className='flex gap-1 text-[#878787] items-center !mb-[5px] hover:bg-gray-100 cursor-pointer'>
                                                            <Wallet className='h-[15px] w-[15px]' />
                                                            <NavLink to="/wishlist" className="px-3 py-2 text-[15px]">My Wishlist</NavLink>
                                                        </div>
                                                        <div className='flex gap-1 text-[#878787] items-center !mb-[5px] hover:bg-gray-100 cursor-pointer'>
                                                            <Heart className='h-[15px] w-[15px]' />
                                                            <NavLink to="/myorder" className="px-3 py-2 text-[15px]">My Orders</NavLink>
                                                        </div>
                                                        <NavLink to={'/login'}>
                                                            <button onClick={() => localStorage.removeItem("token")} className='w-[125px] h-[30px] text-[#A03037] border border-[#A03037] !mt-[10px] hover:cursor-pointer hover:bg-[#B03A42] hover:text-white duration-300'>
                                                                Logout
                                                            </button>
                                                        </NavLink>
                                                    </>
                                                ) : <>
                                                    <p className="text-[#0A0102] text-[18px]">Welcome, {tokenData.name}</p>
                                                    <p className="text-[#878787] text-[12px]">To access account and manage orders</p>
                                                    <NavLink to={'/login'}>
                                                        <button className='w-[125px] h-[30px] text-[#A03037] border border-[#A03037] !my-[10px] hover:cursor-pointer hover:bg-[#B03A42] hover:text-white duration-300'>
                                                            Login/Signup
                                                        </button>
                                                    </NavLink>
                                                    <div className='w-[90%] border border-[#878787] !mb-[10px] !mt-[5px]'></div>
                                                    <div className='flex gap-1 text-[#878787] items-center hover:bg-gray-100 cursor-pointer'>
                                                        <Wallet className='h-[15px] w-[15px]' />
                                                        <NavLink to="/pleaselogin" className="px-3 py-2 hover:bg-gray-100 text-[15px]">My Wishlist</NavLink>
                                                    </div>
                                                    <div className='flex gap-1 text-[#878787] items-center hover:bg-gray-100 cursor-pointer'>
                                                        <Heart className='h-[15px] w-[15px]' />
                                                        <NavLink to="/pleaselogin" className="px-3 py-2 hover:bg-gray-100 text-[15px]">My Orders</NavLink>
                                                    </div>
                                                </>
                                            })()
                                        }
                                    </div>
                                )
                            }

                        </div>
                        <NavLink to={'/mycart'}>
                            <div className='relative bg-[#A03037] h-[100%] w-[80px] flex flex-col justify-center items-center gap-1 text-white max-md:w-[75px] max-sm:w-[50px]'>
                                <ShoppingCart className="w-[25px] h-[25px] max-md:w-[22px] max-md:h-[22px] max-sm:w-[18px] max-sm:h-[18px]" />
                                <p className="text-[10px] hidden md:block">Cart</p>
                                <div
                                    className='absolute top-[7px] right-[20px] border rounded-full h-[18px] w-[18px] bg-white text-[red] text-[10px] flex items-center justify-center font-bold max-[768px]:top-[12px] max-[640px]:top-[12px] max-[640px]:right-[8px]'>
                                    {totalCount}
                                </div>
                            </div>

                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
