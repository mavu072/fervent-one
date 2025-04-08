import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import { lightBlue } from "@mui/material/colors";

/**
 * TextBubble.
 * @param {object} props
 * @param {boolean} props.isSent
 * @param {string | React.JSX.Element | null} props.content
 * @param {Array<{ title: string, link: string, type: string }> | null} props.sources
 * @param {string} props.arrivedAt
 * @returns JSX Component
 */
function TextBubble({ isSent, content = null, sources = null, arrivedAt }) {
  const isContentText = typeof content === "string" ? true : false;
  return (
    <Tooltip title={arrivedAt} placement={isSent ? "top" : "top"} arrow>
      <Box sx={{ position: 'relative' }}>
        <Paper
          color={isSent ? 'primary' : 'neutral'}
          variant={isSent ? 'solid' : 'soft'}
          sx={(theme) => ({
            p: 1.25,
            borderRadius: 'var(--Chat-Bubble-radius)',
            backgroundColor: isSent ? lightBlue[700] :
              theme.palette.mode === 'light' ? 'grey.300' : 'grey.800',
            color: isSent ? 'text.primary' :
              theme.palette.mode === 'light' ? 'text.primary' : 'grey.100',
          })}
        >
          {content && (
            <Typography
              component={isContentText ? "p" : "div"}
              level="body-sm"
              sx={{ color: isSent ? 'white' : 'inherit', }}
            >
              {content}
            </Typography>
          )}
          {content && sources && <Divider />}
          {sources && sources.map((source, index) => (
              <Link key={index} href={source.link} target="_blank">{source.title}</Link>
          ))}
        </Paper>
      </Box>
    </Tooltip>
  )
}

export default TextBubble;