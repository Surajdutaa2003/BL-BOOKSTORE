import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCartItems } from '../utils/API';
import { toast } from 'react-toastify';
import { fetchCartItems } from '../redux/cartSlice';
import type { AppDispatch } from '../redux/store';

interface CartCounterProps {
    data: { bookId: string | undefined; bookInCartQuantity: number };
}

function CartCounter({ data }: CartCounterProps) {
    const { bookId, bookInCartQuantity } = data;
    console.log("BOOKID: ", bookId);
    console.log("Quantity: ", bookInCartQuantity);
    const [count, setCount] = useState<number>(bookInCartQuantity);
    const dispatch = useDispatch<AppDispatch>();

    const handleIncrease = async () => {
        const updatedQuantity = count + 1;
        try {
            const Resposne = await updateCartItems(bookId, updatedQuantity);
            toast.success("Quantity Increased Successfully! ✅");
            console.log("RESPOSE: ", Resposne);
            setCount(updatedQuantity);
            dispatch(fetchCartItems());
        } catch (err) {
            console.error("Failed to increase quantity", err);
            toast.error("Failed to update quantity! ❌");
        }
    };

    const handleDecrease = async () => {
        if (count > 1) {
            const updatedQuantity = count - 1;
            try {
                await updateCartItems(bookId, updatedQuantity);
                toast.success("Quantity Decreased Successfully! ✅");
                setCount(updatedQuantity);
                dispatch(fetchCartItems());
            } catch (err) {
                console.error("Failed to decrease quantity", err);
                toast.error("Failed to update quantity! ❌");
            }
        } else {
            toast.error("Quantity cannot be less than 1");
        }
    };

    return (
        <div className="flex justify-center items-center gap-3 mt-3">
            <button
                onClick={handleDecrease}
                className="cursor-pointer w-[25px] h-[25px] flex items-center justify-center rounded-full text-[15px] text-black text-lg font-bold border border-gray-400"
            >
                -
            </button>
            <div className="w-[40px] h-[25px] flex items-center justify-center text-[15px] border border-gray-400 bg-white text-lg font-semibold">
                {count}
            </div>
            <button
                onClick={handleIncrease}
                className="cursor-pointer w-[25px] h-[25px] flex items-center justify-center text-[15px] rounded-full text-black text-lg font-bold border border-gray-400"
            >
                +
            </button>
        </div>
    );
}

export default CartCounter;