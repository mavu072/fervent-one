import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from '@mui/material/Chip';
import SectionLoader from "../../loader/SectionLoader";
import Issues from "./Issues";
import Insights from "./Insights";
import Articles from "./Articles";
import Errors from "./Errors";
import OverallScoreCard from "./OverallScoreCard";
import Help from "./Help";
import DocumentScannerIcon from '@mui/icons-material/DocumentScannerRounded';

/**
 * AnalysisPane.
 * @param {object} obj 
 * @param {Array<object>} obj.articles Articles analysed.
 * @param {boolean} obj.loading Loading.
 * @returns JSX Component
 */
function AnalysisPane({ articles = [], loading = false, onTextSearch, timeElapsed }) {
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
    const sumArticles = articles.length;
    const sumIssues = allIssues.length;
    const sumInsights = allInsights.length;
    const sumErrors = allErrors.length;
    // Calculate score.
    const overallScore = Math.floor((sumInsights / (sumIssues + sumInsights)) * 100);

    // Togglers.
    const handleClickArticles = () => setSelectedInfoType(0);
    const handleClickIssues = () => setSelectedInfoType(1);
    const handleClickInsights = () => setSelectedInfoType(2);
    const handleClickErrors = () => setSelectedInfoType(3);

    return (
        <Stack flex={1} gap={2} pb={1}>
            <>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </>
            <Paper className="Analysis-header"
                sx={{
                    position: { xs: "relative", sm: "sticky"},
                    top: { xs: "", sm: 0 },
                    backgroundColor: "background.body",
                    flexDirection: "column",
                    zIndex: 1000,
                    pb: 1,
                    boxShadow: "none",
                }}
            >
                <Stack flexDirection={"row"} gap={0.5} mb={1}>
                    <OverallScoreCard score={overallScore || 0} />
                    <Help />
                </Stack>
                {loading && <SectionLoader />}
                <Stack className="Analysis-controls" flexDirection={"row"} gap={1} flexWrap={"wrap"}>
                    {sumArticles > 0 && <Chip
                        label={`${sumArticles} Articles`}
                        sx={{ borderRadius: '8px' }}
                        onClick={handleClickArticles}
                    />}
                    {sumIssues > 0 &&
                        <Chip
                            label={`${sumIssues} Issues`}
                            sx={{ borderRadius: '8px', bgcolor: "warning.main", color: "white" }}
                            onClick={handleClickIssues}
                        />
                    }
                    {sumInsights > 0 &&
                        <Chip
                            label={`${sumInsights} Positive Insights`}
                            sx={{ borderRadius: '8px', bgcolor: "secondary.main", color: "white" }}
                            onClick={handleClickInsights}
                        />
                    }
                    {sumErrors > 0 &&
                        <Chip
                            label={`${sumErrors} Errors`}
                            sx={{ borderRadius: '8px', bgcolor: "error.main", color: "white" }}
                            onClick={handleClickErrors}
                        />
                    }
                </Stack>
            </Paper>
            <Stack>
                {selectedInfoType == 0 && sumArticles > 0 && <Articles articles={articles} onTextSearch={onTextSearch} />}
                {selectedInfoType == 1 && sumIssues > 0 && <Issues issues={allIssues} onTextSearch={onTextSearch} />}
                {selectedInfoType == 2 && sumInsights > 0 && <Insights insights={allInsights} onTextSearch={onTextSearch} />}
                {selectedInfoType == 3 && sumErrors > 0 && <Errors errors={allErrors} />}
            </Stack>
            {sumArticles === 0 && (
                <Stack flex={1} justifyContent={"center"} alignItems={"center"}>
                    <Stack flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={2}>
                        <DocumentScannerIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                        <Typography variant="body1" component="small" sx={{ color: 'text.secondary', width: '100%', textAlign: "center" }}>
                            Insights will appear here.
                        </Typography>
                    </Stack>
                </Stack>
            )}

            {timeElapsed &&
                <Typography variant="body2" component="small" sx={{ color: 'text.secondary', width: '100%', textAlign: "center" }}>
                    Analysis completed in {timeElapsed} seconds.
                </Typography>
            }
        </Stack>
    );
}

export default AnalysisPane;