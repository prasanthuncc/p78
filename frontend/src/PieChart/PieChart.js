// PieChart.js
import React from "react";
import {Pie} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({data}) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                data: data.data,
                backgroundColor: data.backgroundColor,
                borderColor: data.backgroundColor.map(color => color), // Border same as background
                borderWidth: 1,
            },
        ],
    };

    return <Pie data={chartData}/>;
};

export default PieChart;
