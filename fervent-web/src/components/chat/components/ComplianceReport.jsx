import React, { useContext, useEffect, useState } from "react";
import { Link, styled } from "@mui/material";
import Rating from "@mui/material/Rating";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { ServiceContext } from "../../context-provider/ServiceContext";
import SectionLoader from "../../loader/SectionLoader";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import InfoIcon from '@mui/icons-material/Info';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


const ComplianceReportDialog = styled(Dialog)(({ theme }) => ({
    zIndex: 9999,
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


function ComplianceReport({ title = "Compliance Report", dataUrl, open, onClose }) {
    const { reportService } = useContext(ServiceContext);

    const maxRating = 5;
    const [value, setvalue] = useState(0); // Rating
    const [data, setData] = useState(null);

    useEffect(() => {
        if (open) {
            fetchData();
        }
    }, [open]);

    async function fetchData() {
        const doc = await reportService.get(dataUrl);
        const snapshot = await doc.get();
        const data = snapshot.data();
        setData(snapshot.data());
        setvalue((data.overallComplianceRating / 100) * maxRating);
    }

    const CloseButton = () => {
        return (
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon />
            </IconButton>
        )
    }

    return (
        <ComplianceReportDialog
            onClose={onClose}
            aria-labelledby={title}
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id={title}>
                {title}
            </DialogTitle>
            <CloseButton />
            {!data && <SectionLoader />}
            <DialogContent dividers>

                <Typography gutterBottom variant="h6" component="div">
                    Non-Compliant Sections:
                </Typography>
                {data && data.nonCompliantSections.map((section, index) => {
                    const { sectionTitle, nonCompliantText, explanation, reference, suggestedAlternative } = section;
                    return (
                        <Card key={index} variant="outlined" sx={{ maxWidth: '100%' }}>
                            <Box sx={{ p: 2 }}>
                                <Stack
                                    direction="row"
                                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <Typography gutterBottom variant="h5" component="div">
                                        {sectionTitle}
                                    </Typography>
                                </Stack>

                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Clause: "{nonCompliantText}"
                                </Typography>

                                <Stack direction="row" py={1} spacing={0.5} alignItems={"center"}>
                                    <HelpCenterIcon />
                                    <Typography gutterBottom variant="body2" pt={1}>
                                        Why is this a problem?
                                    </Typography>
                                </Stack>
                                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                    {explanation}
                                    &nbsp;[1]
                                </Typography>

                                <Stack direction="row" py={1} spacing={0.5} alignItems={"center"}>
                                    <InfoIcon />
                                    <Typography gutterBottom variant="body2" pt={1}>
                                        Here's an improved version.
                                    </Typography>
                                </Stack>
                                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                    {suggestedAlternative.text}
                                    &nbsp;[2]
                                </Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
                                    References:
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    [1]&nbsp;
                                    <Link href={reference.link} target="_blank">
                                        {`${reference.text.substring(0, 50)}...`}
                                    </Link>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    [2]&nbsp;
                                    <Link href={suggestedAlternative.link} target="_blank">
                                        {`${suggestedAlternative.text.substring(0, 50)}...`}
                                    </Link>
                                </Stack>
                            </Box>
                        </Card>
                    )
                })}

                <Typography pt={2} gutterBottom variant="h6" component="div">
                    Compliant Sections:
                </Typography>
                {data && data.compliantSections.map((section, index) => {
                    const { sectionTitle, compliantText, positiveNote } = section;
                    return (
                        <Card key={index} variant="outlined" sx={{ maxWidth: '100%' }}>
                            <Box sx={{ p: 2 }}>
                                <Stack
                                    direction="row"
                                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <Typography gutterBottom variant="h5" component="div">
                                        {sectionTitle}
                                    </Typography>
                                </Stack>

                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Clause: "{compliantText}"
                                </Typography>

                                <Stack direction="row" py={1} spacing={0.5} alignItems={"center"}>
                                    <ThumbUpIcon />
                                    <Typography gutterBottom variant="body2" pt={1}>
                                        Why is this good?
                                    </Typography>
                                </Stack>
                                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                    {positiveNote}
                                </Typography>
                            </Box>
                        </Card>
                    )
                })}

                <Stack direction="row" width="100%" justifyContent="center" pt={2}>
                    <Rating
                        name="customized-10"
                        value={value}
                        max={maxRating}
                        precision={0.1}
                        getLabelText={getLabelText}
                        icon={<ThumbUpIcon fontSize="inherit" />}
                        emptyIcon={<ThumbUpIcon fontSize="inherit" />}
                        readOnly
                    />
                    <Box sx={{ ml: 2 }}>{labels[value]}</Box>
                </Stack>

            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose}>
                    Done
                </Button>
            </DialogActions>
        </ComplianceReportDialog >
    )
}

export default ComplianceReport;