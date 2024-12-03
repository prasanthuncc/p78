import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import "./Login.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const requestBody = {
                username,
                password,
            };

            const response = await axios.post("http://localhost:3000/api/login", requestBody);

            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                console.log("Login successful:", response.data.message);

                // Adding a timeout before navigating to ensure token is set
                setTimeout(() => {
                    navigate("/", {replace: true}); // Redirect to the home page (root)
                }, 100); // Small delay
            } else {
                alert("Authentication failed. Please check your username and password.");
            }
        } catch (err) {
            console.error("An error occurred:", err);
            alert("Unable to login. Please try again later.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
