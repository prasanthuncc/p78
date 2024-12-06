import './ReportPage.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios'; // Import axios
import {useNavigate} from 'react-router-dom';
import PieChart from '../PieChart/PieChart';

const ReportPage = () => {
    const [highIntensityData, setHighIntensityData] = useState(null);
    const [lowIntensityData, setLowIntensityData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found. Redirecting to login...');
                    navigate('/login');
                    return;
                }

                const response = await axios.get('http://18.227.140.245:3000/api/charts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(response.data);

                const {high, low} = response.data[0];

                if (high && low) {
                    setHighIntensityData({
                        labels: high.labels,
                        data: high.data,
                        backgroundColor: high.backgroundColor,
                        hoverBackgroundColor: high.hoverBackgroundColor,
                    });
                    setLowIntensityData({
                        labels: low.labels,
                        data: low.data,
                        backgroundColor: low.backgroundColor,
                        hoverBackgroundColor: low.hoverBackgroundColor,
                    });
                } else {
                    console.error('Invalid data format:', response.data);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error('Token expired or unauthorized. Redirecting to login...');
                    navigate('/login');
                } else {
                    console.error('Failed to fetch data', error);
                }
            }
        };
        fetchData();
    }, [navigate]);

    if (!highIntensityData || !lowIntensityData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="report-container">
            <div className="report-placard">
                <h2>AI Usage Insights</h2>
                <p>
                    A new study from the National Bureau of Economic Research presents a more nuanced view of AI
                    adoption across the United States, emphasizing that its implementation is uneven across company
                    sizes, sectors, and geographic locations. In fact, while the media regularly write about how AI is
                    everywhere in business, the reality is that the spread is much more complex: larger companies and
                    specific industries such as manufacturing and health care.
                </p>
                <p>
                    The study, led by Kristina McElheran from the MIT Initiative on the Digital Economy, reveals that
                    only 6% of U.S. companies were using AI in 2017, a figure that remains largely consistent today. For
                    instance, a 2023 Census Bureau survey showed that fewer than 4% of companies were using AI for
                    production purposes. Data are based on 447,000 firms responding to the 2018 Annual Business
                    Survey-the product of a partnership between the Census Bureau and the National Center for Science
                    and Engineering Statistics-including an unprecedented suite of questions describing the use of
                    digital information, cloud computing, AI, and other advanced technologies. In this respect, the
                    authors found that the adoption of AI has so far been large-company-oriented: more than 50% of the
                    companies with over 5,000 employees already use AI, and over 60% of companies with more than 10,000
                    employees use the technology in their production processes.
                </p>
                <p>
                    The AI use was also very different in the various industries. Sectors such as manufacturing
                    information services, and health care experienced the highest adoption, at about 12% of firms within
                    those industries using AI. Meanwhile, construction and retail realized significantly lower adoption
                    rates, at about 4%. The data further showed that AI adoption is diffused beyond the well-recognized
                    technology hubs of Silicon Valley, Boston, or New York City. It has also spread to regions, such as
                    manufacturing hubs in the Midwest and certain Southern cities, where overall corporate density is
                    relatively low.
                </p>
                <p>
                    In terms of the level of AI intensity in different verticals, here is a rough breakdown of high and
                    low-intensity sectors:
                    <div className="report-chart-placard-parent">
                        <div className="report-chart-placard">
                            <h4>High Intensity AI Usage in various sectors</h4>
                            <div className="pie-chart-container">
                                <PieChart data={highIntensityData}/>
                            </div>
                        </div>
                        <div className="report-chart-placard">
                            <h4>Low Intensity AI Usage in various sectors</h4>
                            <div className="pie-chart-container">
                                <PieChart data={lowIntensityData}/>
                            </div>
                        </div>
                    </div>
                    In the high-intensity sectors, the adoption of AI is significantly stronger. Manufacturing is
                    leading the charge, with 12.2% of firms in the sector incorporating AI into their operations, one of
                    the top adopters of the technology. The information services sector comes in second, with 11.8% of
                    firms using AI. Health care also shows a significant adoption rate, with 11.4% of firms in the
                    sector integrating AI. Professional services also display notable AI usage, with 9.4% of firms
                    adopting the technology. The finance, insurance, and real estate sector has a moderate level of AI
                    adoption, with 5.7% of firms using AI in their operations. Agriculture, mining, and utilities show a
                    similar adoption rate, with 5.5% of firms in this broad category leveraging AI.
                </p>
                <p>
                    Low-intensity sectors have much lower rates of AI adoption. Construction is the lowest among
                    high-intensity sectors, at only 4.2%. The second position in the low-intensity category goes to
                    retail trade, at 4.3%. The transportation and warehousing sector shows a moderate rate of adoption,
                    standing at 5.0%, higher compared to some of the other low-intensity sectors. For wholesale trade,
                    it stands at 5.5%, showing a little higher but still limited application of AI. Education is still
                    among the slowest-moving sectors, with only 2.5% of firms using AI. Management and administrative
                    services have a moderate diffusion rate of 5.0%, while the "Other" category, which includes sectors
                    such as arts and food, reports a relatively low adoption rate of 4.4%.
                </p>
                <p>
                    This differential in AI adoption brings to light the uneven digital transformation across industries
                    in the United States. While large enterprises and specific sectors, for example, manufacturing and
                    health, are forging ahead, the rest are slower in adopting these technologies in sectors like
                    construction and retail. Lastly, AI adoption is not only happening in traditional tech hubs but also
                    in diverse U.S. regions, including Midwest manufacturing centers and certain Southern cities.
                </p>
                <div className="button-container">
                    <a
                        href="https://mitsloan.mit.edu/ideas-made-to-matter/who-what-and-where-ai-adoption-america"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-button"
                    >
                        Source
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ReportPage;
