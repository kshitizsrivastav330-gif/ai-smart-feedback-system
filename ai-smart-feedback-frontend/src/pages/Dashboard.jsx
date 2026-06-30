import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getDashboard,
    getReviewsByRating
} from "../services/api";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import ReviewCard from "../components/ReviewCard";
import RatingBar from "../components/RatingBar";

import ReviewBarChart from "../components/charts/ReviewBarChart";
import RatingPieChart from "../components/charts/RatingPieChart";

import {
    FaComments,
    FaStar,
    FaSmile,
    FaChartLine
} from "react-icons/fa";

import "./Dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState({
        totalReviews: 0,
        fiveStar: 0,
        fourStar: 0,
        threeStar: 0,
        twoStar: 0,
        oneStar: 0
    });

    const [reviews, setReviews] = useState([]);
    const [selectedRating, setSelectedRating] = useState(5);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        loadDashboard();
        loadReviews(5);

    }, [navigate]);

    const loadDashboard = async () => {

        try {

            const response = await getDashboard();

            setDashboard(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const loadReviews = async (rating) => {

        try {

            const response = await getReviewsByRating(rating);

            setReviews(response.data);

            setSelectedRating(rating);

        } catch (error) {

            console.log(error);

        }

    };

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };

    const averageRating =
        dashboard.totalReviews === 0
            ? 0
            : (
            dashboard.fiveStar * 5 +
            dashboard.fourStar * 4 +
            dashboard.threeStar * 3 +
            dashboard.twoStar * 2 +
            dashboard.oneStar
        ) / dashboard.totalReviews;

    const positiveReviews =
        dashboard.fiveStar + dashboard.fourStar;

    const negativeReviews =
        dashboard.oneStar + dashboard.twoStar;

    const maxRating = Math.max(
        dashboard.fiveStar,
        dashboard.fourStar,
        dashboard.threeStar,
        dashboard.twoStar,
        dashboard.oneStar
    );

    return (<>
            <Navbar />

            <div
                style={{
                    width: "90%",
                    maxWidth: "1200px",
                    margin: "20px auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <div>

                    <h2
                        style={{
                            margin: 0,
                            fontSize: "32px",
                            fontWeight: "700"
                        }}
                    >
                        AI Smart Feedback
                    </h2>

                    <p
                        style={{
                            marginTop: "8px",
                            color: "#6b7280"
                        }}
                    >
                        Restaurant Analytics Dashboard
                    </p>

                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "12px"
                    }}
                >

                    <button
                        onClick={() => navigate("/qr")}
                        style={{
                            background: "#2563eb",
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        📱 Restaurant QR
                    </button>

                    <button
                        onClick={logout}
                        style={{
                            background: "#ef4444",
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        Logout
                    </button>

                </div>

            </div>

            <div className="dashboard">

                <h1 className="title">
                    AI Smart Feedback Dashboard
                </h1>

                <p className="subtitle">
                    Monitor customer feedback, ratings and AI-powered insights in one place.
                </p>

                <div className="cards">

                    <StatCard
                        title="Total Reviews"
                        value={dashboard.totalReviews}
                        icon={<FaComments />}
                        color="#E8F1FF"
                    />

                    <StatCard
                        title="Average Rating"
                        value={averageRating.toFixed(1)}
                        icon={<FaStar />}
                        color="#FFF7E6"
                    />

                    <StatCard
                        title="Positive Reviews"
                        value={positiveReviews}
                        icon={<FaSmile />}
                        color="#EAFBF1"
                    />

                    <StatCard
                        title="Needs Improvement"
                        value={negativeReviews}
                        icon={<FaChartLine />}
                        color="#FFEAEA"
                    />

                </div>

                <div className="reviewBox">

                    <h2 className="reviewTitle">
                        Rating Distribution
                    </h2>

                    <RatingBar stars={5} count={dashboard.fiveStar} max={maxRating} />
                    <RatingBar stars={4} count={dashboard.fourStar} max={maxRating} />
                    <RatingBar stars={3} count={dashboard.threeStar} max={maxRating} />
                    <RatingBar stars={2} count={dashboard.twoStar} max={maxRating} />
                    <RatingBar stars={1} count={dashboard.oneStar} max={maxRating} />

                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(420px,1fr))",
                        gap: "25px",
                        marginTop: "35px",
                        marginBottom: "35px"
                    }}
                >

                    <ReviewBarChart dashboard={dashboard} />

                    <RatingPieChart dashboard={dashboard} />

                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        marginBottom: "35px"
                    }}
                >

                    {[5,4,3,2,1].map((star) => (

                        <button
                            key={star}
                            className="card"
                            onClick={() => loadReviews(star)}
                        >
                            {"⭐".repeat(star)}
                        </button>

                    ))}

                </div>

                <div className="reviewBox">

                    <h2 className="reviewTitle">

                        {selectedRating} ⭐ Reviews ({reviews.length})

                    </h2>

                    {

                        reviews.length === 0 ?

                            (

                                <p
                                    style={{
                                        textAlign: "center",
                                        color: "gray"
                                    }}
                                >
                                    No Reviews Found
                                </p>

                            )

                            :

                            reviews.map((review, index) => (

                                <ReviewCard
                                    key={review.id}
                                    review={review}
                                    index={index}
                                />

                            ))

                    }

                </div>

            </div>

        </>
    );

}

export default Dashboard;