import React, { createContext, useContext } from "react";
import { AppContext } from "./AppContext";
import MessageRepository from "../../repository/MessageRepository";
import FileRepository from "../../repository/FileRepository";
import ReportRepository from "../../repository/ReportRepository";
import MessageService from "../../service/MessageService";
import FileService from "../../service/FileService";
import ReportService from "../../service/ReportService";
import MessageResponderService from "../../service/MessageResponderService";

export const ServiceContext = createContext();

const ServiceProvider = ({ children }) => {
    const { user, app } = useContext(AppContext);

    // Required context by Services.
    const messageRepository = new MessageRepository(app, user);
    const fileRepository = new FileRepository(app, user);
    const reportRepository = new ReportRepository(app, user);

    const contextValue = { messageRepository, fileRepository, reportRepository };

    return <ServiceContext.Provider value={contextValue}>
        {children}
    </ServiceContext.Provider>
}

export default ServiceProvider;