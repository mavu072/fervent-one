import React, { createContext, useState, useCallback } from "react";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswerRounded';
import DocumentScannerIcon from '@mui/icons-material/DocumentScannerRounded';
import { useLocation, useNavigate } from "react-router-dom";
import {
    COMPLIANCE_CHECKER_PATH, COMPLIANCE_CHECKER_TITLE,
    MESSAGES_PATH, MESSAGES_TITLE,
    HOME_PATH
} from "../../config/appConfig";
import { toggleSidebarWidth } from "../home/util/sidebarUtil";

export const SidebarContext = createContext();

function SidebarProvider({ children }) {
    const tabList = [
        {
            path: MESSAGES_PATH,
            title: MESSAGES_TITLE,
            icon: <QuestionAnswerIcon />
        },
        {
            path: COMPLIANCE_CHECKER_PATH,
            title: COMPLIANCE_CHECKER_TITLE,
            icon: <DocumentScannerIcon />
        },
    ];
    const navigate = useNavigate();
    const location = useLocation();
    const defaultPath = tabList[0].path; // Choose message tab by default.
    const currentPath = location.pathname.replace(HOME_PATH, ""); // Get current active path.
    const [selectedTab, setSelectedTab] = useState({
        title: "",
        path: (!currentPath || currentPath === "/") ? defaultPath : currentPath, // Set default path.
    });
    const [collapsed, setCollapsed] = useState(false);

    const switchTab = useCallback((targetTab) => {
        const targetTabTitle = tabList.filter((tab) => tab.path == targetTab).map((tab) => tab.title).join("");
        setSelectedTab({
            title: targetTabTitle,
            path: targetTab,
        });
        navigate(HOME_PATH + targetTab);
    }, [setSelectedTab, navigate]);

    const toggleCollapse = useCallback(() => {
        toggleSidebarWidth();
        setCollapsed((prev) => (prev === true ? false : true));
    }, [setCollapsed]);

    const value = { tabList, selectedTab, switchTab, collapsed, toggleCollapse };

    return <SidebarContext.Provider value={value}>
        {children}
    </SidebarContext.Provider>;
}

export default SidebarProvider;