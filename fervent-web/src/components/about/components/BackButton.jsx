import { ArrowBackRounded } from '@mui/icons-material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

function BackButton() {
    return (
        <Box
            sx={{
                position: "sticky",
                top: '10px',
                marginLeft: { xs: '0px', sm: '10px' },
                color: 'grey.500'
            }}
        >
            <IconButton href="/" color="inherit" size="sm">
                <ArrowBackRounded />
            </IconButton>
        </Box>
    );
}

export default BackButton;