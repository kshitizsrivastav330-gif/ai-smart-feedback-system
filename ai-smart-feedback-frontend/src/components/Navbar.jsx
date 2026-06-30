import { FaUtensils } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const goHome = () => {
        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }, 300);
        } else {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    };

    const scrollToSection = (id) => {
        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }, 500);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    };

    return (
        <div className="navbar-container">
            <nav className="navbar">
                <div className="logo" onClick={goHome}>
                    <FaUtensils />
                    <span className="logo-text">
                        AI Smart Feedback
                    </span>
                </div>

                <div className="menu">
                    <span className="nav-link" onClick={goHome}>
                        Home
                    </span>

                    <span className="nav-link" onClick={() => scrollToSection("features")}>
                        Features
                    </span>

                    <span className="nav-link" onClick={() => scrollToSection("how-it-works")}>
                        How It Works
                    </span>

                    <Link className="nav-link" to="/dashboard">
                        Dashboard
                    </Link>

                    <Link className="nav-link" to="/qr">
                        QR Code
                    </Link>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;