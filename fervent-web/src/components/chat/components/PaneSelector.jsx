import React from "react";
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderCopyRounded';

const panes = [
  { name: "Messages", icon: <QuestionAnswerRoundedIcon /> }, 
  { name: "My Files", icon: <FolderRoundedIcon />  },
]

function PaneSelector() {
  return (
    <Stack>
      {panes.map((pane, index) =>
        <ListItem key={index}>
          <ListItemButton sx={{ borderRadius: 'var(--ListItem-radius)' }} selected={index == 0}>
            {pane.icon}
            <ListItemText>
              <Typography level="title-sm" sx={{ whiteSpace: 'nowrap' }}>
                &nbsp;{pane.name}
              </Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      )}
    </Stack>
  )
}

export default PaneSelector;