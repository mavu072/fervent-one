import React, { useContext, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SectionLoader from "../loader/SectionLoader";
import FolderItem from "./components/FolderItem";
import { ServiceContext } from "../context-provider/ServiceContext";
import { scrollbarStyle } from "../ui/scrollbarUtil";
import { formatTime } from "../../util/dateTimeUtil";
import { DEF_FILE_LIMIT } from "../../constants/fileConstants";
import FileService from "../../service/FileService";

/**
 * FilesPane.
 * @returns JSX Component
 */
function FilesPane() {
    const { fileRepository } = useContext(ServiceContext);
    const fileService = new FileService(fileRepository);

    const [fileLimit, setFileLimit] = useState(DEF_FILE_LIMIT);
    const [query, setQuery] = useState(fileService.getAll(fileLimit, "desc"));
    const [files, isFilesloading, filesError] = useCollection(query);

    // TODO Add Pagination.
    // const [lastVisible, setLastVisible] = useState(null);
    // const [total, setTotal] = useState(1);

    // Effect: Save Last Visible Doc for starting Pagination.
    // useEffect(() => {
    //     if (files) {
    //         setLastVisible(files.docs[files.size - 1]);
    //     }
    // }, [files]);

    // Effect: Custom Pagination.
    // useEffect(() => {
    //     setQuery(fileService.getAllWithinRange(lastVisible, fileLimit, "desc"));
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
                    flex: 1,
                    minHeight: 0,
                    px: 2,
                    pt: 2,
                    pb: 3,
                    ...scrollbarStyle,
                    flexDirection: 'column',
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