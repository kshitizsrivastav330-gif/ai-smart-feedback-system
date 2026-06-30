import "./Hero.css";
import DashboardPreview from "./DashboardPreview";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function Hero() {
    return (
        <section className="hero">

            <div className="hero-left">

                <span className="badge">
                    🚀 AI Powered Restaurant Analytics
                </span>

                <h1>
                    AI Smart Feedback
                </h1>

                <h2>
                    Generate AI Reviews • Collect QR Feedback • Analyze Customer Insights
                </h2>

                <p>
                    AI Smart Feedback helps restaurants generate professional
                    customer reviews, analyze customer ratings, and understand
                    customer satisfaction using Artificial Intelligence.
                </p>

                <div className="hero-buttons">

                    <Link to="/review">
                        <button className="primary-btn">
                            Generate Review
                            <FaArrowRight
                                style={{ marginLeft: "10px" }}
                            />
                        </button>
                    </Link>

                    <Link to="/dashboard">
                        <button className="secondary-btn">
                            Dashboard
                        </button>
                    </Link>

                </div>

            </div>

            <div className="hero-right">

                <DashboardPreview/>

            </div>

        </section>
    );
}

export default Hero;