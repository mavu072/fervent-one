import React from "react";
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';


/**
 * PaneSelector.
 * @param {object} props
 * @param {*} props.selectedPane Stored state of the selected pane.
 * @param {Function} props.onChangeSelectedPane Updater function for the state of the selected pane. 
 * @param {Array<object>} props.paneList List of panes.
 * @returns JSX Component
 */
function PaneSelector({ selectedPane, onChangeSelectedPane, paneList }) {

  function handleClick(paneId) {
    onChangeSelectedPane(paneId);
  }

  return (
    <Stack>
      {paneList.map((pane, index) =>
        <ListItem key={index}>
          <ListItemButton
            sx={{ borderRadius: 'var(--ListItem-radius)' }}
            selected={pane.id == selectedPane}
            onClick={() => { handleClick(pane.id) }}
          >
            {pane.icon}
            <ListItemText>
              <Typography level="title-sm" sx={{ whiteSpace: 'nowrap' }}>
                &nbsp;{pane.name}
              </Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      )}
    </Stack >
  )
}

export default PaneSelector;