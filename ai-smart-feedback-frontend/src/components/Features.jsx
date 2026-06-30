import FeatureCard from "./FeatureCard";
import "./Features.css";

import {
    FaRobot,
    FaChartLine,
    FaLock,
    FaBolt,
    FaStar,
    FaQrcode
} from "react-icons/fa";

function Features() {

    return (

        <section id="features" className="features">

            <h2>Powerful Features</h2>

            <p className="feature-subtitle">
                AI Smart Feedback combines Artificial Intelligence,
                QR-based customer feedback, secure storage, and
                real-time analytics to help restaurants improve
                customer satisfaction.
            </p>

            <div className="feature-grid">

                <FeatureCard
                    icon={<FaQrcode />}
                    title="QR Feedback"
                    description="Customers scan a QR code and instantly submit ratings and feedback."
                />

                <FeatureCard
                    icon={<FaRobot />}
                    title="AI Review Generator"
                    description="Generate natural, human-like restaurant reviews in seconds using AI."
                />

                <FeatureCard
                    icon={<FaChartLine />}
                    title="Live Analytics"
                    description="Track ratings, trends, and customer satisfaction with interactive dashboards."
                />

                <FeatureCard
                    icon={<FaStar />}
                    title="Smart Insights"
                    description="Identify strengths and weaknesses using AI-powered review analysis."
                />

                <FeatureCard
                    icon={<FaLock />}
                    title="Secure Authentication"
                    description="JWT authentication keeps restaurant accounts and data protected."
                />

                <FeatureCard
                    icon={<FaBolt />}
                    title="Fast & Responsive"
                    description="Built with React, Spring Boot, MySQL, and Groq AI for high performance."
                />

            </div>

        </section>

    );

}

export default Features;