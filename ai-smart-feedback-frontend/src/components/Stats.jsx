import "./Stats.css";
import {
    FaStar,
    FaUsers,
    FaChartLine,
    FaRobot
} from "react-icons/fa";

function Stats() {

    const stats = [
        {
            icon: <FaRobot />,
            number: "10K+",
            title: "AI Reviews Generated"
        },
        {
            icon: <FaStar />,
            number: "4.9★",
            title: "Average Rating"
        },
        {
            icon: <FaUsers />,
            number: "500+",
            title: "Businesses"
        },
        {
            icon: <FaChartLine />,
            number: "99%",
            title: "Customer Satisfaction"
        }
    ];

    return (

        <section className="stats-section">

            <h2>Trusted by Growing Businesses</h2>

            <p>
                Helping restaurants and businesses understand customer
                feedback through AI-powered insights.
            </p>

            <div className="stats-grid">

                {stats.map((item, index) => (

                    <div className="stat-card" key={index}>

                        <div className="stat-icon">
                            {item.icon}
                        </div>

                        <h1>{item.number}</h1>

                        <h3>{item.title}</h3>

                    </div>

                ))}

            </div>

        </section>

    );

}

export default Stats;