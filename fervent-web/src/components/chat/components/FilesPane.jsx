import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from '@mui/material/Pagination';
import { scrollbarStyle } from "../util/scrollbarUtil";
import { ServiceContext } from "../../context-provider/ServiceContext";
import { useCollection } from "react-firebase-hooks/firestore";
import { formatTime } from "../../../util/dateTimeUtil";
import SectionLoader from "../../loader/SectionLoader";
import FolderItem from "./FolderItem";

const DEF_FILE_LIMIT = 10;

function FilesPane() {
    const { fileService } = useContext(ServiceContext);

    const [fileLimit, setFileLimit] = useState(DEF_FILE_LIMIT);
    const [query, setQuery] = useState(fileService.getAll(DEF_FILE_LIMIT));
    const [files, isFilesloading, filesError] = useCollection(query);

    // TODO Add custom pagination.
    const [lastVisible, setLastVisible] = useState(null);
    const [total, setTotal] = useState(1);

    useEffect(() => {
        if (files) {
            setLastVisible(files.docs[files.size - 1]);
        }
    }, [files]);

    // useEffect(() => {
    //     setQuery(fileService.getAllWithinRange(lastVisible, fileLimit));
    // }, [fileLimit]);

    return (
        <Paper
            sx={{
                height: 'calc(100dvh - var(--Header-height))',
                width: { xs: '100dvw', lg: 'calc(100dvw - var(--Sidebar-width))' },
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'hidden',
                backgroundColor: 'background.body',
            }}
        >
            {isFilesloading && <SectionLoader />}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    minHeight: 0,
                    px: 2,
                    pt: 2,
                    pb: 3,
                    ...scrollbarStyle,
                }}
            >
                <Stack spacing={2}>
                    <Stack>
                        <Typography>My Files</Typography>
                    </Stack>

                    {files && files.docs.map((file, index) => {
                        const { id, name, size, type, createdAt } = file.data();
                        const arrivedAt = createdAt ? formatTime(createdAt.toDate()) : '--:--';
                        return (
                            <Stack key={index} direction="row" spacing={2} flexDirection={'row'}>
                                <FolderItem
                                    key={id}
                                    attachment={{ name, size }}
                                    arrivedAt={arrivedAt}
                                />
                            </Stack>
                        );
                    })}

                    <Stack direction="row">
                        <Typography flex={1}>{files ? files.size : 0} files</Typography>
                    </Stack>
                </Stack>
            </Box>
        </Paper>
    );
}


export default FilesPane;