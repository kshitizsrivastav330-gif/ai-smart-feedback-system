import "./Features.css";
import { FaArrowRight } from "react-icons/fa";

function FeatureCard({ icon, title, description }) {

    return (

        <div className="feature-card">

            <div className="feature-icon">
                {icon}
            </div>

            <h3>{title}</h3>

            <p>{description}</p>

            <button className="learn-more-btn">

                Learn More

                <FaArrowRight />

            </button>

        </div>

    );

}

export default FeatureCard;