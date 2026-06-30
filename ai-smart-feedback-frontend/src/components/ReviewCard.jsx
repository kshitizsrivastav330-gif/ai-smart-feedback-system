import "../pages/Dashboard.css";

function ReviewCard({ review, index }) {

    return (

        <div className="review-card">

            <div className="review-header">

                <h3>
                    Review #{index + 1}
                </h3>

                <span>
                    {"⭐".repeat(review.rating)}
                </span>

            </div>

            <p className="review-text">
                {review.comment}
            </p>

            <small>
                📅 {review.createdAt}
            </small>

        </div>

    );

}

export default ReviewCard;