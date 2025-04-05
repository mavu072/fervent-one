import { appName, orgSupportEmail } from '../../../config/appConfig';

const faqs = [
    {
        "question": `What is ${appName}?`,
        "answer": `${appName} is a free, AI-powered platform designed to help South African employees understand and exercise their legal rights in the workplace.`
    },
    {
        "question": `How does ${appName} work?`,
        "answer": "Users can describe their workplace issues or upload legal documents. Our AI analyzes relevant South African laws and provides tailored information, compliance ratings, and step-by-step guidance."
    },
    {
        "question": `Is ${appName} free to use?`,
        "answer": `Yes, ${appName} offers all its features for free.`
    },
    {
        "question": `What kind of workplace issues can ${appName} help with?`,
        "answer": `${appName} can assist with a variety of workplace issues, including unfair dismissal, unpaid wages, inappropriate behavior from coworkers or managers, and other employment-related concerns.`
    },
    {
        "question": "How do I ensure my employment agreements comply with South African laws?",
        "answer": `You can upload your employment agreements to ${appName}, and our AI will check them for compliance with South African laws. You\'ll receive a compliance rating and suggestions for any necessary changes.`
    },
    {
        "question": `Is my personal data safe with ${appName}?`,
        "answer": "Yes, we prioritize your privacy and ensure compliance with the Protection of Personal Information Act (PoPIA). Your personal data is not shared with third parties without your consent."
    },
    {
        "question": `Does ${appName} provide legal advice?`,
        "answer": `No, ${appName} is not an authorized legal practitioner and does not provide legal advice. The information provided by the platform is for informational and educational purposes only.`
    },
    {
        "question": `How accurate is the information provided by ${appName}?`,
        "answer": "Our AI leverages a comprehensive library of South African employment laws to provide accurate and relevant information. However, users should consult a qualified legal professional for specific legal advice."
    },
    {
        "question": `Can I access ${appName} on my mobile device?`,
        "answer": `Yes, ${appName} is accessible on both desktop and mobile devices, allowing you to use the platform conveniently from anywhere.`
    },
    {
        "question": `How can I contact ${appName} for support or feedback?`,
        "answer": `We love hearing from our users! If you have any questions, feedback, or suggestions, please contact us at <Link>${orgSupportEmail}</Link>.`
    }
];

export default faqs;