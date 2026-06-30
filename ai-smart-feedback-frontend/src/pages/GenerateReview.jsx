import { useState } from "react";
import { generateReview } from "../services/api";
import { Link } from "react-router-dom";
import "./Login.css";

function GenerateReview() {

    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);

    const generate = async () => {

        try {

            setLoading(true);

            const response = await generateReview(rating);

            setReview(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to generate review.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-container">

            <div
                className="login-card"
                style={{ maxWidth: "700px" }}
            >

                <h1>🤖 Generate AI Review</h1>

                <p>
                    Select a rating and generate an AI-powered customer review.
                </p>

                <label
                    style={{
                        fontWeight: "bold",
                        display: "block",
                        marginBottom: "10px"
                    }}
                >
                    Rating
                </label>

                <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "15px",
                        borderRadius: "10px",
                        marginBottom: "20px"
                    }}
                >
                    <option value="5">⭐⭐⭐⭐⭐ (5 Star)</option>
                    <option value="4">⭐⭐⭐⭐ (4 Star)</option>
                    <option value="3">⭐⭐⭐ (3 Star)</option>
                    <option value="2">⭐⭐ (2 Star)</option>
                    <option value="1">⭐ (1 Star)</option>
                </select>

                <button onClick={generate}>
                    {loading ? "Generating..." : "Generate Review"}
                </button>

                {
                    review && (

                        <div
                            style={{
                                marginTop: "30px",
                                background: "#f8fafc",
                                padding: "20px",
                                borderRadius: "12px",
                                border: "1px solid #ddd"
                            }}
                        >

                            <h3>🤖 AI Generated Review</h3>

                            <p
                                style={{
                                    lineHeight: "1.8",
                                    marginTop: "10px"
                                }}
                            >
                                {review}
                            </p>

                        </div>

                    )
                }

                <br />

                <Link to="/">
                    <button className="home-btn">
                        🏠 Back to Home
                    </button>
                </Link>

            </div>

        </div>

    );

}

export default GenerateReview;