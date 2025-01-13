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

    // Services.
    const userId = user.uid;
    const messageRepository = new MessageRepository(app, `users/${userId}/messages`);
    const fileRepository = new FileRepository(app, `users/${userId}/files`);
    const reportRepository = new ReportRepository(app, `users/${userId}/reports`);

    const messageService = new MessageService(messageRepository);
    const fileService = new FileService(fileRepository);
    const reportService = new ReportService(reportRepository);
    const messageResponderService = new MessageResponderService({ userId, messageService, fileService, reportService });

    const contextValue = { messageService, fileService, reportService, messageResponderService };

    return <ServiceContext.Provider value={contextValue}>
        {children}
    </ServiceContext.Provider>
}

export default ServiceProvider;