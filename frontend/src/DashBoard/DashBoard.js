import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the hook
import './Dashboard.css';

const Dashboard = () => {
    const [data, setData] = useState({ placards: [], quote: '', techStack: '' });
    const navigate = useNavigate(); // Initialize the navigate hook

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Retrieve token from localStorage
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found. Redirecting to login...');
                    navigate('/login'); // Redirect to login page
                    return;
                }

                // Make API request with authorization header
                const response = await axios.get('http://18.227.140.245:3000/api/placards', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Assuming response.data contains the data we need
                const fetchedData = response.data[0] || { placards: [], quote: '', techStack: '' };
                setData(fetchedData);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error('Token expired or unauthorized. Redirecting to login...');
                    navigate('/login'); // Redirect to login page if token is invalid
                } else {
                    console.error('Failed to fetch data', error);
                }
            }
        };

        fetchData();
    }, [navigate]);

    const { placards, quote, techStack } = data;

    if (!placards.length) {
        return <div>Loading...</div>; // Show loading state if data is not fetched
    }

    return (
        <div className="dashboard">
            <div className="heading">
                <h1>Generative AI</h1>
            </div>
            <div className="placards">
                {/* Dynamically rendered placards */}
                {placards.length > 0 ? (
                    placards.map((placard, index) => (
                        <div key={index} className="dashboard-placard">
                            <p>{placard}</p>
                            {/* Display link only for the last placard */}
                            {index === placards.length - 1 && (
                                <div className="button-container">
                                    <a
                                        href="https://smith.ai/blog/where-do-generative-ai-models-source-their-data-information#:~:text=Web%20scraping%20and%20crawling,find%20the%20information%20they%20need."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="link-button"
                                    >
                                        Source
                                    </a>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Loading placards...</p>
                )}
            </div>

            <div className="quote">
                {/* Dynamically rendered quote */}
                {quote && (
                    <>
                        <img src="/images/Sam-Altman-OpenAI.jpg" alt="Sam Altman" className="quote-image" />
                        <blockquote>{quote}</blockquote>
                    </>
                )}
            </div>
            <div className="tech-stack-alt">
                {/* Dynamically rendered tech stack */}
                {techStack && (
                    <>
                        <h3>Tech Stack</h3>
                        <p>{techStack}</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
