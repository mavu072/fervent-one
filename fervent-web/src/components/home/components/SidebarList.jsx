import React, { useContext } from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { listItemButtonClasses } from '@mui/material/ListItemButton';
import { SidebarContext } from "../../context-provider/SidebarContext";
import { tabList } from "../util/sidebarTabsUtil";

const lvl1Tabs = tabList.filter((tab) => tab.level === 1);
const lvl2Tabs = tabList.filter((tab) => tab.level === 2);

/**
 * SidebarList.
 * @description Switch between tabs.
 * @returns JSX Component
 */
function SidebarList({ onClick = undefined }) {
  const { selectedTab, switchTab } = useContext(SidebarContext);

  function handleClick(panePath) {
    switchTab(panePath);
    if (onClick) {
      onClick(); // If onClick is defined.
    }
  }

  return (
    <React.Fragment>
      <Box
        className='Sidebar-list'
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
            borderRadius: '8px',
          },
        }}
      >
        <List
          className="ListItem-group"
          sx={{ width: '100%', bgcolor: 'inherit' }}
        >
          {lvl1Tabs.map((tab, index) => {
            const selected = tab.path === selectedTab.path;
            return (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  selected={selected}
                  onClick={() => { handleClick(tab.path) }}
                  sx={{
                    px: 1,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      p: 0,
                      minWidth: '24px',
                      minHeight: '24px',
                      color: (theme) => {
                        if (theme.palette.mode === 'light') {
                          return selected ? 'primary.main' : 'grey.300';
                        }
                        return selected ? 'primary.main' : 'grey.700';
                      },
                    }}
                  >
                    {tab.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={tab.title}
                    sx={{
                      whiteSpace: 'nowrap',
                      my: 0,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <List
          className="ListItem-group"
          sx={{ width: '100%', bgcolor: 'inherit', pt: 1.5 }}
        >
          {lvl2Tabs.map((tab, index) => {
            const selected = tab.path === selectedTab.path;
            return (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  selected={selected}
                  onClick={() => { handleClick(tab.path) }}
                  sx={{
                    px: 1,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      p: 0,
                      minWidth: '24px',
                      minHeight: '24px',
                      color: (theme) => {
                        if (theme.palette.mode === 'light') {
                          return selected ? 'primary.main' : 'grey.300';
                        }
                        return selected ? 'primary.main' : 'grey.700';
                      },
                    }}
                  >
                    {tab.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={tab.title}
                    sx={{
                      whiteSpace: 'nowrap',
                      my: 0,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </React.Fragment>
  );
}

export default SidebarList;