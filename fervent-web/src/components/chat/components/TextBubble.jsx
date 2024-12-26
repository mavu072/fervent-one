import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Grow from "@mui/material/Grow";
import { grey, lightBlue } from "@mui/material/colors";

/**
 * TextBubble.
 * @param {object} props
 * @param {boolean} props.isSent
 * @param {string | React.JSX.Element} props.content
 * @param {string} props.arrivedAt Date String
 * @returns JSX Component
 */
function TextBubble({ isSent, content, arrivedAt }) {
  const isContentText = typeof content === "string" ? true : false;
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
              backgroundColor: isSent ? lightBlue[700] :
                theme.palette.mode === 'light' ? grey[300] : grey[800],
            })}
          >
            <Typography
              component={isContentText ? "p" : "div"}
              level="body-sm"
              sx={{ color: isSent ? 'white' : 'inherit', }}
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