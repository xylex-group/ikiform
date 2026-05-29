import { defineSchema } from "@xylex-group/athena";

import { publicAccountModel } from "../models/public/account";
import { publicAccountsModel } from "../models/public/accounts";
import { publicAddressesModel } from "../models/public/addresses";
import { publicAdminAuditLogsModel } from "../models/public/admin-audit-logs";
import { publicApiKeysModel } from "../models/public/api-keys";
import { publicApikeyModel } from "../models/public/apikey";
import { publicAppointmentsModel } from "../models/public/appointments";
import { publicAuditLogModel } from "../models/public/audit-log";
import { publicAuditLogActionsModel } from "../models/public/audit-log-actions";
import { publicAuditLogAuthModel } from "../models/public/audit-log-auth";
import { publicAuroraDocumentTypesModel } from "../models/public/aurora-document-types";
import { publicAuroraFoundryModel } from "../models/public/aurora-foundry";
import { publicAuroraKeysModel } from "../models/public/aurora-keys";
import { publicAuroraKycRequestsModel } from "../models/public/aurora-kyc-requests";
import { publicAuroraLanguageSupportModel } from "../models/public/aurora-language-support";
import { publicAuroraLineItemsModel } from "../models/public/aurora-line-items";
import { publicAuroraLogsModel } from "../models/public/aurora-logs";
import { publicAuroraMerchantsModel } from "../models/public/aurora-merchants";
import { publicAuroraParserRulesModel } from "../models/public/aurora-parser-rules";
import { publicAuroraRequestsModel } from "../models/public/aurora-requests";
import { publicBlacklistedEmailsModel } from "../models/public/blacklisted-emails";
import { publicBugReportsiosModel } from "../models/public/bug-reportsios";
import { publicCalendarEventsModel } from "../models/public/calendar-events";
import { publicCaseEventsModel } from "../models/public/case-events";
import { publicCaseScopesModel } from "../models/public/case-scopes";
import { publicCaseTasksModel } from "../models/public/case-tasks";
import { publicCasesModel } from "../models/public/cases";
import { publicCasesActivityModel } from "../models/public/cases-activity";
import { publicCategoriesModel } from "../models/public/categories";
import { publicChangelogModel } from "../models/public/changelog";
import { publicChatSubscriptionsModel } from "../models/public/chat-subscriptions";
import { publicClientStatisticsModel } from "../models/public/client-statistics";
import { publicConnectClientStatusModel } from "../models/public/connect-client-status";
import { publicContactPersonsModel } from "../models/public/contact-persons";
import { publicContactsModel } from "../models/public/contacts";
import { publicCustomerJurisdictionsModel } from "../models/public/customer-jurisdictions";
import { publicCustomerMessagesModel } from "../models/public/customer-messages";
import { publicCustomerSettingsModel } from "../models/public/customer-settings";
import { publicCustomerTypesModel } from "../models/public/customer-types";
import { publicCustomersModel } from "../models/public/customers";
import { publicDashboardConfigModel } from "../models/public/dashboard-config";
import { publicDashboardPresetModel } from "../models/public/dashboard-preset";
import { publicDefaultCalendarEventsModel } from "../models/public/default-calendar-events";
import { publicDocumentFoldersModel } from "../models/public/document-folders";
import { publicDocumentsModel } from "../models/public/documents";
import { publicEmailTemplatesModel } from "../models/public/email-templates";
import { publicEmailsModel } from "../models/public/emails";
import { publicEventLogModel } from "../models/public/event-log";
import { publicEventLogApiModel } from "../models/public/event-log-api";
import { publicEventLogConnectIosModel } from "../models/public/event-log-connect-ios";
import { publicExpotokensModel } from "../models/public/expotokens";
import { publicFeatureFlagsModel } from "../models/public/feature-flags";
import { publicFilesModel } from "../models/public/files";
import { publicFlagsModel } from "../models/public/flags";
import { publicFormSessionsModel } from "../models/public/form-sessions";
import { publicFormationsModel } from "../models/public/formations";
import { publicFormationsActivityModel } from "../models/public/formations-activity";
import { publicFormationsAdminLevelsModel } from "../models/public/formations-admin-levels";
import { publicFormationsStagesModel } from "../models/public/formations-stages";
import { publicFormsPayloadSubmissionsModel } from "../models/public/forms-payload-submissions";
import { publicFormsV2FormsModel } from "../models/public/forms-v2-forms";
import { publicFormsV2SubmissionsModel } from "../models/public/forms-v2-submissions";
import { publicGlAccountsModel } from "../models/public/gl-accounts";
import { publicIncomingEmailsModel } from "../models/public/incoming-emails";
import { publicIntegrationModel } from "../models/public/integration";
import { publicIntegrationRegistryModel } from "../models/public/integration-registry";
import { publicInvitationModel } from "../models/public/invitation";
import { publicInvoiceGroupsModel } from "../models/public/invoice-groups";
import { publicInvoiceLogsModel } from "../models/public/invoice-logs";
import { publicInvoiceSettingsModel } from "../models/public/invoice-settings";
import { publicInvoiceTemplatesModel } from "../models/public/invoice-templates";
import { publicInvoiceViewsModel } from "../models/public/invoice-views";
import { publicInvoicesModel } from "../models/public/invoices";
import { publicKanbanInitiativesModel } from "../models/public/kanban-initiatives";
import { publicKanbanLabelsModel } from "../models/public/kanban-labels";
import { publicKanbanParentProjectsModel } from "../models/public/kanban-parent-projects";
import { publicKanbanProjectsModel } from "../models/public/kanban-projects";
import { publicLineItemInvoiceModel } from "../models/public/line-item-invoice";
import { publicLogsAuthModel } from "../models/public/logs-auth";
import { publicMcpConnectionsModel } from "../models/public/mcp-connections";
import { publicMemberModel } from "../models/public/member";
import { publicMolieSalesInvoicesModel } from "../models/public/molie-sales-invoices";
import { publicMollieAccountsModel } from "../models/public/mollie-accounts";
import { publicMollieAuditLogModel } from "../models/public/mollie-audit-log";
import { publicMollieBalancesModel } from "../models/public/mollie-balances";
import { publicMollieChargebacksModel } from "../models/public/mollie-chargebacks";
import { publicMollieConfigModel } from "../models/public/mollie-config";
import { publicMollieCustomersModel } from "../models/public/mollie-customers";
import { publicMollieInvoicesModel } from "../models/public/mollie-invoices";
import { publicMollieMerchantInvoicesModel } from "../models/public/mollie-merchant-invoices";
import { publicMollieMethodsModel } from "../models/public/mollie-methods";
import { publicMolliePaymentLinksModel } from "../models/public/mollie-payment-links";
import { publicMolliePaymentLinksStackedProductsModel } from "../models/public/mollie-payment-links-stacked-products";
import { publicMolliePaymentLinksStackedUpsellsModel } from "../models/public/mollie-payment-links-stacked-upsells";
import { publicMolliePaymentsModel } from "../models/public/mollie-payments";
import { publicMollieProductsModel } from "../models/public/mollie-products";
import { publicMollieRefundsModel } from "../models/public/mollie-refunds";
import { publicMollieRequestLogModel } from "../models/public/mollie-request-log";
import { publicMollieSalesInvoicesModel } from "../models/public/mollie-sales-invoices";
import { publicMollieSubscriptionsModel } from "../models/public/mollie-subscriptions";
import { publicMollieSyncLogModel } from "../models/public/mollie-sync-log";
import { publicMollieWebhooksModel } from "../models/public/mollie-webhooks";
import { publicNotificationSettingsModel } from "../models/public/notification-settings";
import { publicNotificationsModel } from "../models/public/notifications";
import { publicOrganizationModel } from "../models/public/organization";
import { publicOrganizationCaseCountersModel } from "../models/public/organization-case-counters";
import { publicOrganizationCustomerModel } from "../models/public/organization-customer";
import { publicOrganizationMessagesModel } from "../models/public/organization-messages";
import { publicPasskeyModel } from "../models/public/passkey";
import { publicPaymentMethodsModel } from "../models/public/payment-methods";
import { publicPeppolInvoicesModel } from "../models/public/peppol-invoices";
import { publicPreferencesModel } from "../models/public/preferences";
import { publicPresignedGetUrlCacheModel } from "../models/public/presigned-get-url-cache";
import { publicPricesModel } from "../models/public/prices";
import { publicProductTaxCodesModel } from "../models/public/product-tax-codes";
import { publicProductsModel } from "../models/public/products";
import { publicResourceChartsModel } from "../models/public/resource-charts";
import { publicResourceFormsModel } from "../models/public/resource-forms";
import { publicResourceRoutesModel } from "../models/public/resource-routes";
import { publicRsfChatAttachmentsModel } from "../models/public/rsf-chat-attachments";
import { publicRsfChatRoomMembersModel } from "../models/public/rsf-chat-room-members";
import { publicRsfChatRoomsModel } from "../models/public/rsf-chat-rooms";
import { publicRsfMediaModel } from "../models/public/rsf-media";
import { publicRsfMessageMediaModel } from "../models/public/rsf-message-media";
import { publicRsfMessageReactionsModel } from "../models/public/rsf-message-reactions";
import { publicRsfMessagesModel } from "../models/public/rsf-messages";
import { publicRsfReadReceiptsModel } from "../models/public/rsf-read-receipts";
import { publicRsfTypingIndicatorsModel } from "../models/public/rsf-typing-indicators";
import { publicScheduledEmailsModel } from "../models/public/scheduled-emails";
import { publicSessionModel } from "../models/public/session";
import { publicSessionsModel } from "../models/public/sessions";
import { publicSettingsFormationsModel } from "../models/public/settings-formations";
import { publicSettingsNotificationsModel } from "../models/public/settings-notifications";
import { publicSfFormationsCasesModel } from "../models/public/sf-formations-cases";
import { publicSqlQueriesModel } from "../models/public/sql-queries";
import { publicSsoProviderModel } from "../models/public/sso-provider";
import { publicSystemEmailsModel } from "../models/public/system-emails";
import { publicTasksModel } from "../models/public/tasks";
import { publicTasksActivityModel } from "../models/public/tasks-activity";
import { publicTicketChatsModel } from "../models/public/ticket-chats";
import { publicTicketMessagesModel } from "../models/public/ticket-messages";
import { publicTicketsModel } from "../models/public/tickets";
import { publicTransactionRulesModel } from "../models/public/transaction-rules";
import { publicTransactionsModel } from "../models/public/transactions";
import { publicTwoFactorModel } from "../models/public/two-factor";
import { publicUserModel } from "../models/public/user";
import { publicUserPermissionScopesModel } from "../models/public/user-permission-scopes";
import { publicUserPreferenceModel } from "../models/public/user-preference";
import { publicUserPreferencesModel } from "../models/public/user-preferences";
import { publicUserSettingsModel } from "../models/public/user-settings";
import { publicUsersModel } from "../models/public/users";
import { publicUsersSessionsModel } from "../models/public/users-sessions";
import { publicVerificationModel } from "../models/public/verification";
import { publicVerificationsModel } from "../models/public/verifications";
import { publicWorkflowAuditLogsModel } from "../models/public/workflow-audit-logs";
import { publicWorkflowInstancesModel } from "../models/public/workflow-instances";
import { publicWorkflowLogsModel } from "../models/public/workflow-logs";
import { publicWorkflowRequirementDefinitionsModel } from "../models/public/workflow-requirement-definitions";
import { publicWorkflowRequirementsModel } from "../models/public/workflow-requirements";
import { publicWorkflowStatusTransitionsModel } from "../models/public/workflow-status-transitions";
import { publicWorkflowStatusesModel } from "../models/public/workflow-statuses";
import { publicWorkflowTemplateVersionsModel } from "../models/public/workflow-template-versions";
import { publicWorkflowTemplatesModel } from "../models/public/workflow-templates";
import { publicWorkspacesModel } from "../models/public/workspaces";

