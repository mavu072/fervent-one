import React, { useContext, useState } from "react";
import GlobalStyles from '@mui/material/GlobalStyles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DropFileZone from "../drag-and-drop/DropFileZone";
import PDFViewer from "../pdf-viewer/PDFViewer";
import { AppContext } from "../context-provider/AppContext";
import { scrollbarStyle } from "../ui/scrollbarUtil";
import ReportFactory from "../../factory/ReportFactory";
import FileAnalysisService from "../../service/FileAnalysisService";
import AnalysisPane from "./components/AnalysisPane";
import FileName from "./components/FileName";
import { appName, COMPLIANCE_CHECKER_TITLE, DISCLAIMER_EXPERIMENTAL_AI } from "../../config/appConfig";

/**
 * ComplianceCheckerPane.
 * @returns JSX Component.
 */
function ComplianceCheckerPane() {
    const { user, onInfoMessage } = useContext(AppContext);
    const [file, setFile] = useState();
    const [title, setTitle] = useState();
    const [analysisResult, setAnalyisResult] = useState();
    const [analysing, setAnalysing] = useState(false);
    const [analysisTimeElapsed, setAnalysisTimeElapsed] = useState();
    const [searchText, setSearchText] = useState("");

    const fileAnalyser = new FileAnalysisService();

    /**
     * Handle upload file.
     * @param {File} files Files
     */
    function handleAddFiles(files) {
        // Get file.
        const fl = files[0];
        setTitle(fl.name);
        setFile(fl);

        // Analyse
        setAnalysing(true);
        onInfoMessage("Analysing document.");
        const startTime = performance.now();
        fileAnalyser.analyseFile(user.uid, fl)
            .then(res => {
                const complianceAnalysis = new ReportFactory().createComplianceAnalysisFromPayload(res);
                const timeElapsed = Math.floor((performance.now() - startTime) / 1000);

                setAnalyisResult(complianceAnalysis);
                setAnalysisTimeElapsed(timeElapsed);
                onInfoMessage(`Analysis completed in ${timeElapsed} secs.`)
            }).catch(error => {
                onInfoMessage(`Analysis failed due to '${error?.message || "Unknown Error"}'.`);
                setAnalysing(false);
            }).finally(() => {
                setAnalysing(false);
            });
    }

    function handleClearFile() {
        setTitle(undefined);
        setFile(undefined);
        setAnalyisResult(undefined);
        setAnalysisTimeElapsed(undefined);
        setSearchText("");
    }

    return (
        <Paper
            className="ComplianceChecker-container"
            sx={{
                width: { xs: '100dvw' },
                height: 'var(--ComplianceChecker-height)',
                display: 'flex',
                flexDirection: 'column',
                overflowX: 'hidden',
                backgroundColor: 'background.body',
                borderRadius: 0,
            }}
        >
            <title>
                {COMPLIANCE_CHECKER_TITLE} – {appName}
            </title>
            <GlobalStyles
                styles={{
                    ':root': {
                        '--Footer-height': '52px',
                        '--ComplianceChecker-height': 'calc(100dvh - var(--Header-height))',
                        '--ComplianceChecker-width': '100dvw',
                        '--AnalysisPane-height': 'calc(var(--ComplianceChecker-height) - var(--Footer-height))',
                    },
                }}
            />
            <Box
                className="Inner-container"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    px: { xs: 2, sm: 4 },
                    py: 0,
                    overflow: { sm: 'hidden' },
                    width: '100%',
                    height: 'var(--ComplianceChecker-height)',
                }}
            >
                <Stack
                    className="Responsive-columns"
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        flex: 1,
                        gap: 2,
                        width: '100%',
                    }}
                >
                    <Stack
                        className="File-column"
                        sx={{
                            flex: 1,
                            gap: 1,
                            width: { xs: '100%', sm: 'var(--ComplianceChecker-width)' },
                            height: { sm: 'var(--AnalysisPane-height)' },
                            ...scrollbarStyle,
                            overflowY: { xs: 'unset', sm: "scroll" },
                            overflowX: 'hidden',
                            scrollbarWidth: "none",
                        }}
                    >
                        {!file && <DropFileZone setFiles={handleAddFiles} accept=".pdf" onMessage={onInfoMessage} />}
                        {file && (
                            <>
                                <FileName fileName={title} onRemoveFile={handleClearFile} />
                                <PDFViewer src={file} searchText={searchText} />
                            </>
                        )}
                    </Stack>
                    <Stack
                        className="Analysis-column"
                        sx={{
                            width: { xs: '100%', sm: '40%' },
                            minWidth: { sm: '300px' },
                            height: { sm: 'var(--AnalysisPane-height)', },
                            minHeight: { xs: file ? '0' : '50%', sm: '0' },
                            border: 0,
                            ml: { sm: 1 },
                            ...scrollbarStyle,
                            scrollbarWidth: "none",
                        }}
                    >
                        <AnalysisPane articles={analysisResult?.result} loading={analysing} onTextSearch={setSearchText} timeElapsed={analysisTimeElapsed} />
                    </Stack>
                </Stack>
                <Stack className="Footer" width='100%' height='var(--Footer-height)'>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            textAlign: "center",
                            pt: '20px',
                            pb: '5px',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {DISCLAIMER_EXPERIMENTAL_AI}
                    </Typography>
                </Stack>
            </Box>
        </Paper >
    )
}

export default ComplianceCheckerPane;