import React, { useContext } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { ThemeContext } from "../../../context-provider/ThemeContext";
import DeleteChatsButton from "./DeleteChats";

function GeneralSettings() {
    const { mode } = useContext(ThemeContext);

    const generalSettings = [
        {
            title: 'Theme',
            element: <Typography sx={{ textTransform: 'capitalize' }}>{mode}</Typography>,
        },
        {
            title: 'Language',
            element: <Typography>English</Typography>,
        },
        {
            title: 'Delete all messages',
            element: <DeleteChatsButton />,
            flexDirection: { xs: 'column', sm: 'row ' },
        },
    ];

    return (
        <Box sx={{ flex: 1 }}>
            {generalSettings.map((setting, index) => (
                <React.Fragment key={index}>
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: setting.flexDirection ? setting.flexDirection : 'row',
                            alignItems: 'center',
                            gap: 2,
                            px: 4,
                            py: 2,
                        }}
                    >
                        <Typography sx={{ flexGrow: 1, textWrap: 'nowrap' }}>
                            {setting.title}
                        </Typography>
                        {setting.element}
                    </Box>
                    <Divider />
                </React.Fragment>
            ))}
        </Box>
    );
}

export default GeneralSettings;