export const publicSchema = defineSchema({
	account: publicAccountModel,
	accounts: publicAccountsModel,
	addresses: publicAddressesModel,
	admin_audit_logs: publicAdminAuditLogsModel,
	api_keys: publicApiKeysModel,
	apikey: publicApikeyModel,
	appointments: publicAppointmentsModel,
	audit_log: publicAuditLogModel,
	audit_log_actions: publicAuditLogActionsModel,
	audit_log_auth: publicAuditLogAuthModel,
	aurora_document_types: publicAuroraDocumentTypesModel,
	aurora_foundry: publicAuroraFoundryModel,
	aurora_keys: publicAuroraKeysModel,
	aurora_kyc_requests: publicAuroraKycRequestsModel,
	aurora_language_support: publicAuroraLanguageSupportModel,
	aurora_line_items: publicAuroraLineItemsModel,
	aurora_logs: publicAuroraLogsModel,
	aurora_merchants: publicAuroraMerchantsModel,
	aurora_parser_rules: publicAuroraParserRulesModel,
	aurora_requests: publicAuroraRequestsModel,
	blacklisted_emails: publicBlacklistedEmailsModel,
	bug_reportsios: publicBugReportsiosModel,
	calendar_events: publicCalendarEventsModel,
	case_events: publicCaseEventsModel,
	case_scopes: publicCaseScopesModel,
	case_tasks: publicCaseTasksModel,
	cases: publicCasesModel,
	cases_activity: publicCasesActivityModel,
	categories: publicCategoriesModel,
	changelog: publicChangelogModel,
	chat_subscriptions: publicChatSubscriptionsModel,
	client_statistics: publicClientStatisticsModel,
	connect_client_status: publicConnectClientStatusModel,
	contact_persons: publicContactPersonsModel,
	contacts: publicContactsModel,
	customer_jurisdictions: publicCustomerJurisdictionsModel,
	customer_messages: publicCustomerMessagesModel,
	customer_settings: publicCustomerSettingsModel,
	customer_types: publicCustomerTypesModel,
	customers: publicCustomersModel,
	dashboard_config: publicDashboardConfigModel,
	dashboard_preset: publicDashboardPresetModel,
	default_calendar_events: publicDefaultCalendarEventsModel,
	document_folders: publicDocumentFoldersModel,
	documents: publicDocumentsModel,
	email_templates: publicEmailTemplatesModel,
	emails: publicEmailsModel,
	event_log: publicEventLogModel,
	event_log_api: publicEventLogApiModel,
	event_log_connect_ios: publicEventLogConnectIosModel,
	expotokens: publicExpotokensModel,
	feature_flags: publicFeatureFlagsModel,
	files: publicFilesModel,
	flags: publicFlagsModel,
	form_sessions: publicFormSessionsModel,
	formations: publicFormationsModel,
	formations_activity: publicFormationsActivityModel,
	formations_admin_levels: publicFormationsAdminLevelsModel,
	formations_stages: publicFormationsStagesModel,
	forms_payload_submissions: publicFormsPayloadSubmissionsModel,
	forms_v2_forms: publicFormsV2FormsModel,
	forms_v2_submissions: publicFormsV2SubmissionsModel,
	gl_accounts: publicGlAccountsModel,
	incoming_emails: publicIncomingEmailsModel,
	integration: publicIntegrationModel,
	integration_registry: publicIntegrationRegistryModel,
	invitation: publicInvitationModel,
	invoice_groups: publicInvoiceGroupsModel,
	invoice_logs: publicInvoiceLogsModel,
	invoice_settings: publicInvoiceSettingsModel,
	invoice_templates: publicInvoiceTemplatesModel,
	invoice_views: publicInvoiceViewsModel,
	invoices: publicInvoicesModel,
	kanban_initiatives: publicKanbanInitiativesModel,
	kanban_labels: publicKanbanLabelsModel,
	kanban_parent_projects: publicKanbanParentProjectsModel,
	kanban_projects: publicKanbanProjectsModel,
	line_item_invoice: publicLineItemInvoiceModel,
	logs_auth: publicLogsAuthModel,
	mcp_connections: publicMcpConnectionsModel,
	member: publicMemberModel,
	molie_sales_invoices: publicMolieSalesInvoicesModel,
	mollie_accounts: publicMollieAccountsModel,
	mollie_audit_log: publicMollieAuditLogModel,
	mollie_balances: publicMollieBalancesModel,
	mollie_chargebacks: publicMollieChargebacksModel,
	mollie_config: publicMollieConfigModel,
	mollie_customers: publicMollieCustomersModel,
	mollie_invoices: publicMollieInvoicesModel,
	mollie_merchant_invoices: publicMollieMerchantInvoicesModel,
	mollie_methods: publicMollieMethodsModel,
	mollie_payment_links: publicMolliePaymentLinksModel,
	mollie_payment_links_stacked_products:
		publicMolliePaymentLinksStackedProductsModel,
	mollie_payment_links_stacked_upsells:
		publicMolliePaymentLinksStackedUpsellsModel,
	mollie_payments: publicMolliePaymentsModel,
	mollie_products: publicMollieProductsModel,
	mollie_refunds: publicMollieRefundsModel,
	mollie_request_log: publicMollieRequestLogModel,
	mollie_sales_invoices: publicMollieSalesInvoicesModel,
	mollie_subscriptions: publicMollieSubscriptionsModel,
	mollie_sync_log: publicMollieSyncLogModel,
	mollie_webhooks: publicMollieWebhooksModel,
	notification_settings: publicNotificationSettingsModel,
	notifications: publicNotificationsModel,
	organization: publicOrganizationModel,
	organization_case_counters: publicOrganizationCaseCountersModel,
	organization_customer: publicOrganizationCustomerModel,
	organization_messages: publicOrganizationMessagesModel,
	passkey: publicPasskeyModel,
	payment_methods: publicPaymentMethodsModel,
	peppol_invoices: publicPeppolInvoicesModel,
	preferences: publicPreferencesModel,
	presigned_get_url_cache: publicPresignedGetUrlCacheModel,
	prices: publicPricesModel,
	product_tax_codes: publicProductTaxCodesModel,
	products: publicProductsModel,
	resource_charts: publicResourceChartsModel,
	resource_forms: publicResourceFormsModel,
	resource_routes: publicResourceRoutesModel,
	rsf_chat_attachments: publicRsfChatAttachmentsModel,
	rsf_chat_room_members: publicRsfChatRoomMembersModel,
	rsf_chat_rooms: publicRsfChatRoomsModel,
	rsf_media: publicRsfMediaModel,
	rsf_message_media: publicRsfMessageMediaModel,
	rsf_message_reactions: publicRsfMessageReactionsModel,
	rsf_messages: publicRsfMessagesModel,
	rsf_read_receipts: publicRsfReadReceiptsModel,
	rsf_typing_indicators: publicRsfTypingIndicatorsModel,
	scheduled_emails: publicScheduledEmailsModel,
	session: publicSessionModel,
	sessions: publicSessionsModel,
	settings_formations: publicSettingsFormationsModel,
	settings_notifications: publicSettingsNotificationsModel,
	sf_formations_cases: publicSfFormationsCasesModel,
	sql_queries: publicSqlQueriesModel,
	sso_provider: publicSsoProviderModel,
	system_emails: publicSystemEmailsModel,
	tasks: publicTasksModel,
	tasks_activity: publicTasksActivityModel,
	ticket_chats: publicTicketChatsModel,
	ticket_messages: publicTicketMessagesModel,
	tickets: publicTicketsModel,
	transaction_rules: publicTransactionRulesModel,
	transactions: publicTransactionsModel,
	two_factor: publicTwoFactorModel,
	user: publicUserModel,
	user_permission_scopes: publicUserPermissionScopesModel,
	user_preference: publicUserPreferenceModel,
	user_preferences: publicUserPreferencesModel,
	user_settings: publicUserSettingsModel,
	users: publicUsersModel,
	users_sessions: publicUsersSessionsModel,
	verification: publicVerificationModel,
	verifications: publicVerificationsModel,
	workflow_audit_logs: publicWorkflowAuditLogsModel,
	workflow_instances: publicWorkflowInstancesModel,
	workflow_logs: publicWorkflowLogsModel,
	workflow_requirement_definitions: publicWorkflowRequirementDefinitionsModel,
	workflow_requirements: publicWorkflowRequirementsModel,
	workflow_status_transitions: publicWorkflowStatusTransitionsModel,
	workflow_statuses: publicWorkflowStatusesModel,
	workflow_template_versions: publicWorkflowTemplateVersionsModel,
	workflow_templates: publicWorkflowTemplatesModel,
	workspaces: publicWorkspacesModel,
});
