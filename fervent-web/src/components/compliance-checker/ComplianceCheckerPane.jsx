import React, { useContext, useState } from "react";
import GlobalStyles from '@mui/material/GlobalStyles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DropFileZone from "../drag-and-drop/DropFileZone";
import PDFViewer from "../pdf-viewer/PDFViewer";
import ClearButton from "../buttons/ClearButton";
import { AppContext } from "../context-provider/AppContext";
import { scrollbarStyle } from "../ui/scrollbarUtil";
import ReportFactory from "../../factory/ReportFactory";
import FileAnalysisService from "../../service/FileAnalysisService";
import AnalysisViewer from "./components/AnalysisViewer";
import { DISCLAIMER_EXPERIMENTAL_AI } from "../../constants/stringConstants";
import FileName from "./components/FileName";

/**
 * ComplianceCheckerPane.
 * @returns JSX Component.
 */
function ComplianceCheckerPane() {
    const { user, onInfoMessage } = useContext(AppContext);
    const [file, setFile] = useState();
    const [title, setTitle] = useState("");
    const [fileBuffer, setFileBuffer] = useState();
    const [analysisResult, setAnalyisResult] = useState();
    const [analysing, setAnalysing] = useState(false);
    const [analysisTimeElapsed, setAnalysisTimeElapsed] = useState();

    const fileAnalyser = new FileAnalysisService();
    const reader = new FileReader();

    /**
     * Handle upload file.
     * @param {File} files Files
     */
    function handleAddFiles(files) {
        // Get file.
        const fl = files[0];
        setTitle(fl.name);
        setFile(fl);

        // Listen for load event and set file content to buffer.
        reader.addEventListener("load", () => {
            const buffer = reader.result;
            setFileBuffer(buffer);
            setAnalysing(true);
            onInfoMessage("Analysing document.");
        });

        // Read file.
        reader.readAsArrayBuffer(fl);

        // Analyse
        const startTime = performance.now();
        fileAnalyser.analyseFile(user.email, fl)
            .then(res => {
                const complianceAnalysis = new ReportFactory().createComplianceAnalysisFromPayload(res);
                const timeElapsed = Math.floor((performance.now() - startTime) / 1000);

                setAnalyisResult(complianceAnalysis);
                setAnalysisTimeElapsed(timeElapsed);
                onInfoMessage(`Analysis completed in ${timeElapsed} secs.`)
            }).catch(error => {
                onInfoMessage(error?.message || "Analysis Error");
                setAnalysing(false);
            }).finally(() => {
                setAnalysing(false);
            });
    }

    function handleClearFile() {
        setTitle(undefined);
        setFile(undefined);
        setFileBuffer(undefined);
        setAnalyisResult(undefined);
    }

    return (
        <Paper
            className="ComplianceChecker-container"
            sx={{
                width: { xs: '100dvw', lg: 'calc(100dvw - var(--Sidebar-width))' },
                height: 'var(--ComplianceChecker-height)',
                display: 'flex',
                flexDirection: 'column',
                overflowX: 'hidden',
                backgroundColor: 'background.body',
                borderRadius: 0,
            }}
        >
            <GlobalStyles
                styles={{
                    ':root': {
                        '--Footer-height': '30px',
                        '--ComplianceChecker-height': 'calc(100dvh - var(--Header-height))',
                        '--AnalysisViewer-height': 'calc(var(--ComplianceChecker-height) - var(--Footer-height))',
                    },
                }}
            />
            <Box
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
                    className="Responsive-display"
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
                            height: { xs: '100%', sm: 'var(--AnalysisViewer-height)' },
                            ...scrollbarStyle,
                            overflowY: { xs: 'unset', sm: "scroll" },
                            scrollbarWidth: "none",
                        }}
                    >
                        {file &&
                            <Box className="File-header"
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                }}
                            >
                                <FileName name={title} />
                                <ClearButton handleClick={handleClearFile} tooltipTitle="Remove file" />
                            </Box>
                        }
                        {!file && <DropFileZone files={file} setFiles={handleAddFiles} accept=".pdf" />}
                        {file && <PDFViewer fileSource={fileBuffer} />}
                    </Stack>
                    <Stack
                        className="Analysis-column"
                        sx={{
                            width: { xs: '100%', sm: '40%' },
                            minWidth: { sm: '300px' },
                            height: { xs: '100%', sm: 'var(--AnalysisViewer-height)', },
                            border: 0,
                            ml: { sm: 1 },
                            ...scrollbarStyle,
                            scrollbarWidth: "none",
                        }}
                    >
                        <AnalysisViewer articles={analysisResult?.result} loading={analysing} />
                    </Stack>
                </Stack>

                <Stack className="Footer" width='100%' height='var(--Footer-height)'>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            textAlign: "center",
                            py: '5px',
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