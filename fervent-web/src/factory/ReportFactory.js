import { TYPE_COMPLIANCE_ANALYSIS, TYPE_COMPLIANCE_REPORT } from "../constants/messageConstants";

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

    /**
     * Create compliance analysis from API payload.
     * @param {object} payload JSON payload
     * @param {Array} payload.result Array of objects
     * @returns Compliance Analysis object
     */
    this.createComplianceAnalysisFromPayload = function (payload) {
        const analysis = { type: TYPE_COMPLIANCE_ANALYSIS, result: [] };

        analysis.result = payload.result.map(article => {
            const { id, text } = article;
            const obj = { id, text };

            if (article.error) {
                obj.error = article.error;
                return obj;
            }

            const { compliance_analysis } = article;

            obj.nonCompliantSections = compliance_analysis.non_compliant_sections.map(item => {
                return {
                    sectionTitle: item.section_title,
                    nonCompliantText: item.non_compliant_text,
                    explanation: item.explanation,
                    reference: {
                        text: item.reference.text,
                    },
                    suggestedAlternative: {
                        text: item.suggested_alternative.text,
                    },
                }
            });

            obj.compliantSections = compliance_analysis.compliant_sections.map(item => {
                return {
                    sectionTitle: item.section_title,
                    compliantText: item.compliant_text,
                    positiveNote: item.positive_note,
                }
            });

            return obj;
        });

        return analysis;
    };

}

export default ReportFactory;