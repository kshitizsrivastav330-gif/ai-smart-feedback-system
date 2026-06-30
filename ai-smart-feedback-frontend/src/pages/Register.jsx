import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerRestaurant } from "../services/api";
import "./Login.css";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);

    const register = async () => {

        if (!name || !email || !password || !location) {

            alert("Please fill all fields.");

            return;

        }

        try {

            setLoading(true);

            const response = await registerRestaurant({

                name,
                email,
                password,
                location

            });

            alert(response.data);

            navigate("/login");

        } catch (error) {

            if (error.response) {
                alert(error.response.data);
            } else {
                alert("Unable to connect to server.");
            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <h1>🍽 AI Smart Feedback</h1>

                <p>Create Restaurant Account</p>

                <input
                    type="text"
                    placeholder="Restaurant Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <button
                    onClick={register}
                    disabled={loading}
                >
                    {loading ? "Creating Account..." : "Register"}
                </button>

                <div className="register-link">

                    Already have an account?

                    <br /><br />

                    <Link to="/login">
                        Login Here
                    </Link>

                    <br /><br />

                    <Link to="/">
                        <button className="home-btn">
                            🏠 Back to Home
                        </button>
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Register;