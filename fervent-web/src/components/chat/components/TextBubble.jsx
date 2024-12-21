import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Grow from "@mui/material/Grow";
import { grey, lightBlue } from "@mui/material/colors";

function TextBubble(props) {
  const { isSent, content, arrivedAt } = props;

  return (
    <Tooltip title={arrivedAt} placement={isSent ? "left" : "right"}>
      <Grow in>
        <Box sx={{ position: 'relative' }}>
          <Paper
            color={isSent ? 'primary' : 'neutral'}
            variant={isSent ? 'solid' : 'soft'}
            sx={(theme) => ({
              p: 1.25,
              borderRadius: 'var(--Chat-Bubble-radius)',
              backgroundColor: isSent ? lightBlue[900] :
                theme.palette.mode === 'light' ? grey[300] : grey[800],
            })}
          >
            <Typography
              level="body-sm"
              sx={{
                color: isSent ? 'white' : 'inherit',
              }}
            >
              {content}
            </Typography>
          </Paper>
        </Box>
      </Grow>
    </Tooltip>
  )
}

export default TextBubble;