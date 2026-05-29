import { defineSchema } from "@xylex-group/athena";

import { payloadAdminIpAllowlistModel } from "../models/payload/admin-ip-allowlist";
import { payloadCaseBucketsModel } from "../models/payload/case-buckets";
import { payloadCaseSeveritiesModel } from "../models/payload/case-severities";
import { payloadCaseStatusesModel } from "../models/payload/case-statuses";
import { payloadDocumentTypesModel } from "../models/payload/document-types";
import { payloadDocumentTypesRelsModel } from "../models/payload/document-types-rels";
import { payloadEmailAudiencesModel } from "../models/payload/email-audiences";
import { payloadEmailAudiencesEmailsModel } from "../models/payload/email-audiences-emails";
import { payloadEmailAudiencesRelsModel } from "../models/payload/email-audiences-rels";
import { payloadEmailLogsModel } from "../models/payload/email-logs";
import { payloadEmailSendsModel } from "../models/payload/email-sends";
import { payloadEmailTemplatesModel } from "../models/payload/email-templates";
import { payloadEmailTemplatesBlocksBulletListModel } from "../models/payload/email-templates-blocks-bullet-list";
import { payloadEmailTemplatesBlocksBulletListItemsModel } from "../models/payload/email-templates-blocks-bullet-list-items";
import { payloadEmailTemplatesBlocksButtonModel } from "../models/payload/email-templates-blocks-button";
import { payloadEmailTemplatesBlocksDetailsModel } from "../models/payload/email-templates-blocks-details";
import { payloadEmailTemplatesBlocksDetailsRowsModel } from "../models/payload/email-templates-blocks-details-rows";
import { payloadEmailTemplatesBlocksHeadingModel } from "../models/payload/email-templates-blocks-heading";
import { payloadEmailTemplatesBlocksParagraphModel } from "../models/payload/email-templates-blocks-paragraph";
import { payloadFeatureFlagsModel } from "../models/payload/feature-flags";
import { payloadFeatureFlagsAllowEmailsModel } from "../models/payload/feature-flags-allow-emails";
import { payloadFeatureFlagsAllowUserIdsModel } from "../models/payload/feature-flags-allow-user-ids";
import { payloadFeatureFlagsEnvironmentsModel } from "../models/payload/feature-flags-environments";
import { payloadFormSubmissionsModel } from "../models/payload/form-submissions";
import { payloadFormSubmissionsSubmissionDataModel } from "../models/payload/form-submissions-submission-data";
import { payloadFormationAccessGroupsModel } from "../models/payload/formation-access-groups";
import { payloadFormationAccessGroupsFormationsIdsModel } from "../models/payload/formation-access-groups-formations-ids";
import { payloadFormationAccessGroupsGrantedUserIdsModel } from "../models/payload/formation-access-groups-granted-user-ids";
import { payloadFormationAlertAudiencesModel } from "../models/payload/formation-alert-audiences";
import { payloadFormationAlertAudiencesEmailsModel } from "../models/payload/formation-alert-audiences-emails";
import { payloadFormationJurisdictionsModel } from "../models/payload/formation-jurisdictions";
import { payloadFormationJurisdictionsRelsModel } from "../models/payload/formation-jurisdictions-rels";
import { payloadFormsModel } from "../models/payload/forms";
import { payloadFormsBlocksCheckboxModel } from "../models/payload/forms-blocks-checkbox";
import { payloadFormsBlocksCountryModel } from "../models/payload/forms-blocks-country";
import { payloadFormsBlocksDateModel } from "../models/payload/forms-blocks-date";
import { payloadFormsBlocksEmailModel } from "../models/payload/forms-blocks-email";
import { payloadFormsBlocksMessageModel } from "../models/payload/forms-blocks-message";
import { payloadFormsBlocksNumberModel } from "../models/payload/forms-blocks-number";
import { payloadFormsBlocksPaymentModel } from "../models/payload/forms-blocks-payment";
import { payloadFormsBlocksPaymentPriceConditionsModel } from "../models/payload/forms-blocks-payment-price-conditions";
import { payloadFormsBlocksPhoneNumberModel } from "../models/payload/forms-blocks-phone-number";
import { payloadFormsBlocksSelectModel } from "../models/payload/forms-blocks-select";
import { payloadFormsBlocksSelectOptionsModel } from "../models/payload/forms-blocks-select-options";
import { payloadFormsBlocksStateModel } from "../models/payload/forms-blocks-state";
import { payloadFormsBlocksSummaryModel } from "../models/payload/forms-blocks-summary";
import { payloadFormsBlocksSummarySectionsModel } from "../models/payload/forms-blocks-summary-sections";
import { payloadFormsBlocksTextModel } from "../models/payload/forms-blocks-text";
import { payloadFormsBlocksTextareaModel } from "../models/payload/forms-blocks-textarea";
import { payloadFormsDynamicSectionsModel } from "../models/payload/forms-dynamic-sections";
import { payloadFormsDynamicSectionsFieldsModel } from "../models/payload/forms-dynamic-sections-fields";
import { payloadFormsDynamicSectionsFieldsOptionsModel } from "../models/payload/forms-dynamic-sections-fields-options";
import { payloadFormsEmailsModel } from "../models/payload/forms-emails";
import { payloadFormsPageDefinitionsModel } from "../models/payload/forms-page-definitions";
import { payloadFormsPagesModel } from "../models/payload/forms-pages";
import { payloadFormsPagesFieldsModel } from "../models/payload/forms-pages-fields";
import { payloadFormsPagesFieldsOptionsModel } from "../models/payload/forms-pages-fields-options";
import { payloadFormsPendingFormRoutesModel } from "../models/payload/forms-pending-form-routes";
import { payloadFormsRelsModel } from "../models/payload/forms-rels";
import { payloadLegalModel } from "../models/payload/legal";
import { payloadMediaModel } from "../models/payload/media";
import { payloadMollieAuditLogModel } from "../models/payload/mollie-audit-log";
import { payloadMollieBalancesModel } from "../models/payload/mollie-balances";
import { payloadMollieChargebacksModel } from "../models/payload/mollie-chargebacks";
import { payloadMollieConfigModel } from "../models/payload/mollie-config";
import { payloadMollieCustomersModel } from "../models/payload/mollie-customers";
import { payloadMollieInvoicesModel } from "../models/payload/mollie-invoices";
import { payloadMollieMerchantInvoicesModel } from "../models/payload/mollie-merchant-invoices";
import { payloadMollieMethodsModel } from "../models/payload/mollie-methods";
import { payloadMolliePaymentLinksModel } from "../models/payload/mollie-payment-links";
import { payloadMolliePaymentLinksStackedProductsModel } from "../models/payload/mollie-payment-links-stacked-products";
import { payloadMolliePaymentLinksStackedUpsellsModel } from "../models/payload/mollie-payment-links-stacked-upsells";
import { payloadMolliePaymentsModel } from "../models/payload/mollie-payments";
import { payloadMollieProductsModel } from "../models/payload/mollie-products";
import { payloadMollieRefundsModel } from "../models/payload/mollie-refunds";
import { payloadMollieRequestLogModel } from "../models/payload/mollie-request-log";
import { payloadMollieSalesInvoicesModel } from "../models/payload/mollie-sales-invoices";
import { payloadMollieSubscriptionsModel } from "../models/payload/mollie-subscriptions";
import { payloadMollieSyncLogModel } from "../models/payload/mollie-sync-log";
import { payloadMollieWebhooksModel } from "../models/payload/mollie-webhooks";
import { payloadOnboardingGuidedTourConfigModel } from "../models/payload/onboarding-guided-tour-config";
import { payloadOnboardingGuidedTourConfigStepsModel } from "../models/payload/onboarding-guided-tour-config-steps";
import { payloadPayloadKvModel } from "../models/payload/payload-kv";
import { payloadPayloadLockedDocumentsModel } from "../models/payload/payload-locked-documents";
import { payloadPayloadLockedDocumentsRelsModel } from "../models/payload/payload-locked-documents-rels";
import { payloadPayloadMigrationsModel } from "../models/payload/payload-migrations";
import { payloadPayloadPreferencesModel } from "../models/payload/payload-preferences";
import { payloadPayloadPreferencesRelsModel } from "../models/payload/payload-preferences-rels";
import { payloadPostsModel } from "../models/payload/posts";
import { payloadSignupFormConfigModel } from "../models/payload/signup-form-config";
import { payloadUpsellsModel } from "../models/payload/upsells";
import { payloadUpsellsConditionsModel } from "../models/payload/upsells-conditions";
import { payloadUpsellsRelsModel } from "../models/payload/upsells-rels";
import { payloadUsersModel } from "../models/payload/users";
import { payloadUsersSessionsModel } from "../models/payload/users-sessions";
import { payloadWorkflowBinsModel } from "../models/payload/workflow-bins";
import { payloadWorkflowBinsRelsModel } from "../models/payload/workflow-bins-rels";
import { payloadWorkflowStepsModel } from "../models/payload/workflow-steps";
import { payloadWorkflowsModel } from "../models/payload/workflows";
import { payloadWorkflowsRelsModel } from "../models/payload/workflows-rels";

