import bookImage from '../assets/book-image-large-2.png'
import { Dot } from 'lucide-react';

function MyOrderContainer() {
    return (
        <div className="min-h-[93vh] !mt-[60px] !mb-[50px] w-full flex flex-col items-center">
            <nav aria-label="breadcrumb" className="w-[68%] h-[75px] flex items-center max-md:w-[90%]">
                <ol className="flex w-full flex-wrap items-center rounded-md bg-slate-50 px-4 py-2">
                    <li className="flex gap-1 cursor-pointer items-center text-sm text-slate-500 transition-colors duration-300 hover:text-slate-800">
                        <a href="/">Home</a>
                        <span className="pointer-events-none mx-2 text-slate-800">/</span>
                    </li>
                    <li className="flex gap-1 text-black cursor-pointer items-center text-sm transition-colors duration-300 hover:text-slate-800">
                        <a href="/bookpage">My Order</a>
                        <span className="pointer-events-none mx-2 text-slate-800">/</span>
                    </li>
                </ol>
            </nav>
            <div className="w-[68%] flex items-center max-md:w-[90%]">
                <div className="w-full p-4 mx-auto">
                    <div className="w-full flex flex-col justify-center items-center transition gap-5">
                        {[1, 2, 3, 4, 5, 5, 6].map((_, index) => (
                            <div key={index} className="w-full flex flex-wrap md:flex-nowrap justify-between items-center border border-[#E4E4E4] !mt-3 !p-4">
                                <div className="flex items-center gap-4 w-full md:w-2/3">
                                    <div className="flex justify-center items-center w-[80px] sm:w-[100px]">
                                        <img src={bookImage} className="w-full h-auto max-w-[80px] sm:max-w-[100px]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-lg sm:text-xl text-[#0A0102] mb-1">Don't Make Me Think</h2>
                                        <p className="text-sm text-[#9D9D9D] mb-2 sm:text-[14px]">By Steve Krug</p>
                                        <p className="text-[15px] text-[#0A0102] sm:text-lg font-semibold">Rs. 1500</p>
                                    </div>
                                </div>
                                <div className="flex items-center w-full md:w-1/3 mt-4 md:mt-0 justify-end md:justify-center">
                                    <Dot className="text-[#26A541] h-[25px] w-[25px]" />
                                    <p className="text-gray-600 text-sm sm:text-base ml-2">Order Placed on May 21</p>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyOrderContainer;
