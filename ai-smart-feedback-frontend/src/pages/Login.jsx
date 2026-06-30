import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginRestaurant } from "../services/api";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async () => {

        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }

        try {

            setLoading(true);

            const response = await loginRestaurant({
                email,
                password
            });

            localStorage.setItem("token", response.data);

            alert("Login Successful!");

            navigate("/dashboard");

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

                <p>Restaurant Login</p>

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

                <button
                    onClick={login}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <div className="register-link">

                    Don't have an account?

                    <br /><br />

                    <Link to="/register">
                        Register Here
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

export default Login;