export const payloadSchema = defineSchema({
	admin_ip_allowlist: payloadAdminIpAllowlistModel,
	case_buckets: payloadCaseBucketsModel,
	case_severities: payloadCaseSeveritiesModel,
	case_statuses: payloadCaseStatusesModel,
	document_types: payloadDocumentTypesModel,
	document_types_rels: payloadDocumentTypesRelsModel,
	email_audiences: payloadEmailAudiencesModel,
	email_audiences_emails: payloadEmailAudiencesEmailsModel,
	email_audiences_rels: payloadEmailAudiencesRelsModel,
	email_logs: payloadEmailLogsModel,
	email_sends: payloadEmailSendsModel,
	email_templates: payloadEmailTemplatesModel,
	email_templates_blocks_bullet_list:
		payloadEmailTemplatesBlocksBulletListModel,
	email_templates_blocks_bullet_list_items:
		payloadEmailTemplatesBlocksBulletListItemsModel,
	email_templates_blocks_button: payloadEmailTemplatesBlocksButtonModel,
	email_templates_blocks_details: payloadEmailTemplatesBlocksDetailsModel,
	email_templates_blocks_details_rows:
		payloadEmailTemplatesBlocksDetailsRowsModel,
	email_templates_blocks_heading: payloadEmailTemplatesBlocksHeadingModel,
	email_templates_blocks_paragraph: payloadEmailTemplatesBlocksParagraphModel,
	feature_flags: payloadFeatureFlagsModel,
	feature_flags_allow_emails: payloadFeatureFlagsAllowEmailsModel,
	feature_flags_allow_user_ids: payloadFeatureFlagsAllowUserIdsModel,
	feature_flags_environments: payloadFeatureFlagsEnvironmentsModel,
	form_submissions: payloadFormSubmissionsModel,
	form_submissions_submission_data: payloadFormSubmissionsSubmissionDataModel,
	formation_access_groups: payloadFormationAccessGroupsModel,
	formation_access_groups_formations_ids:
		payloadFormationAccessGroupsFormationsIdsModel,
	formation_access_groups_granted_user_ids:
		payloadFormationAccessGroupsGrantedUserIdsModel,
	formation_alert_audiences: payloadFormationAlertAudiencesModel,
	formation_alert_audiences_emails: payloadFormationAlertAudiencesEmailsModel,
	formation_jurisdictions: payloadFormationJurisdictionsModel,
	formation_jurisdictions_rels: payloadFormationJurisdictionsRelsModel,
	forms: payloadFormsModel,
	forms_blocks_checkbox: payloadFormsBlocksCheckboxModel,
	forms_blocks_country: payloadFormsBlocksCountryModel,
	forms_blocks_date: payloadFormsBlocksDateModel,
	forms_blocks_email: payloadFormsBlocksEmailModel,
	forms_blocks_message: payloadFormsBlocksMessageModel,
	forms_blocks_number: payloadFormsBlocksNumberModel,
	forms_blocks_payment: payloadFormsBlocksPaymentModel,
	forms_blocks_payment_price_conditions:
		payloadFormsBlocksPaymentPriceConditionsModel,
	forms_blocks_phone_number: payloadFormsBlocksPhoneNumberModel,
	forms_blocks_select: payloadFormsBlocksSelectModel,
	forms_blocks_select_options: payloadFormsBlocksSelectOptionsModel,
	forms_blocks_state: payloadFormsBlocksStateModel,
	forms_blocks_summary: payloadFormsBlocksSummaryModel,
	forms_blocks_summary_sections: payloadFormsBlocksSummarySectionsModel,
	forms_blocks_text: payloadFormsBlocksTextModel,
	forms_blocks_textarea: payloadFormsBlocksTextareaModel,
	forms_dynamic_sections: payloadFormsDynamicSectionsModel,
	forms_dynamic_sections_fields: payloadFormsDynamicSectionsFieldsModel,
	forms_dynamic_sections_fields_options:
		payloadFormsDynamicSectionsFieldsOptionsModel,
	forms_emails: payloadFormsEmailsModel,
	forms_page_definitions: payloadFormsPageDefinitionsModel,
	forms_pages: payloadFormsPagesModel,
	forms_pages_fields: payloadFormsPagesFieldsModel,
	forms_pages_fields_options: payloadFormsPagesFieldsOptionsModel,
	forms_pending_form_routes: payloadFormsPendingFormRoutesModel,
	forms_rels: payloadFormsRelsModel,
	legal: payloadLegalModel,
	media: payloadMediaModel,
	mollie_audit_log: payloadMollieAuditLogModel,
	mollie_balances: payloadMollieBalancesModel,
	mollie_chargebacks: payloadMollieChargebacksModel,
	mollie_config: payloadMollieConfigModel,
	mollie_customers: payloadMollieCustomersModel,
	mollie_invoices: payloadMollieInvoicesModel,
	mollie_merchant_invoices: payloadMollieMerchantInvoicesModel,
	mollie_methods: payloadMollieMethodsModel,
	mollie_payment_links: payloadMolliePaymentLinksModel,
	mollie_payment_links_stacked_products:
		payloadMolliePaymentLinksStackedProductsModel,
	mollie_payment_links_stacked_upsells:
		payloadMolliePaymentLinksStackedUpsellsModel,
	mollie_payments: payloadMolliePaymentsModel,
	mollie_products: payloadMollieProductsModel,
	mollie_refunds: payloadMollieRefundsModel,
	mollie_request_log: payloadMollieRequestLogModel,
	mollie_sales_invoices: payloadMollieSalesInvoicesModel,
	mollie_subscriptions: payloadMollieSubscriptionsModel,
	mollie_sync_log: payloadMollieSyncLogModel,
	mollie_webhooks: payloadMollieWebhooksModel,
	onboarding_guided_tour_config: payloadOnboardingGuidedTourConfigModel,
	onboarding_guided_tour_config_steps:
		payloadOnboardingGuidedTourConfigStepsModel,
	payload_kv: payloadPayloadKvModel,
	payload_locked_documents: payloadPayloadLockedDocumentsModel,
	payload_locked_documents_rels: payloadPayloadLockedDocumentsRelsModel,
	payload_migrations: payloadPayloadMigrationsModel,
	payload_preferences: payloadPayloadPreferencesModel,
	payload_preferences_rels: payloadPayloadPreferencesRelsModel,
	posts: payloadPostsModel,
	signup_form_config: payloadSignupFormConfigModel,
	upsells: payloadUpsellsModel,
	upsells_conditions: payloadUpsellsConditionsModel,
	upsells_rels: payloadUpsellsRelsModel,
	users: payloadUsersModel,
	users_sessions: payloadUsersSessionsModel,
	workflow_bins: payloadWorkflowBinsModel,
	workflow_bins_rels: payloadWorkflowBinsRelsModel,
	workflow_steps: payloadWorkflowStepsModel,
	workflows: payloadWorkflowsModel,
	workflows_rels: payloadWorkflowsRelsModel,
});
