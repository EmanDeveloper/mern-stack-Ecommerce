import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { handelStoreContext } from "../context/StoreContext";

function Review({ productId, allReview, redirectLogin, isLogin }) {

  const {url}=handelStoreContext()

  const [reviewData, setReviewData] = useState({
    review: "",
    rating: 2,
  });

  function handleReview(e) {
    const { name, value } = e.target;
    setReviewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function submitReview(e) {
    e.preventDefault();
    if (!isLogin) {
      redirectLogin(); // Redirect to login
      return;
    }

    // Validate review input
    if (!reviewData.review) {
      toast.error("Review is required");
      return;
    }

    try {
      await axios.post(
        `${url}/review/addReview/${productId}`,
        reviewData,
        { withCredentials: true }
      );
      toast.success("Thanku for your review");
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  }

  return (
    <div className="ml-16 mr-16">
      <div>
        <Toaster />
      </div>
      <h2 className="font-bold text-3xl text-center">Add Review</h2>
      <form onSubmit={submitReview} className="ml-16 mt-8">
        {/* Rating */}
        <div className="rating">
          {[1, 2, 3, 4, 5].map((num) => (
            <input
              key={num}
              type="radio"
              name="rating"
              value={num}
              className="mask mask-star-2 bg-orange-400"
              checked={reviewData.rating == num}
              onChange={handleReview}
            />
          ))}
        </div>
        <br />
        {/* Review Text */}
        <input
          type="text"
          placeholder="Review"
          name="review"
          value={reviewData.review}
          className="input focus:border-0 input-primary w-full max-w-xs mt-4"
          onChange={handleReview}
        />
        <br />
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg  shadow-lg transition duration-300 ease-in-out mt-4"
          onClick={redirectLogin}
        >
          Add
        </button>
      </form>

      <div className="divider divider-neutral"></div>
      <div className="flex w-full flex-col mb-4">
        <div className="card bg-base-300 rounded-box grid h-20 place-items-center font-bold text-3xl">
          All Review
        </div>

        <div className="flex flex-wrap">
  {allReview.map((el, i) => (
    <div key={i} className="border-2 border-black p-4 w-4/12 m-4 rounded-md ">
      <h2>{el.owner}</h2>
      <p >
        {Array.from({ length: el.rating }, (_, idx) => (
          <span key={idx} className="text-yellow-500">★</span>
        ))}
        {Array.from({ length: 5 - el.rating }, (_, idx) => (
          <span key={idx} className="text-gray-300">★</span>
        ))}
      </p>
      <p>{el.review}</p>
      <button className="btn btn-primary btn-sm mt-4">Delete</button>
    </div>
  ))}
</div>

      </div>
    </div>
  );
}

export default Review;
