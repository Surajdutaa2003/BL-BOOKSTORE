import { useEffect, useState } from "react";
import { Trash2 } from 'lucide-react';
import { getWishlistItems, removeWishlist } from "../utils/API";
import { toast } from 'react-toastify';
import BookCover1 from '../assets/BookCover1.png';
import BookCover2 from '../assets/BookCover2.png';
import BookCover3 from '../assets/BookCover3.png';
import BookCover4 from '../assets/BookCover4.png';
import BookCover5 from '../assets/BookCover5.png';
import BookCover6 from '../assets/BookCover6.png';
import BookCover7 from '../assets/BookCover7.png';
import BookCover8 from '../assets/BookCover8.png';
import BookCover9 from '../assets/BookCover9.png';

interface WishlistItem {
    _id: string;
    product_id: {
        bookName: string;
        author: string;
        discountPrice: number;
        _id: string;
    } | null; // Allow null
}

function WishlistContainer() {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [wishlistedBooks, setWishlistedBooks] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const bookCovers = [
        BookCover1, BookCover2, BookCover3, BookCover4,
        BookCover5, BookCover6, BookCover7, BookCover8,
        BookCover9
    ];

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                setLoading(true);
                const response = await getWishlistItems();
                console.log("Fetched wishlist:", response.result);
                setWishlistedBooks(response.result?.reverse() || []);
            } catch (error) {
                console.error("Error fetching wishlist:", error);
                toast.success("Failed to load wishlist.");
                setWishlistedBooks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    const handleRemoveWishlist = async (bookId: string) => {
        console.log("Removing ProductID:", bookId);
        try {
            await removeWishlist(bookId);
            setWishlistedBooks((prevBooks) =>
                prevBooks.filter((book) => book.product_id?._id !== bookId)
            );
            toast.success("Item removed from wishlist!");
        } catch (error) {
            console.error("Error removing wishlist item:", error);
            toast.error("Failed to remove item from wishlist.");
        }
    };

    const validBooks = wishlistedBooks.filter(book => book.product_id != null);

    if (loading) {
        return (
            <div className="min-h-[93vh] !mt-[60px] w-[100%] flex flex-col items-center">
                <p>Loading wishlist...</p>
            </div>
        );
    }

    return (
        <div className="min-h-[93vh] !mt-[60px] w-[100%] flex flex-col items-center">
            <nav aria-label="breadcrumb" className="w-[68%] h-[75px] flex items-center max-md:w-[90%]">
                <ol className="flex w-full flex-wrap items-center rounded-md bg-slate-50 px-4 py-2">
                    <li className="flex gap-1 cursor-pointer items-center text-sm text-slate-500 transition-colors duration-300 hover:text-slate-800">
                        <a href="/">Home</a>
                        <span className="pointer-events-none mx-2 text-slate-800 !mr-1">/</span>
                    </li>
                    <li className="flex gap-1 text-black cursor-pointer items-center text-sm transition-colors duration-300 hover:text-slate-800">
                        <a href="/wishlist">My Wishlist</a>
                        <span className="pointer-events-none mx-2 text-slate-800">/</span>
                    </li>
                </ol>
            </nav>
            <div className="w-[68%] flex items-center border border-[#E4E4E4] max-md:w-[90%] !mb-[25px]">
                <div className="min-h-[55px] w-[100%] border border-gray-300 p-4 mx-auto">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full min-h-[55px] bg-[#F5F5F5] border border-[#E4E4E4] flex justify-between items-center text-lg font-semibold py-2 px-4"
                    >
                        <span className="!pl-[25px]">My Wishlist ({validBooks.length})</span>
                    </button>
                    {isOpen && (
                        <div className="w-[100%] h-[100%] flex flex-col gap-[25px] justify-center items-center transition">
                            {validBooks.length === 0 ? (
                                <p className="text-[18px] text-[#0A0102] !mt-[25px]">Your wishlist is empty.</p>
                            ) : (
                                validBooks.map((book, i) => (
                                    <>
                                        <div key={book._id} className="h-[95px] w-[95%] flex justify-between !mt-[25px] !mb-[20px] max-sm:h-[75px]">
                                            <div className="flex gap-[25px]">
                                                <div className="">
                                                    <img src={bookCovers[i % bookCovers.length]} className="w-[100%] h-[100%]" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <h2 className="text-[18px] text-[#0A0102] !mb-[3px] max-sm:text-[15px]">
                                                        {book.product_id!.bookName} {/* Non-null assertion */}
                                                    </h2>
                                                    <p className="text-[12px] text-[#9D9D9D] !mb-[10px] max-sm:text-[10px]">
                                                        By {book.product_id!.author}
                                                    </p>
                                                    <p className="text-[15px] text-[#0A0102] max-sm:text-[12px]">
                                                        Rs. {book.product_id!.discountPrice}
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                className="flex justify-center items-center !mr-[15px] cursor-pointer"
                                                onClick={() => handleRemoveWishlist(book.product_id!._id)} 
                                            >
                                                <Trash2 className="text-[grey] h-[25px] w-[25px] max-sm:h-[20px] max-sm:w-[20px]" />
                                            </div>
                                        </div>
                                        <div className="w-[100%] border border-[#E4E4E4]"></div>
                                    </>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WishlistContainer;