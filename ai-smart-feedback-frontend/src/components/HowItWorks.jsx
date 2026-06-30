import "./HowItWorks.css";
import {
    FaArrowRight,
    FaChartPie,
    FaQrcode,
    FaRobot,
    FaStar
} from "react-icons/fa";

function HowItWorks() {

    const steps = [
        {
            icon: <FaQrcode />,
            title: "Scan QR Code",
            desc: "Customer scans the restaurant QR code to start the feedback process."
        },
        {
            icon: <FaStar />,
            title: "Give Rating",
            desc: "Customer selects a rating from 1 to 5 stars based on their experience."
        },
        {
            icon: <FaRobot />,
            title: "AI Review",
            desc: "Our AI instantly generates a natural and professional customer review."
        },
        {
            icon: <FaChartPie />,
            title: "View Analytics",
            desc: "Restaurant owners monitor ratings, reviews, and customer satisfaction through a live dashboard."
        }
    ];

    return (

        <section
            id="how-it-works"
            className="how-section"
        >

            <h2>How It Works</h2>

            <p className="how-subtitle">
                Four simple steps to collect customer feedback and transform it into meaningful insights.
            </p>

            <div className="steps">

                {steps.map((step, index) => (

                    <div
                        className="step-card"
                        key={index}
                    >

                        <div className="step-icon">
                            {step.icon}
                        </div>

                        <h3>{step.title}</h3>

                        <p>{step.desc}</p>

                        <button className="learn-btn">

                            Learn More

                            <FaArrowRight
                                style={{
                                    marginLeft: "8px"
                                }}
                            />

                        </button>

                    </div>

                ))}

            </div>

        </section>

    );

}

export default HowItWorks;