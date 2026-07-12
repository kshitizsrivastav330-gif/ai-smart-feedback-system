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
    FaChartLine,
    FaQrcode,
    FaSignOutAlt
} from "react-icons/fa";

import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    // Logged-in Restaurant
    const restaurantId = localStorage.getItem("restaurantId");
    const restaurantName = localStorage.getItem("restaurantName") || "Restaurant";

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
    }, []);

    const loadDashboard = async () => {
        try {
            if (!restaurantId) return;
            const response = await getDashboard(restaurantId);
            setDashboard(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const loadReviews = async (rating) => {
        try {
            if (!restaurantId) return;
            const response = await getReviewsByRating(restaurantId, rating);
            setReviews(response.data);
            setSelectedRating(rating);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("restaurantId");
        localStorage.removeItem("restaurantName");
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

    const positiveReviews = dashboard.fiveStar + dashboard.fourStar;
    const negativeReviews = dashboard.oneStar + dashboard.twoStar;

    const maxRating = Math.max(
        dashboard.fiveStar,
        dashboard.fourStar,
        dashboard.threeStar,
        dashboard.twoStar,
        dashboard.oneStar,
        1
    );

    return (
        <div className="dashboard-wrapper">
            <Navbar />

            {/* Premium Header Container */}
            <div className="glass-header">
                <div className="header-info">
                    <h2 className="restaurant-title">{restaurantName}</h2>
                    <p className="subtitle-text">Restaurant Analytics Dashboard</p>

                    <div className="welcome-badge">
                        <span className="status-dot"></span>
                        <span className="welcome-text">Welcome back, <strong>{restaurantName}</strong></span>
                    </div>
                </div>

                <div className="header-buttons">
                    <button className="qr-btn" onClick={() => navigate("/qr")}>
                        <FaQrcode className="btn-icon" /> <span>View QR Code</span>
                    </button>
                    <button className="logout-btn" onClick={logout}>
                        <FaSignOutAlt className="btn-icon" /> <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content Dashboard */}
            <div className="dashboard">
                {/* Stats Cards Row */}
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

                {/* Refactored Professional Rating Distribution Area */}
                <div className="reviewBox distribution-box">
                    <h2 className="reviewTitle">Rating Distribution</h2>
                    <div className="distribution-list">
                        <RatingBar stars={5} count={dashboard.fiveStar} max={maxRating} />
                        <RatingBar stars={4} count={dashboard.fourStar} max={maxRating} />
                        <RatingBar stars={3} count={dashboard.threeStar} max={maxRating} />
                        <RatingBar stars={2} count={dashboard.twoStar} max={maxRating} />
                        <RatingBar stars={1} count={dashboard.oneStar} max={maxRating} />
                    </div>
                </div>

                {/* Analytics Charts Grid */}
                <div className="chart-section">
                    <div className="chart-card">
                        <ReviewBarChart dashboard={dashboard} />
                    </div>
                    <div className="chart-card">
                        <RatingPieChart dashboard={dashboard} />
                    </div>
                </div>

                {/* Modern Interactive Filter Tabs */}
                <div className="filter-tabs-container">
                    {[5, 4, 3, 2, 1].map((star) => (
                        <button
                            key={star}
                            className={`filter-pill ${selectedRating === star ? "active" : ""}`}
                            onClick={() => loadReviews(star)}
                        >
                            <FaStar className="star-icon" /> {star} ★
                        </button>
                    ))}
                </div>

                {/* Filtered Active Reviews Area */}
                <div className="reviewBox">
                    <h2 className="reviewTitle">
                        {selectedRating} Star Reviews ({reviews.length})
                    </h2>

                    <div className="reviews-list-container">
                        {reviews.length === 0 ? (
                            <p className="no-reviews">No reviews found for this rating.</p>
                        ) : (
                            reviews.map((review, index) => (
                                <ReviewCard
                                    key={review.id}
                                    review={review}
                                    index={index}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;