import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppContext } from "../context-provider/AppContext";
import AccountAvatar from "./AccountAvatar";

function AccountPreview({ }) {
    const { user } = useContext(AppContext);

    return (
        <Stack
            sx={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minWidth: "240px",
                gap: 1,
                p: 1,
                m: 0,
            }}
        >
            <Box>
                <AccountAvatar user={user} />
            </Box>
            <Box textAlign={"center"}>
                {user.displayName &&
                    <Typography variant="subtitle1" component="div" p={0} m={0}>
                        {user.displayName}
                    </Typography>}
                <Typography variant="body3" color="textSecondary" component="small">
                    {user.email}
                </Typography>
            </Box>
        </Stack>
    );
}

export default AccountPreview;