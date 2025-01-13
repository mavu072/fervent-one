import { TYPE_COMPLIANCE_REPORT } from "../constants/reportConstants";

function ReportFactory() {
    
    /**
     * Create compliance report from API payload.
     * @param {object} report JSON payload
     * @example "../api/examples/complianceReportExample".
     * @returns Compliance Report object
     */
    this.createComplianceReportFromPayload = function (report) {
        return {
            type: TYPE_COMPLIANCE_REPORT,
            overallComplianceRating: report.overall_compliance_rating,
            nonCompliantSections: report.non_compliant_sections.map(item => {
                return {
                    sectionTitle: item.section_title,
                    nonCompliantText: item.non_compliant_text,
                    explanation: item.explanation,
                    reference: {
                        text: item.reference.text,
                        link: item.reference.link,
                    },
                    suggestedAlternative: {
                        text: item.suggested_alternative.text,
                        link: item.suggested_alternative.link,
                    },
                }
            }),
            compliantSections: report.compliant_sections.map(item => {
                return {
                    sectionTitle: item.section_title,
                    compliantText: item.compliant_text,
                    positiveNote: item.positive_note,
                }
            }),
        }
    };
}

export default ReportFactory;