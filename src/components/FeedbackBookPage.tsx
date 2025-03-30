import { useEffect, useState } from 'react'
import { Star } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { addBookReviews, getBookReviews } from '../utils/API';

function FeedbackBookPage() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewComment, setReviewComment] = useState("");
    const [reviews, setReviews] = useState<ResponseType["result"]>([]);
    const { bookId } = useParams();

    interface User {
        _id: string;
        fullName: string;
    }

    interface Review {
        approveComment: boolean;
        _id: string;
        user_id: User;
        product_id: string;
        comment: string;
        rating: number;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }

    interface ResponseType {
        success: string;
        message: string;
        result: Review[];
    }

    const getInitials = (fullName: string) => {
        return fullName
            ? fullName
                .split(" ")
                .map(name => name[0])
                .join("")
                .toUpperCase()
            : JSON.parse(localStorage.getItem("token") || "null").name.slice(0, 1);
    };


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                if (!bookId) return;

                const response: ResponseType = await getBookReviews(bookId);
                setReviews(response.result.reverse());
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [bookId]);

    const handleReviewSubmit = async () => {
        try {
            const response = await addBookReviews(reviewComment, rating, bookId) as { result: Review };
            setReviews((prev) => [response.result, ...prev]);

            setReviewComment("");
            setRating(0);
        }
        catch (error) {
            console.error("Error Adding reviews:", error);
        }
    }
    return (
        <>
            <div className='w-[100%] !mt-[35px] p-4 rounded-lg'>
                <h2 className="text-lg font-semibold">Customer Feedback</h2>
                <div className="!mt-4 !ml-3 flex flex-col gap-1">
                    <p className="text-gray-700 font-medium">Write Your Review</p>
                    <div className='bg-[#F5F5F5] !p-[10px] '>
                        <div className="!mt-3 !ml-3 flex flex-col gap-2">
                            <p className="text-gray-700 font-medium">Overall Rating</p>
                            <div className="flex gap-2 mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        role='img'
                                        aria-label={`star ${star}`}
                                        className={`w-5 h-5 cursor-pointer transition ${(hover || rating) >= star ? "fill-yellow-500 stroke-yellow-500" : "stroke-gray-400"
                                            }`}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                        onClick={() => setRating(star)}
                                    />
                                ))}
                            </div>
                        </div>
                        <textarea
                            className="w-full !mt-1 !mb-5 !p-4 outline-none h-[80%]"
                            rows={4}
                            placeholder="Write Your Review..."
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                        />
                        <div className='flex justify-end !pr-2 h-[20%]'>
                            <button onClick={handleReviewSubmit} className="bg-[#3371B5] cursor-pointer text-white w-[75px] h-[24%] rounded-[1px] hover:bg-[#2A5C94] transition">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-4 !mt-[50px]">
                <h2 className="text-lg font-semibold">User Reviews</h2>
                {reviews.map((user, index) => (
                    <div
                        key={index}
                        className="p-4 flex gap-4 flex-wrap !mb-[10px]"
                    >
                        <div className='flex items-center w-[100%] h-[50px] shrink-0 gap-[10px]'>
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 font-bold text-lg">
                                {getInitials(user.user_id.fullName)}
                            </div>
                            <div className='flex flex-col'>
                                <p className="font-medium text-gray-800">{user.user_id.fullName}</p>
                                <div className="flex gap-1 mt-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-5 h-5 ${user.rating >= star ? "fill-yellow-500 stroke-yellow-500" : "stroke-gray-400"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col min-w-0 !ml-[60px]">
                            <p className="mt-2 text-gray-700 break-words">{user.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default FeedbackBookPage
