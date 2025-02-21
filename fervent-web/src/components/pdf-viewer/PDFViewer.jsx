import React, { useCallback, useMemo, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useResizeObserver from "../../custom-hooks/useResizeObserver";
import ArrowButton from "../buttons/ArrowButton";
import SectionLoader from '../loader/SectionLoader';

// Use external CDN. After I get it working, I will switch to configuring a local worker.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const observerOptions = {};

/**
 * PDFViewer.
 * @param {object} props 
 * @returns JSX Component.
 */
function PDFViewer({ fileSource, maxWidth = 800 }) {
    const file = useMemo(() => fileSource, [fileSource]);
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [containerRef, setContainerRef] = useState(null);
    const [containerWidth, setContainerWidth] = useState();

    const onResize = useCallback((observerEntries) => {
        const [entry] = observerEntries; // De-structure entries array to get first entry.

        if (entry) {
            setContainerWidth(entry.contentRect.width); // Record the container width.
        }
    });

    // Hook: Listen for container resizes and adjust page width.
    useResizeObserver(containerRef, observerOptions, onResize);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function switchPage(offset) {
        setPageNumber((prevPageNum) => (prevPageNum + offset))
    }

    function goToNextPage() {
        switchPage(1);
    }

    function goToPrevPage() {
        switchPage(-1);
    }

    return (
        <Stack flex={1}>
            <Stack className="PDF-body" width="100%">
                <Stack className="PDF-Page-controls"
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        position: "relative",
                        top: "50%",
                        zIndex: 9990,
                        height: 0,
                    }}
                >
                    <ArrowButton
                        variant="left"
                        handleClick={goToPrevPage}
                        disabled={pageNumber <= 1}
                        invertDarkMode
                    />
                    <ArrowButton
                        variant="right"
                        handleClick={goToNextPage}
                        disabled={pageNumber >= numPages}
                        invertDarkMode
                    />
                </Stack>

                <Box className="PDF-Document" border={1} ref={setContainerRef}>
                    <Document file={file} onLoadSuccess={onDocumentLoadSuccess} loading={<SectionLoader />}>
                        <Page
                            pageNumber={pageNumber}
                            width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                        />
                    </Document>
                </Box>
            </Stack>

            <Typography className="PDF-footer" py={1}>
                Page {pageNumber ? pageNumber : '--'} of {numPages}.
            </Typography>
        </Stack>
    );
}

export default PDFViewer;