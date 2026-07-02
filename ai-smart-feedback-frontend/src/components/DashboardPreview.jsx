import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
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

            const response = await getDashboard();

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
        {
            stars: 5,
            count: dashboard.fiveStar,
            color: "#22c55e"
        },
        {
            stars: 4,
            count: dashboard.fourStar,
            color: "#22c55e"
        },
        {
            stars: 3,
            count: dashboard.threeStar,
            color: "#facc15"
        },
        {
            stars: 2,
            count: dashboard.twoStar,
            color: "#fb923c"
        },
        {
            stars: 1,
            count: dashboard.oneStar,
            color: "#ef4444"
        }
    ];

    return (

        <div className="preview-card">

            <div className="preview-header">

                <h3>Restaurant Analytics</h3>

                <span className="live">LIVE</span>

            </div>

            {

                data.map((item) => {

                    const percentage =
                        dashboard.totalReviews === 0
                            ? 0
                            : (item.count / dashboard.totalReviews) * 100;

                    return (

                        <div key={item.stars}>

                            <div className="rating-row">

                                <span className="stars">

                                    {item.stars} ⭐

                                </span>

                                <span className="count">

                                    {item.count} ({percentage.toFixed(1)}%)

                                </span>

                            </div>

                            <div className="bar">

                                <div
                                    className="fill"
                                    style={{
                                        width: `${percentage}%`,
                                        background: item.color
                                    }}
                                ></div>

                            </div>

                        </div>

                    );

                })

            }

            <div className="average">

                <div className="average-left">

                    <FaStar color="#FFD700" />

                    <span>Average Rating</span>

                </div>

                <h2>{average.toFixed(1)}</h2>

            </div>

        </div>

    );

}

export default DashboardPreview;S