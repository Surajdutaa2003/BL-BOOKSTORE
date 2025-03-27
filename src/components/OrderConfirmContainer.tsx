import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

function OrderConfirmContainer() {
    const { width, height } = useWindowSize();
    function getRandomSixDigit(): number {
        return Math.floor(Math.random() * 900000) + 100000;
    }

    const number = getRandomSixDigit()

    return (
        <div className='w-full min-h-[85vh] !mt-[60px] flex flex-col justify-center items-center gap-6 p-4'>
            <div className='flex flex-col justify-center items-center p-4 w-full max-w-md text-center max-[450px]:w-[90%]'>
                <h2 className='text-2xl font-semibold'>Order Placed Successfully!!!</h2>
                <img
                    src='https://png.pngtree.com/png-clipart/20240510/original/pngtree-confetti-cone-party-popper-celebration-cartoon-style-png-image_15053080.png'
                    className='h-36 mt-2'
                    alt="Confetti"
                />
                <Confetti width={width} height={height} />
                <p className='text-[#333232] text-lg mt-2'>
                    Hurray!!! Your order is confirmed. The order ID is <b>#{number}</b>. Save the order ID for further communication.
                </p>
            </div>
            <div className="p-4 w-full max-w-2xl max-[768px]:w-[90%]">
                <div className="hidden md:flex justify-center items-center text-center font-bold text-lg h-[42px] text-[#333232]">
                    <div className="w-[30%]">Email</div>
                    <div className="w-[30%]">Contact Us</div>
                    <div className="w-[40%]">Address</div>
                </div>
                <div className="hidden md:flex justify-center items-center text-center border-t border-gray-300 mt-2 !pt-2 text-[#333232]">
                    <div className="w-[30%]">john.doe@example.com</div>
                    <div className="w-[30%]">+123456789</div>
                    <div className="w-[40%]">
                        42, 14th Main, 15th Cross, Sector 4, opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034
                    </div>
                </div>
                <div className="md:hidden flex flex-col gap-2 border-t border-gray-300 mt-2 !pt-2">
                    <div className="flex justify-between">
                        <span className="font-bold w-[40%]">Email:</span>
                        <span className="w-[60%]">john.doe@example.com</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-bold w-[40%]">Contact Us:</span>
                        <span className="w-[60%]">+123456789</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-bold w-[40%]">Address:</span>
                        <span className="w-[60%]">
                            42, 14th Main, 15th Cross, Sector 4, opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034
                        </span>
                    </div>
                </div>
            </div>
            <button className='mb-12 text-white bg-[#3371B5] h-[35px] w-[200px] rounded-md hover:cursor-pointer hover:bg-[#78a1cc] transition-all'>
                Continue Shopping
            </button>
        </div>
    );
}

export default OrderConfirmContainer;
