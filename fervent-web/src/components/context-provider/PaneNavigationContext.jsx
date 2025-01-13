import React, { createContext, useState, useCallback } from "react";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswerRounded';
import FolderIcon from '@mui/icons-material/Folder';
import DocumentScannerIcon from '@mui/icons-material/DocumentScannerRounded';
import { useLocation, useNavigate } from "react-router-dom";

export const ROOT_PATH = "/home";
export const MESSAGES_PATH = "/messages";
export const FILES_PATH = "/files";
export const COMPLIANCE_CHECKER_PATH = "/compliance-checker";

export const PaneNavigationContext = createContext();

function PaneNavigationProvider({ children }) {
    const paneList = [
        { path: MESSAGES_PATH, title: "My Messages", icon: <QuestionAnswerIcon /> },
        { path: FILES_PATH, title: "File Archive", icon: <FolderIcon /> },
        { path: COMPLIANCE_CHECKER_PATH, title: "Compliance Checker", icon: <DocumentScannerIcon /> },
    ];

    const navigate = useNavigate();
    const location = useLocation();
    const defaultPath = paneList[0].path; // Choose message pane by default.
    const currentPath = location.pathname.replace(ROOT_PATH, ""); // Get current active path.
    
    const [selectedPane, setSelectedPane] = useState((!currentPath || currentPath === "/" ) ? defaultPath : currentPath);

    const onSwitchPane = useCallback((targetPane) => {
        setSelectedPane(targetPane);
        navigate(ROOT_PATH + targetPane);
    }, [setSelectedPane, navigate]);

    const value = { paneList, selectedPane, onSwitchPane };

    return <PaneNavigationContext.Provider value={value}>
        {children}
    </PaneNavigationContext.Provider>;
}

export default PaneNavigationProvider;