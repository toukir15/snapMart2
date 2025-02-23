 const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
       const handleRatingClick = (value: number) => {
        setRating(value);
        setValue("rating", value);
    };
 
 <div className="w-1/2">
                                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                                    Ratings
                                </label>
                                <div className="flex mt-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            className="focus:outline-none"
                                            onClick={() => handleRatingClick(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                        >
                                            {star <= (hoverRating || rating) ? (
                                                <AiFillStar className="text-[26px] text-orange-500" />
                                            ) : (
                                                <AiOutlineStar className="text-[26px] text-gray-600" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                                {ratingError && (
                                    <p className="text-sm text-red-500 mt-1">Rating is required</p>
                                )}
                            </div>