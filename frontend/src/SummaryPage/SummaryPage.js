import './SummaryPage.css'; // Import the CSS file
import React from "react";
import PieChart from "../PieChart/PieChart"; // Import the PieChart component

const data = {
    labels: [
        "Search for information",
        "Check grammar",
        "Summarize documents",
        "Paraphrase a document",
        "Create a first draft",
    ],
    data: [69, 42, 33, 28, 24],
    backgroundColor: [
        "rgb(255, 87, 51)", // Gradient start for Search for information
        "rgb(51, 255, 87)", // Gradient start for Check grammar
        "rgb(51, 87, 255)", // Gradient start for Summarize documents
        "rgb(255, 51, 161)", // Gradient start for Paraphrase a document
        "rgb(255, 153, 51)", // Gradient start for Create a first draft
    ],
    hoverBackgroundColor: [
        "rgb(255, 120, 77)", // Gradient end for Search for information
        "rgb(77, 255, 120)", // Gradient end for Check grammar
        "rgb(77, 120, 255)", // Gradient end for Summarize documents
        "rgb(255, 77, 181)", // Gradient end for Paraphrase a document
        "rgb(255, 181, 77)", // Gradient end for Create a first draft
    ]
};


const SummaryPage = () => {
    return (<div className="summary-container">
        <div className="summary-placard second-placard">
            <h2>AI Tool Usage Breakdown</h2>
            <div className="pie-chart-container">
                <PieChart data={data}/>
            </div>
        </div>
        <div className="summary-placard">
            <h2>AI Usage Insights</h2>
            <p>
                A recent survey by the Digital Education Council found that 86% of students globally use AI in their
                studies. The survey gathered responses from 3,839 students across 16 countries, covering a variety
                of fields. On average, students use 2.1 AI tools, with ChatGPT being the most popular (66%),
                followed by Grammarly and Microsoft Copilot (25% each). Common use cases include searching for
                information (69%), checking grammar (42%), summarizing documents (33%), paraphrasing (28%), and
                creating first drafts (24%).
                Despite widespread use, many students feel under prepared for an AI-driven world. 58% believe they
                lack sufficient AI knowledge, and 48% feel unprepared for an AI-enabled workforce. Moreover, 80% say
                their universities' AI integration does not meet expectations. Students want more AI-focused
                initiatives, including training for faculty and students (73% and 72%), more AI literacy courses
                (72%), involvement in AI tool decisions (71%), and increased AI use in teaching (59%).
                Alessandro Di Lullo, CEO of the Digital Education Council, emphasized that AI should be viewed as
                core infrastructure for universities, while highlighting the need to boost AI literacy for students
                and faculty to thrive in an AI-driven world. </p>
        </div>


    </div>);
};

export default SummaryPage;

