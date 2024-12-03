import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [data, setData] = useState({placards: [], quote: '', techStack: ''});

    useEffect(() => {
        // Fetch data from the backend API (using port 3001)
        axios.get('http://localhost:3000/api/placards')
            .then(response => {
                // Assuming response.data is an array with the desired object
                const fetchedData = response.data[0] || {placards: [], quote: '', techStack: ''};
                setData(fetchedData);
            })
            .catch(error => {
                console.error('Error fetching dashboard data:', error);
            });
    }, []);

    const {placards, quote, techStack} = data;

    return (
        <div className="dashboard">
            <div className="heading">
                <h1>Generative AI</h1>
            </div>
            <div className="placards">
                {/* Dynamically rendered placards */}
                {placards.length > 0 ? (
                    placards.map((placard, index) => (
                        <div key={index} className="placard">
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
                        <img src="/images/Sam-Altman-OpenAI.jpg" alt="Sam Altman" className="quote-image"/>
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
