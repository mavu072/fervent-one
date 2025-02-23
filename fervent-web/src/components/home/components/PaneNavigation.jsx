import React, { useContext } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
    <List
      size="sm"
      sx={{
        gap: 1,
        '--List-nestedInsetStart': '30px',
        '--ListItem-radius': '4px',
      }}
    >
      {paneList.map((pane, index) => {
        const selected = pane.path == selectedPane;

        return (
          <ListItem key={index}>
            <ListItemButton
              selected={selected}
              onClick={() => { handleClick(pane.path) }}
              sx={{
                borderRadius: 'var(--ListItem-radius)',
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  color: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selected ? 'primary.main' : 'grey.300';
                    }
                    return selected ? 'primary.main' : 'grey.700';
                  },
                }}
              >
                {pane.icon}
              </Box>
              <ListItemText>
                <Typography level="title-sm" sx={{ whiteSpace: 'nowrap' }}>
                  &nbsp;{pane.title}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  )
}

export default PaneNavigation;