import React, { createContext, useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_PATH } from "../../config/appConfig";
import { getSidebarCollapsePreference, saveSidebarCollapsePreference, toggleSidebarWidth } from "../home/util/sidebarUtil";
import { tabList } from "../home/util/sidebarTabsUtil";

export const SidebarContext = createContext();

function SidebarProvider({ children }) {
    const navigate = useNavigate();
    const location = useLocation();

    const currentPath = location.pathname.replace(HOME_PATH, "");
    const selectedDefaultTab = (!currentPath || currentPath === "/") ? tabList[0].path : currentPath;

    const getTabTitle = useCallback((targetTabPath) => {
        return tabList.filter((tab) => tab.path == targetTabPath).map((tab) => tab.title).join("");
    });

    const selectedDefaultTitle = getTabTitle(selectedDefaultTab);
    const [selectedTab, setSelectedTab] = useState({
        title: selectedDefaultTitle,
        path: selectedDefaultTab, 
    });
    const [collapsed, setCollapsed] = useState(getSidebarCollapsePreference());

    const switchTab = useCallback((targetTab) => {
        const targetTabTitle = getTabTitle(targetTab);
        setSelectedTab({
            title: targetTabTitle,
            path: targetTab,
        });
        navigate(HOME_PATH + targetTab);
    }, [setSelectedTab, navigate]);

    useEffect(() => {
        saveSidebarCollapsePreference(collapsed);
    }, [collapsed]);

    const toggleCollapse = useCallback(() => {
        toggleSidebarWidth();
        setCollapsed((prev) => (prev === true ? false : true));
    }, [setCollapsed]);

    const value = { selectedTab, switchTab, collapsed, toggleCollapse };

    return <SidebarContext.Provider value={value}>
        {children}
    </SidebarContext.Provider>;
}

export default SidebarProvider;