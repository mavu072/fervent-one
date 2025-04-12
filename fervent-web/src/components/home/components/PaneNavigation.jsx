import React, { useContext } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { PaneNavigationContext } from "../../context-provider/PaneNavigationContext";

/**
 * PaneNavigation.
 * @description Switch between panes.
 * @returns JSX Component
 */
function PaneNavigation({ onClick = undefined }) {
  const { selectedPane, onSwitchPane, paneList } = useContext(PaneNavigationContext);
 
  function handleClick(panePath) {
    onSwitchPane(panePath);
    if (onClick) {
      onClick(); // If onClick is defined.
    }
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'inherit' }}>
      {paneList.map((pane, index) => {
        const selected = pane.path == selectedPane.path;

        return (
          <ListItem key={index} disablePadding>
            <ListItemButton
              selected={selected}
              onClick={() => { handleClick(pane.path) }}
            >
              <ListItemIcon
                sx={{
                  minWidth: '30px',
                  color: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selected ? 'primary.main' : 'grey.300';
                    }
                    return selected ? 'primary.main' : 'grey.700';
                  },
                }}
              >
                {pane.icon}
              </ListItemIcon>
              <ListItemText primary={pane.title} sx={{ whiteSpace: 'nowrap' }} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  )
}

export default PaneNavigation;