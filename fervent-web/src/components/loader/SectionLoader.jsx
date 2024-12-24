import React from "react";
import Stack from "@mui/material/Stack";
import { Oval } from "react-loader-spinner";

function SectionLoader() {
    return (
        <Stack sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Oval
                visible={true}
                height="40"
                width="40"
                color="darkgrey"
                secondaryColor="lightgrey"
                radius="0"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </Stack>
    );
}

export default SectionLoader;