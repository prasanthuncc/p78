import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/login", { username, password });

            if (response.data.success) {
                login(response.data.token);
                navigate("/dashboard", { replace: true });
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
