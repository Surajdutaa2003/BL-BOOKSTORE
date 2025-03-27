import { useState } from 'react';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import BookCover1 from '../assets/BookCover1.png';
import BookCover2 from '../assets/BookCover2.png';
import BookCover3 from '../assets/BookCover3.png';
import BookCover4 from '../assets/BookCover4.png';
import BookCover5 from '../assets/BookCover5.png';
import BookCover6 from '../assets/BookCover6.png';
import BookCover7 from '../assets/BookCover7.png';
import BookCover8 from '../assets/BookCover8.png';
import BookCover9 from '../assets/BookCover9.png';
import { addOrder } from '../utils/API';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function OrderSummary() {
    const navigate = useNavigate();
    const { items } = useSelector(
        (state: RootState) => state.cart
    );
    console.log("Items in Order: ", items);

    const orderItems = items.map((book) => ({
        product_id: book.product_id._id,
        product_name: book.product_id.bookName,
        product_quantity: Number(book.quantityToBuy),
        product_price: Number(book.product_id.discountPrice),
    }));

    const handleSubmit = async () => {
        try {
            const status = await addOrder(orderItems);
            if (status === 200 || status === 201) {
                toast.success("Order placed successfully!");
                navigate("/orderconfirm")
                console.log("Order created successfully with status: ", status);
            }
        } catch (error) {
            toast.error("Failed to place order");
            console.error("Order submission failed: ", error);
        }
    };

    const [isAccordionOpen, setIsAccordionOpen] = useState(true);

    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    const bookCovers = [
        BookCover1, BookCover2, BookCover3, BookCover4,
        BookCover5, BookCover6, BookCover7, BookCover8,
        BookCover9
    ];

    const calculateTotal = () => {
        return items.reduce((total, item) => total + (item.product_id.discountPrice*item.quantityToBuy), 0);
    };

    return (
        <div className="!mb-[100px] flex flex-col items-center px-4">
            <div className="w-[68%] mt-[60px] max-[1020px]:w-[90%] max-md:w-[90%]">
                <div className="border border-[#acabab] w-full max-w-[775px] flex flex-col">
                    <div
                        className="!py-[15px] w-full flex justify-between items-center max-[550px]:!mt-[0px] max-[550px]:gap-[15px] max-[550px]:!px-[10px] cursor-pointer border-b border-[#DCDCDC]"
                        onClick={toggleAccordion}
                    >
                        <p className="text-[18px] !ml-[15px]">Order Summary</p>
                    </div>

                    {isAccordionOpen && (
                        <div className="!pl-[15px] min-h-[250px] max-[550px]:!ml-[0px] md:min-h-[250px] w-full max-w-[775px] flex flex-col p-4 max-[550px]:h-auto">
                            <div className="!py-[15px] w-full flex flex-col max-[550px]:!mt-[0px] max-[550px]:gap-[15px] max-[550px]:!px-[10px] cursor-pointer gap-y-4">
                                <div>
                                    {items.map((book, index) => (
                                        <div
                                            key={index}
                                            className="flex w-[100%] gap-[35px] max-[550px]:!mt-[10px] max-[550px]:items-start max-[550px]:justify-start max-[550px]:!px-[10px] !mb-[25px]"
                                        >
                                            <img
                                                src={bookCovers[index % bookCovers.length]}
                                                className="h-[85px] w-[65px] max-[425px]:h-[70px] max-[425px]:w-[55px] max-[550px]:!mt-[5px]"
                                                alt="Book Cover"
                                            />
                                            <div className="w-full md:w-[75%] flex flex-col max-[550px]:justify-start">
                                                <h2 className="text-[18px] text-[#0A0102] !mb-[3px] max-sm:text-[15px]">
                                                    {book.product_id.bookName}
                                                </h2>
                                                <p className="text-[12px] text-[#9D9D9D] !mb-[10px] max-sm:text-[10px]">
                                                    By {book.product_id.author}
                                                </p>
                                                <p className="text-[15px] text-[#0A0102] max-sm:text-[12px]">
                                                    Rs. {book.product_id.discountPrice} x {book.quantityToBuy} = {book.product_id.discountPrice*book.quantityToBuy}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {items.length > 0 && (
                                    <div className="w-[95%] border-t border-[#DCDCDC] !pt-[15px] !mt-[10px]">
                                        <div className="flex justify-between items-center !mb-[15px]">
                                            <p className="text-[16px]">Total</p>
                                            <p className="text-[16px] text-[#0A0102]">Rs. {calculateTotal()}</p>
                                        </div>

                                        <div className="flex justify-end w-[98%] !mb-[20px]">
                                            <button
                                                onClick={handleSubmit}
                                                className="bg-[#3371B5] text-white text-[15px] !px-[30px] !py-[7px] rounded-[3px] cursor-pointer"
                                            >
                                                CHECKOUT
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {items.length === 0 && (
                                    <div className="flex flex-col items-center justify-center !py-[20px]">
                                        <p className="text-[16px] text-[#9D9D9D]">Your cart is empty</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OrderSummary;