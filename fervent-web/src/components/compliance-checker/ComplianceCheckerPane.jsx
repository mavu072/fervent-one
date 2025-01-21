import React, { useContext, useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Issues from "./components/Issues";
import DropFileZone from "../drag-and-drop/DropFileZone";
import PDFViewer from "../pdf-viewer/PDFViewer";
import ClearButton from "../buttons/ClearButton";
import { AppContext } from "../context-provider/AppContext";
import { scrollbarStyle } from "../ui/scrollbarUtil";
import ReportFactory from "../../factory/ReportFactory";
import { exampleComplianceReport } from "../../api/examples/complianceReportExample";

/**
 * ComplianceCheckerPane.
 * @returns JSX Component.
 */
function ComplianceCheckerPane() {
    const { onInfoMessage } = useContext(AppContext);
    const [file, setFile] = useState();
    const [title, setTitle] = useState("");
    const [fileBuffer, setFileBuffer] = useState();
    const [analysisResult, setAnalyisResult] = useState();
    const [analysing, setAnalysing] = useState(false);
    const reader = new FileReader();

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
        });

        // Read file.
        reader.readAsArrayBuffer(fl);

        // Mock analysis
        setTimeout(() => {
            // Mock issues
            setAnalyisResult(new ReportFactory().createComplianceReportFromPayload(exampleComplianceReport));
            setAnalysing(false);
        }, 3000);
    }

    function handleClearFile() {
        setTitle(undefined);
        setFile(undefined);
        setFileBuffer(undefined);
        setAnalyisResult(undefined);
    }

    return (
        <Paper
            sx={{
                width: { xs: '100dvw', lg: 'calc(100dvw - var(--Sidebar-width))' },
                height: 'calc(100dvh - var(--Header-height))',
                display: 'flex',
                flexDirection: 'column',
                overflowX: 'hidden',
                backgroundColor: 'background.body',
                borderRadius: 0,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    px: 4,
                    pt: 2,
                    pb: 3,
                    overflowX: 'hidden',
                    ...scrollbarStyle,
                    flexDirection: 'column',
                }}
            >
                <Stack
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Stack className="File-column" flex={1}>
                        {file &&
                            <Box className="File-header" pb={2}
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography variant="h5" component="div"
                                    sx={{
                                        width: "100%",
                                        fontWeight: 600,
                                        textWrap: { xs: "wrap", sm: "nowrap" },
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {title}
                                </Typography>
                                <ClearButton handleClick={handleClearFile} tooltipTitle="Remove file" />
                            </Box>}

                        {!file && <DropFileZone files={file} setFiles={handleAddFiles} accept=".pdf" />}
                        {file && <PDFViewer fileSource={fileBuffer} />}
                    </Stack>
                    <Stack className="Issues-column"
                        sx={{
                            width: { xs: '100%', sm: '30%' },
                            minWidth: { sm: '300px' },
                            border: 0,
                        }}
                    >
                        <Issues issues={analysisResult?.nonCompliantSections || []} loading={analysing} />
                    </Stack>
                </Stack>
            </Box>
        </Paper >
    )
}

export default ComplianceCheckerPane;