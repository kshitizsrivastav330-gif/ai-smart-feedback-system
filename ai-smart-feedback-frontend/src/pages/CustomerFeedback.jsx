import { useState } from "react";
import { useParams } from "react-router-dom";
import {
    generateReview,
    saveFeedback
} from "../services/api";
import "./CustomerFeedback.css";

function CustomerFeedback() {
    const { restaurantId } = useParams();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [loadingAI, setLoadingAI] = useState(false);
    const [saving, setSaving] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleGenerateReview = async () => {
        if (rating === 0) {
            alert("Please select a rating.");
            return;
        }
        try {
            setLoadingAI(true);
            setEditMode(false);
            const response = await generateReview(rating);
            setReview(response.data[0]);
        } catch (error) {
            console.error(error);
            alert("Unable to generate AI review.");
        } finally {
            setLoadingAI(false);
        }
    };

    const handleSubmit = async () => {
        if (review.trim() === "") {
            alert("Generate an AI review first.");
            return;
        }
        try {
            setSaving(true);
            await saveFeedback({
                restaurantId: Number(restaurantId),
                rating,
                comment: review
            });
            setSubmitted(true);
        } catch (error) {
            console.error(error);
            alert("Unable to submit feedback.");
        } finally {
            setSaving(false);
        }
    };

    if (submitted) {
        return (
            <div className="feedback-page">
                <div className="feedback-card thank-you-card">
                    <div className="success-circle">
                        <span className="success-icon">✓</span>
                    </div>
                    <h1>Thank You!</h1>
                    <h3>Feedback Submitted Successfully</h3>
                    <p>
                        We appreciate your valuable feedback.
                        <br />
                        Hope to serve you again!
                    </p>
                    <div className="thank-stars">⭐⭐⭐⭐⭐</div>
                    <span className="powered-by">Powered by AI Smart Feedback</span>
                </div>
            </div>
        );
    }

    return (
        <div className="feedback-page">
            <div className="feedback-card">
                <h1>AI Smart Feedback</h1>
                <p>How was your experience today?</p>

                <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className={rating >= star ? "star-btn active" : "star-btn"}
                            onClick={() => setRating(star)}
                        >
                            ★
                        </button>
                    ))}
                </div>

                <div className="rating-box">
                    <div className="rating-number">
                        {rating === 0 ? "-- / 5" : `${rating} / 5`}
                    </div>
                    <div className="rating-status">
                        {rating === 0
                            ? "Select Your Rating"
                            : rating === 1
                                ? "😞 Poor Experience"
                                : rating === 2
                                    ? "🙂 Fair Experience"
                                    : rating === 3
                                        ? "😊 Good Experience"
                                        : rating === 4
                                            ? "😍 Very Good Experience"
                                            : "🤩 Excellent Experience"}
                    </div>
                </div>

                <button
                    className="generate-btn"
                    onClick={handleGenerateReview}
                    disabled={loadingAI}
                >
                    {loadingAI ? "Generating AI Review..." : "🤖 Generate AI Review"}
                </button>

                {review && (
                    <div className="review-box">
                        <div className="review-header">
                            <h4>🤖 AI Generated Review</h4>
                            <span className="ai-badge">AI</span>
                        </div>

                        {editMode ? (
                            <textarea
                                rows="5"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                        ) : (
                            <div className="ai-review-card">{review}</div>
                        )}

                        <div className="review-actions">
                            <button className="edit-btn" onClick={() => setEditMode(!editMode)}>
                                {editMode ? "💾 Done Editing" : "✏️ Edit Review"}
                            </button>

                            <button
                                className="again-btn"
                                onClick={handleGenerateReview}
                                disabled={loadingAI}
                            >
                                {loadingAI ? (
                                    <span className="loading-content">
                                        <span className="loader"></span>
                                        Generating...
                                    </span>
                                ) : (
                                    "🤖 Regenerate"
                                )}
                            </button>
                        </div>

                        <button className="submit-btn" onClick={handleSubmit} disabled={saving}>
                            {saving ? "Submitting..." : "✅ Submit Feedback"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CustomerFeedback;