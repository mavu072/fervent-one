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
import Errors from "./Errors";


/**
 * AnalysisViewer.
 * @param {object} obj 
 * @param {Array<object>} obj.articles Articles analysed.
 * @param {boolean} obj.loading Loading.
 * @returns JSX Component
 */
function AnalysisViewer({ articles = [], loading = false, onTextSearch }) {
    const [selectedInfoType, setSelectedInfoType] = useState(0);
    // Categorize articles.
    const allIssues = articles.map(article => article.nonCompliantSections || []).flat();
    const allInsights = articles.map(article => article.compliantSections || []).flat()
    const allErrors = articles.map(({ text, error }) => {
        if (error) {
            return { text, error };
        }
        return null;
    }).filter(error => error !== null);
    // Totals.
    const sumIssues = allIssues.length;
    const sumInsights = allInsights.length;
    const sumErrors = allErrors.length;
    // Calculate score.
    const overallScore = Math.floor((sumInsights / (sumIssues + sumInsights)) * 100);

    function handleClickArticles() {
        setSelectedInfoType(0);
    }

    function handleClickIssues() {
        setSelectedInfoType(1);
    }

    function handleClickInsights() {
        setSelectedInfoType(2);
    }

    function handleClickErrors() {
        setSelectedInfoType(3);
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
                    label={`${sumInsights} Positive Insights`}
                    sx={{ borderRadius: '8px', bgcolor: "secondary.main", color: "white" }}
                    onClick={handleClickInsights}
                />
                <Chip
                    label={`${sumErrors} Errors`}
                    sx={{ borderRadius: '8px', bgcolor: "error.main", color: "white" }}
                    onClick={handleClickErrors}
                />
            </Stack>

            <OverallScoreCard score={overallScore || 0} />
            <Definitions />

            {selectedInfoType == 0 && <Articles articles={articles} onTextSearch={onTextSearch} />}
            {selectedInfoType == 1 && <Issues issues={allIssues} onTextSearch={onTextSearch} />}
            {selectedInfoType == 2 && <Insights insights={allInsights} onTextSearch={onTextSearch} />}
            {selectedInfoType == 3 && <Errors errors={allErrors} />}
        </Stack>
    );
}

export default AnalysisViewer;