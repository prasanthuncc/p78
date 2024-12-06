import './SummaryPage.css';
import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import PieChart from "../PieChart/PieChart";

const SummaryPage = () => {
    const [averageIntensityData, setAverageIntensityData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found. Redirecting to login...");
                    navigate("/login");
                    return;
                }

                const response = await axios.get("http://18.227.140.245:3000/api/charts", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const {average} = response.data[0];
                if (average) {
                    setAverageIntensityData({
                        labels: average.labels,
                        data: average.data,
                        backgroundColor: average.backgroundColor,
                        hoverBackgroundColor: average.hoverBackgroundColor,
                    });
                } else {
                    console.error("Invalid data format:", response.data);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error("Token expired or unauthorized. Redirecting to login...");
                    navigate("/login");
                } else {
                    console.error("Failed to fetch data", error);
                }
            }
        };

        fetchData();
    }, [navigate]);

    if (!averageIntensityData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="summary-container">
            <div className="summary-placard second-placard">
                <h2>AI Tool Usage Breakdown</h2>
                <div className="pie-chart-container">
                    <PieChart data={averageIntensityData}/>
                </div>
            </div>
            <div className="summary-placard">
                <h2>AI Usage Insights</h2>
                <p>
                    A new study by the National Bureau of Economic Research shows how the rapid rise of artificial
                    intelligence is happening very unevenly across the United States, with most larger companies and
                    specific industries remaining the focal point. Despite stories of AI sweeping across American
                    business,
                    only 6% of U.S. companies were using AI in 2017, a figure which has not changed much to this day. A
                    survey released by the Census Bureau in 2023 found less than 4% of firms use AI for production.
                    Large
                    companies, especially those with more than 5,000 employees, are the leading adopters, with more than
                    50%
                    using AI, while for companies with more than 10,000 employees, it is over 60%. Sectors like
                    manufacturing, information services, and health care show the highest rates of adoption, while
                    construction and retail lag behind. Additionally, AI adoption is broadening from traditional tech
                    hubs
                    such as Silicon Valley into the Midwest and Southern regions, which have more of a manufacturing
                    focus.

                    The intensity of AI adoption is very uneven across industries.The average value of intensity in
                    manufacturing leads the way with
                    8.8%,
                    followed by health care at 8.0%. The information sector comes in with 7.9%, while professional
                    services
                    reports 5.8%. Other sectors, such as agriculture, retail trade, and construction, all have much
                    lower
                    rates, between 2.8% and 3.8%. This represents the uneven but growing adoption of AI across the U.S.
                    workforce.</p>
            </div>
        </div>
    );
};

export default SummaryPage;
