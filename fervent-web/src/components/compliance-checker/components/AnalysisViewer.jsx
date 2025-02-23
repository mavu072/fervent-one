import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from '@mui/material/Chip';
import SectionLoader from "../../loader/SectionLoader";
import Issues from "./Issues";
import Insights from "./Insights";
import Articles from "./Articles";
import OverallScoreCard from "./OverallScoreCard";
import Definitions from "./Definitions";


/**
 * AnalysisViewer.
 * @param {object} obj 
 * @param {Array<object>} obj.articles Articles analysed.
 * @param {boolean} obj.loading Loading.
 * @returns JSX Component
 */
function AnalysisViewer({ articles = [], loading = false }) {
    const [selectedInfoType, setSelectedInfoType] = useState(0);
    const allIssues = articles.map(article => article.nonCompliantSections).flat();
    const allInsights = articles.map(article => article.compliantSections).flat()
    const sumIssues = allIssues.length;
    const sumIInsights = allInsights.length;
    const overallScore = Math.floor((sumIInsights / (sumIssues + sumIInsights)) * 100);

    function handleClickArticles() {
        setSelectedInfoType(0);
    }

    function handleClickIssues() {
        setSelectedInfoType(1);
    }

    function handleClickInsights() {
        setSelectedInfoType(2);
    }

    return (
        <Stack flex={1} gap={2} pb={1}>
            {loading && <SectionLoader />}

            <Stack className="Analysis-controls" flexDirection={"row"} gap={1} flexWrap={"wrap"}>
                <Chip
                    label={`${articles.length} Articles`}
                    sx={{ borderRadius: '8px' }}
                    onClick={handleClickArticles}
                />
                <Chip
                    label={`${sumIssues} Issues`}
                    sx={{ borderRadius: '8px', bgcolor: "warning.main", color: "white" }}
                    onClick={handleClickIssues}
                />
                <Chip
                    label={`${sumIInsights} Positive Insights`}
                    sx={{ borderRadius: '8px', bgcolor: "secondary.main", color: "white" }}
                    onClick={handleClickInsights}
                />
            </Stack>

            <OverallScoreCard score={overallScore || 0} />
            <Definitions />

            {selectedInfoType == 0 && <Articles articles={articles} />}
            {selectedInfoType == 1 && <Issues issues={allIssues} />}
            {selectedInfoType == 2 && <Insights insights={allInsights} />}
        </Stack>
    );
}

export default AnalysisViewer;