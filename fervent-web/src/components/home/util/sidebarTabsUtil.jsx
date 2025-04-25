import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswerRounded';
import DocumentScannerIcon from '@mui/icons-material/DocumentScannerRounded';
import SettingsIcon from '@mui/icons-material/SettingsRounded';
import { 
    SETTINGS_PATH, SETTINGS_TITLE,
    COMPLIANCE_CHECKER_PATH, COMPLIANCE_CHECKER_TITLE,
    MESSAGES_PATH, MESSAGES_TITLE,
} from '../../../config/appConfig';

export const tabList = [
    {
        path: MESSAGES_PATH,
        title: MESSAGES_TITLE,
        icon: <QuestionAnswerIcon />,
        level: 1,
    },
    {
        path: COMPLIANCE_CHECKER_PATH,
        title: COMPLIANCE_CHECKER_TITLE,
        icon: <DocumentScannerIcon />,
        level: 1,
    },
    {
        path: SETTINGS_PATH,
        title: SETTINGS_TITLE,
        icon: <SettingsIcon />,
        level: 2,
    }
];