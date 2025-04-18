import React, { createContext, useState, useCallback } from "react";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswerRounded';
import DocumentScannerIcon from '@mui/icons-material/DocumentScannerRounded';
import { useLocation, useNavigate } from "react-router-dom";
import { COMPLIANCE_CHECKER_PATH, COMPLIANCE_CHECKER_TITLE, MESSAGES_PATH, MESSAGES_TITLE, ROOT_PATH } from "../../config/appConfig";

export const PaneNavigationContext = createContext();

function PaneNavigationProvider({ children }) {
    const paneList = [
        { path: MESSAGES_PATH, title: MESSAGES_TITLE, icon: <QuestionAnswerIcon /> },
        { path: COMPLIANCE_CHECKER_PATH, title: COMPLIANCE_CHECKER_TITLE, icon: <DocumentScannerIcon /> },
    ];

    const navigate = useNavigate();
    const location = useLocation();
    const defaultPath = paneList[0].path; // Choose message pane by default.
    const currentPath = location.pathname.replace(ROOT_PATH, ""); // Get current active path.
    
    const [selectedPane, setSelectedPane] = useState((!currentPath || currentPath === "/" ) ? defaultPath : currentPath); // Set default path.

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