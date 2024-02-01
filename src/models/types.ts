export enum UserStatusEnum {
	ACTIVE = "ACTIVE",
	DELETE = "DELETE",
}

// User Roles
export enum UserRolesStatusEnum {
	ACTIVE = "ACTIVE",
	DELETE = "DELETE",
	DISABLED = "DISABLED"
}

export enum EnquiryStatusEnum {
	ACTIVE = "ACTIVE",
	DELETE = "DELETE",
	DISABLED = "DISABLED"
}


export enum QuestionaryStatusEnum {
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
}

export enum OtpTypeEnum {
	FORGOT_PASSWORD = "FORGOT_PASSWORD",
	LOGIN = "LOGIN",
	REGISTER = "REGISTER"
}


export enum AssessmentTypeEnum {
	EXPRESS_ENTRY_PR = "EXPRESS_ENTRY_PR",
	// ENTREPRENEUR = "ENTREPRENEUR",
	WORK_PERMIT = "WORK_PERMIT",
	PERMANENT_RESIDENCY = "PERMANENT_RESIDENCY",
	// FAMILY_SPONSORSHIP = "FAMILY_SPONSORSHIP",
	// INTERNATIONAL_STUDENT = "INTERNATIONAL_STUDENT",
	VISITORS_VISA = "VISITORS_VISA",
	STUDENT_VISA = "STUDENT_VISA",
	STUDY_PERMIT_EXTENSION = "STUDY_PERMIT_EXTENSION",
	CANADA_CITIZENSHIP = "CANADA_CITIZENSHIP",
	OCI_NEW = "OCI_NEW",
	OCI_MISCELLANEOUS = "OCI_MISCELLANEOUS",
	INDIAN_PASSPORT_RENEWAL = "INDIAN_PASSPORT_RENEWAL",
	INDIAN_PASSPORT_RENEWAL_TATKAL = "INDIAN_PASSPORT_RENEWAL_TATKAL",
	PCC = "PCC",
	INDIAN_PASSPORT_SURRENDER = "INDIAN_PASSPORT_SURRENDER",
	FAMILY_SPONSOR_WORK_PERMIT = "FAMILY_SPONSOR_WORK_PERMIT",
	FAMILY_SPONSOR_PR = "FAMILY_SPONSOR_PR",
	CARE_GIVER_PROGRAM = "CARE_GIVER_PROGRAM",
	RURAL_AND_NORTHERN_IMM_PILOT = "RURAL_AND_NORTHERN_IMM_PILOT",
	USA_UK_VISITOR_VISA = "USA_UK_VISITOR_VISA",
	BRIDGING_OPEN_WORK_PERMIT = "BRIDGING_OPEN_WORK_PERMIT",
	PG_WORK_PERMIT = "PG_WORK_PERMIT",
	SUPERVISA_APPLICATION = "SUPERVISA_APPLICATION",
	EDUCATION_WES = "EDUCATION_WES",
	H_AND_CPR_ASSESSMENT = "H_AND_CPR_ASSESSMENT",
	WORK_PERMIT_EXTENSION_18_MONTH = "WORK_PERMIT_EXTENSION_18_MONTH",
	PR_CARD_RENEWAL = "PR_CARD_RENEWAL",
	CAPS_NOTES = "CAPS_NOTES",
	CHANGE_DLI_NUMBER = "CHANGE_DLI_NUMBER",
	INDIA_VISA_ENTRY_6_MONTHS = "INDIA_VISA_ENTRY_6_MONTHS",
	INDIA_VISA_ENTRY_1_YEAR = "INDIA_VISA_ENTRY_1_YEAR",
	INDIA_E_VISA = "INDIA_E_VISA",
	REFUGEE_PASSPORT = "REFUGEE_PASSPORT",
	REFUGEE_PR = "REFUGEE_PR",
	CAPS_NOTES_1 = "CAPS_NOTES_1"

}


export enum VisitorVisaTopics {
	INFORMATION = "659c3d7f1952ec5c7f24ac65",
	CONTACT_INFO = "659c3d8b1952ec5c7f24ac66",
	PASSPORT_DETAILS = "659c3d961952ec5c7f24ac67",
	DETAILS_OF_VISIT_TO_CANADA = "659c3d9d1952ec5c7f24ac68",
	EDUCATION_DETAILS = "659c3da51952ec5c7f24ac69",
	EMPLOYMENT_DETAILS = "659c3dae1952ec5c7f24ac6a",
	FAMILY_DETAILS = "659c3db91952ec5c7f24ac6b",
	COMING_TO_CANADA = "659c3dc01952ec5c7f24ac6c"
}

export enum SuperVisaTopics {
	INFORMATION = "659c3d7f1952ec5c7f25ac65",
	CONTACT_INFO = "659c3d8b1952ec5c7f25ac66",
	PASSPORT_DETAILS = "659c3d961952ec5c7f25ac67",
	DETAILS_OF_VISIT_TO_CANADA = "659c3d9d1952ec5c7f25ac68",
	EDUCATION_DETAILS = "659c3da51952ec5c7f25ac69",
	EMPLOYMENT_DETAILS = "659c3dae1952ec5c7f25ac6a",
	FAMILY_DETAILS = "659c3db91952ec5c7f26ac6b",
	COMING_TO_CANADA = "659c3dc01952ec5c7f27ac6c"
}

export enum FormTypeEnum {
	PIF_EXPRESS_ENTRY = "PIF_EXPRESS_ENTRY",
	PRINCIPAL_APPLICANT = "PRINCIPAL_APPLICANT",
	PIF_STUDENT_VISA = "PIF_STUDENT_VISA",
	VISITORS_VISA = "VISITORS_VISA",
	SUPER_VISA = "SUPER_VISA",
	QUESTIONNAIRE = "QUESTIONNAIRE",
	RETAINER_AGREEMENT = "RETAINER_AGREEMENT",
	USE_OF_REPRESENTATIVE = "USE_OF_REPRESENTATIVE"
}

export enum QuestionaryInputEnum {
	/**
	 * Simple text input
	 */
	TEXT = "TEXT",

	/*
	 * number input
	 */
	NUMBER = "NUMBER",
	/*
	 * date input
	 */
	DATE = "NUMBER",

	/*
	 * Select input
	 */
	SELECT = "SELECT",

	/*
	 * Radio input
	 */
	RADIO = "RADIO",
	ARRAY = "ARRAY",

	/*
	 * Multi select checkbox
	 */
	CHECK_BOX = "CHECK_BOX",

	/*
	 * Sonde Audio URL Upload Widget
	 */
	FILE_URL = "FILE_URL",

	HTML = "HTML",


	/**
	 * Expandable panel
	 */
	EXPANSION_PANEL = "EXPANSION_PANEL",
	OBJECT = "OBJECT"
}

export interface UserAnswer {
	question: string;
	answer: { option: string }[];
	subQuestions?: UserAnswer[];
}


export enum EducationOptions {
	SSLC = 'SSLC',
	HSC = 'HSC',
	ONE_YEAR_COURSE = 'ONE_YEAR_COURSE',
	TWO_YEAR_COURSE = 'TWO_YEAR_COURSE',
	BACHELOR_DEGREE = 'BACHELOR_DEGREE',
	MULTIPLE_DEGREE = 'MULTIPLE_DEGREE',
	MASTERS_DEGREE = 'MASTERS_DEGREE',
	PHD = 'PHD'
}

export enum LanguageTestOptions {
	CELPIP = 'CELPIP',
	IELTS = 'IELTS',
	TEF = 'TEF',
	TCF = 'TCF'
}