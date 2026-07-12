import { useState, useEffect } from "react";
import { FaUtensils, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Close menu automatically if screen resizes to desktop width
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 992) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLinkClick = (action) => {
        setIsMenuOpen(false); // Close mobile menu when a link is tapped
        if (typeof action === "function") {
            action();
        }
    };

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
                <div className="logo" onClick={() => handleLinkClick(goHome)}>
                    <FaUtensils />
                    <span className="logo-text">
                        AI Smart Feedback
                    </span>
                </div>

                {/* Hamburger Button for Mobile/Tablet */}
                <button className="menu-toggle-btn" onClick={toggleMenu} aria-label="Toggle navigation">
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Navigation Menu */}
                <div className={`menu ${isMenuOpen ? "mobile-open" : ""}`}>
                    <span className="nav-link" onClick={() => handleLinkClick(goHome)}>
                        Home
                    </span>

                    <span className="nav-link" onClick={() => handleLinkClick(() => scrollToSection("features"))}>
                        Features
                    </span>

                    <span className="nav-link" onClick={() => handleLinkClick(() => scrollToSection("how-it-works"))}>
                        How It Works
                    </span>

                    <Link className="nav-link" to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        Dashboard
                    </Link>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;