import React, {useEffect} from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import "./App.css";

import Menu from "./Menu/Menu";
import Dashboard from "./DashBoard/DashBoard";
import SummaryPage from "./SummaryPage/SummaryPage";
import ReportPage from "./ReportPage/ReportPage";
import Login from "./Login/Login";
import {useAuth} from "./context/AuthContext";
import AuthRoutes from "./Routes/AuthRoutes";

function App() {
    const {logout} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            logout();
            navigate("/login", {replace: true});
            return;
        }

        try {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            const isTokenExpired = decodedToken.exp < currentTime;

            if (isTokenExpired) {
                logout();
                navigate("/login", {replace: true});
            }
        } catch (error) {
            console.error("Invalid token:", error);
            logout();
            navigate("/login", {replace: true});
        }
    }, [logout, navigate]);

    return (
        <div className="App">
            <Menu className="navbar"/>
            <div className="background">
                <div className="mainContainer">
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/" element={<AuthRoutes/>}>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                            <Route path="/summary" element={<SummaryPage/>}/>
                            <Route path="/report" element={<ReportPage/>}/>
                        </Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
