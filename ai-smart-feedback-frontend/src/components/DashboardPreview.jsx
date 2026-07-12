import { useEffect, useState } from "react";
import { FaStar, FaCircle } from "react-icons/fa";
import { getDashboard } from "../services/api";
import "./DashboardPreview.css";

function DashboardPreview() {
    const [dashboard, setDashboard] = useState({
        totalReviews: 0,
        fiveStar: 0,
        fourStar: 0,
        threeStar: 0,
        twoStar: 0,
        oneStar: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const restaurantId = localStorage.getItem("restaurantId");
            if (!restaurantId) return;

            const response = await getDashboard(restaurantId);
            setDashboard(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const average =
        dashboard.totalReviews === 0
            ? 0
            : (
            dashboard.fiveStar * 5 +
            dashboard.fourStar * 4 +
            dashboard.threeStar * 3 +
            dashboard.twoStar * 2 +
            dashboard.oneStar
        ) / dashboard.totalReviews;

    const data = [
        { stars: 5, count: dashboard.fiveStar, gradient: "linear-gradient(90deg, #10b981, #34d399)" },
        { stars: 4, count: dashboard.fourStar, gradient: "linear-gradient(90deg, #10b981, #34d399)" },
        { stars: 3, count: dashboard.threeStar, gradient: "linear-gradient(90deg, #f59e0b, #fbbf24)" },
        { stars: 2, count: dashboard.twoStar, gradient: "linear-gradient(90deg, #f97316, #fb923c)" },
        { stars: 1, count: dashboard.oneStar, gradient: "linear-gradient(90deg, #ef4444, #f87171)" }
    ];

    return (
        <div className="premium-preview-card">
            {/* Header Content Section */}
            <div className="preview-card-header">
                <h3>Restaurant Analytics</h3>
                <div className="live-status-pill">
                    <FaCircle className="pulse-dot-icon" />
                    <span>LIVE</span>
                </div>
            </div>

            {/* Premium Distribution Grid Block */}
            <div className="analytics-metrics-grid">
                {data.map((item) => {
                    const percentage =
                        dashboard.totalReviews === 0
                            ? 0
                            : (item.count / dashboard.totalReviews) * 100;

                    return (
                        <div className="interactive-metric-row" key={item.stars}>
                            {/* Prefix Numbers */}
                            <div className="star-identity-tag">
                                <span>{item.stars}</span>
                                <FaStar className="amber-star" />
                            </div>

                            {/* Center Bar Fill Elements */}
                            <div className="premium-track-rail">
                                <div
                                    className="premium-fill-core"
                                    style={{
                                        width: `${percentage}%`,
                                        background: item.gradient
                                    }}
                                />
                            </div>

                            {/* Metric Output Text Label Suffixes */}
                            <div className="metric-numerical-suffix">
                                <span className="bold-count">{item.count}</span>
                                <span className="muted-percentage">({percentage.toFixed(0)}%)</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Score Summary Footer Panel */}
            <div className="footer-score-panel">
                <div className="left-meta-label">
                    <div className="star-icon-shield">
                        <FaStar />
                    </div>
                    <span>Average Rating</span>
                </div>
                <h2 className="score-display-value">{average.toFixed(1)}</h2>
            </div>
        </div>
    );
}

export default DashboardPreview;