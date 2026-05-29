import { defineModel } from "@xylex-group/athena";

export interface PayloadPayloadLockedDocumentsRelsRow {
	admin_ip_allowlist_id?: number | null;
	case_buckets_id?: number | null;
	case_severities_id?: number | null;
	case_statuses_id?: number | null;
	cases_id?: string | null;
	document_types_id?: number | null;
	email_audiences_id?: number | null;
	email_logs_id?: number | null;
	email_sends_id?: number | null;
	email_templates_id?: number | null;
	feature_flags_id?: number | null;
	form_submissions_id?: number | null;
	formation_access_groups_id?: number | null;
	formation_alert_audiences_id?: number | null;
	formation_jurisdictions_id?: number | null;
	formations_id?: string | null;
	forms_id?: number | null;
	id: number;
	legal_id?: number | null;
	media_id?: number | null;
	member_id?: string | null;
	mollie_audit_log_id?: number | null;
	mollie_balances_id?: number | null;
	mollie_chargebacks_id?: number | null;
	mollie_config_id?: number | null;
	mollie_customers_id?: number | null;
	mollie_invoices_id?: number | null;
	mollie_merchant_invoices_id?: number | null;
	mollie_methods_id?: number | null;
	mollie_payment_links_id?: number | null;
	mollie_payments_id?: number | null;
	mollie_products_id?: number | null;
	mollie_refunds_id?: number | null;
	mollie_request_log_id?: number | null;
	mollie_sales_invoices_id?: number | null;
	mollie_subscriptions_id?: number | null;
	mollie_sync_log_id?: number | null;
	mollie_webhooks_id?: number | null;
	order?: number | null;
	organization_id?: string | null;
	parent_id: number;
	path: string;
	posts_id?: number | null;
	upsells_id?: number | null;
	users_id?: number | null;
	workflow_bins_id?: number | null;
	workflow_steps_id?: number | null;
	workflows_id?: number | null;
}

export type PayloadPayloadLockedDocumentsRelsInsert =
	Partial<PayloadPayloadLockedDocumentsRelsRow>;
export type PayloadPayloadLockedDocumentsRelsUpdate =
	Partial<PayloadPayloadLockedDocumentsRelsInsert>;

export const payloadPayloadLockedDocumentsRelsModel = defineModel<
	PayloadPayloadLockedDocumentsRelsRow,
	PayloadPayloadLockedDocumentsRelsInsert,
	PayloadPayloadLockedDocumentsRelsUpdate
>({
	meta: {
		database: "railway",
		schema: "payload",
		model: "payload_locked_documents_rels",
		tableName: "payload.payload_locked_documents_rels",
		primaryKey: ["id"],
		nullable: {
			id: false,
			order: true,
			parent_id: false,
			path: false,
			users_id: true,
			media_id: true,
			legal_id: true,
			posts_id: true,
			forms_id: true,
			form_submissions_id: true,
			email_templates_id: true,
			formation_alert_audiences_id: true,
			formation_access_groups_id: true,
			upsells_id: true,
			formation_jurisdictions_id: true,
			document_types_id: true,
			workflow_bins_id: true,
			feature_flags_id: true,
			admin_ip_allowlist_id: true,
			workflows_id: true,
			workflow_steps_id: true,
			case_buckets_id: true,
			case_severities_id: true,
			case_statuses_id: true,
			mollie_customers_id: true,
			mollie_payment_links_id: true,
			mollie_merchant_invoices_id: true,
			mollie_sales_invoices_id: true,
			mollie_config_id: true,
			mollie_products_id: true,
			mollie_payments_id: true,
			mollie_refunds_id: true,
			mollie_invoices_id: true,
			mollie_balances_id: true,
			mollie_audit_log_id: true,
			mollie_webhooks_id: true,
			mollie_sync_log_id: true,
			mollie_methods_id: true,
			mollie_chargebacks_id: true,
			mollie_subscriptions_id: true,
			mollie_request_log_id: true,
			email_logs_id: true,
			email_audiences_id: true,
			email_sends_id: true,
			organization_id: true,
			member_id: true,
			formations_id: true,
			cases_id: true,
		},
		relations: {
			payload_locked_documents_rels_admin_ip_allowlist_fk_admin_ip_allowlist: {
				kind: "many-to-one",
				sourceColumns: ["admin_ip_allowlist_id"],
				targetSchema: "payload",
				targetModel: "admin_ip_allowlist",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_case_buckets_fk_case_buckets: {
				kind: "many-to-one",
				sourceColumns: ["case_buckets_id"],
				targetSchema: "payload",
				targetModel: "case_buckets",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_case_severities_fk_case_severities: {
				kind: "many-to-one",
				sourceColumns: ["case_severities_id"],
				targetSchema: "payload",
				targetModel: "case_severities",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_case_statuses_fk_case_statuses: {
				kind: "many-to-one",
				sourceColumns: ["case_statuses_id"],
				targetSchema: "payload",
				targetModel: "case_statuses",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_document_types_fk_document_types: {
				kind: "many-to-one",
				sourceColumns: ["document_types_id"],
				targetSchema: "payload",
				targetModel: "document_types",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_email_audiences_fk_email_audiences: {
				kind: "many-to-one",
				sourceColumns: ["email_audiences_id"],
				targetSchema: "payload",
				targetModel: "email_audiences",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_email_logs_fk_email_logs: {
				kind: "many-to-one",
				sourceColumns: ["email_logs_id"],
				targetSchema: "payload",
				targetModel: "email_logs",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_email_sends_fk_email_sends: {
				kind: "many-to-one",
				sourceColumns: ["email_sends_id"],
				targetSchema: "payload",
				targetModel: "email_sends",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_email_templates_fk_email_templates: {
				kind: "many-to-one",
				sourceColumns: ["email_templates_id"],
				targetSchema: "payload",
				targetModel: "email_templates",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_feature_flags_fk_feature_flags: {
				kind: "many-to-one",
				sourceColumns: ["feature_flags_id"],
				targetSchema: "payload",
				targetModel: "feature_flags",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_form_submissions_fk_form_submissions: {
				kind: "many-to-one",
				sourceColumns: ["form_submissions_id"],
				targetSchema: "payload",
				targetModel: "form_submissions",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_formation_access_groups_fk_formation_access_groups:
				{
					kind: "many-to-one",
					sourceColumns: ["formation_access_groups_id"],
					targetSchema: "payload",
					targetModel: "formation_access_groups",
					targetColumns: ["id"],
				},
			payload_locked_documents_rels_formation_alert_audiences_fk_formation_alert_audiences:
				{
					kind: "many-to-one",
					sourceColumns: ["formation_alert_audiences_id"],
					targetSchema: "payload",
					targetModel: "formation_alert_audiences",
					targetColumns: ["id"],
				},
			payload_locked_documents_rels_formation_jurisdictions_fk_formation_jurisdictions:
				{
					kind: "many-to-one",
					sourceColumns: ["formation_jurisdictions_id"],
					targetSchema: "payload",
					targetModel: "formation_jurisdictions",
					targetColumns: ["id"],
				},
			payload_locked_documents_rels_forms_fk_forms: {
				kind: "many-to-one",
				sourceColumns: ["forms_id"],
				targetSchema: "payload",
				targetModel: "forms",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_legal_fk_legal: {
				kind: "many-to-one",
				sourceColumns: ["legal_id"],
				targetSchema: "payload",
				targetModel: "legal",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_media_fk_media: {
				kind: "many-to-one",
				sourceColumns: ["media_id"],
				targetSchema: "payload",
				targetModel: "media",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_mollie_audit_log_fk_mollie_audit_log: {
				kind: "many-to-one",
				sourceColumns: ["mollie_audit_log_id"],
				targetSchema: "payload",
				targetModel: "mollie_audit_log",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_mollie_balances_fk_mollie_balances: {
				kind: "many-to-one",
				sourceColumns: ["mollie_balances_id"],
				targetSchema: "payload",
				targetModel: "mollie_balances",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_mollie_chargebacks_fk_mollie_chargebacks: {
				kind: "many-to-one",
				sourceColumns: ["mollie_chargebacks_id"],
				targetSchema: "payload",
				targetModel: "mollie_chargebacks",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_mollie_config_fk_mollie_config: {
				kind: "many-to-one",
				sourceColumns: ["mollie_config_id"],
				targetSchema: "payload",
				targetModel: "mollie_config",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_mollie_customers_fk_mollie_customers: {
				kind: "many-to-one",
				sourceColumns: ["mollie_customers_id"],
				targetSchema: "payload",
				targetModel: "mollie_customers",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_mollie_invoices_fk_mollie_invoices: {
				kind: "many-to-one",
				sourceColumns: ["mollie_invoices_id"],
				targetSchema: "payload",
				targetModel: "mollie_invoices",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_mollie_merchant_invoices_fk_mollie_merchant_invoices:
				{
					kind: "many-to-one",
					sourceColumns: ["mollie_merchant_invoices_id"],
					targetSchema: "payload",
					targetModel: "mollie_merchant_invoices",
					targetColumns: ["id"],
				},
			payload_locked_documents_rels_mollie_methods_fk_mollie_methods: {
				kind: "many-to-one",
				sourceColumns: ["mollie_methods_id"],
				targetSchema: "payload",
				targetModel: "mollie_methods",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_mollie_payment_links_fk_mollie_payment_links:
				{
					kind: "many-to-one",
					sourceColumns: ["mollie_payment_links_id"],
					targetSchema: "payload",
					targetModel: "mollie_payment_links",
					targetColumns: ["id"],
				},
			payload_locked_documents_rels_mollie_payments_fk_mollie_payments: {
				kind: "many-to-one",
				sourceColumns: ["mollie_payments_id"],
				targetSchema: "payload",
				targetModel: "mollie_payments",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_mollie_products_fk_mollie_products: {
				kind: "many-to-one",
				sourceColumns: ["mollie_products_id"],
				targetSchema: "payload",
				targetModel: "mollie_products",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_mollie_refunds_fk_mollie_refunds: {
				kind: "many-to-one",
				sourceColumns: ["mollie_refunds_id"],
				targetSchema: "payload",
				targetModel: "mollie_refunds",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_mollie_request_log_fk_mollie_request_log: {
				kind: "many-to-one",
				sourceColumns: ["mollie_request_log_id"],
				targetSchema: "payload",
				targetModel: "mollie_request_log",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_mollie_sales_invoices_fk_mollie_sales_invoices:
				{
					kind: "many-to-one",
					sourceColumns: ["mollie_sales_invoices_id"],
					targetSchema: "payload",
					targetModel: "mollie_sales_invoices",
					targetColumns: ["id"],
				},
			payload_locked_documents_rels_mollie_subscriptions_fk_mollie_subscriptions:
				{
					kind: "many-to-one",
					sourceColumns: ["mollie_subscriptions_id"],
					targetSchema: "payload",
					targetModel: "mollie_subscriptions",
					targetColumns: ["id"],
				},
			payload_locked_documents_rels_mollie_sync_log_fk_mollie_sync_log: {
				kind: "many-to-one",
				sourceColumns: ["mollie_sync_log_id"],
				targetSchema: "payload",
				targetModel: "mollie_sync_log",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_mollie_webhooks_fk_mollie_webhooks: {
				kind: "many-to-one",
				sourceColumns: ["mollie_webhooks_id"],
				targetSchema: "payload",
				targetModel: "mollie_webhooks",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_parent_fk_payload_locked_documents: {
				kind: "many-to-one",
				sourceColumns: ["parent_id"],
				targetSchema: "payload",
				targetModel: "payload_locked_documents",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_posts_fk_posts: {
				kind: "many-to-one",
				sourceColumns: ["posts_id"],
				targetSchema: "payload",
				targetModel: "posts",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_upsells_fk_upsells: {
				kind: "many-to-one",
				sourceColumns: ["upsells_id"],
				targetSchema: "payload",
				targetModel: "upsells",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_users_fk_users: {
				kind: "many-to-one",
				sourceColumns: ["users_id"],
				targetSchema: "payload",
				targetModel: "users",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_workflow_bins_fk_workflow_bins: {
				kind: "many-to-one",
				sourceColumns: ["workflow_bins_id"],
				targetSchema: "payload",
				targetModel: "workflow_bins",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_workflow_steps_fk_workflow_steps: {
				kind: "many-to-one",
				sourceColumns: ["workflow_steps_id"],
				targetSchema: "payload",
				targetModel: "workflow_steps",
				targetColumns: ["id"],
			},
			payload_locked_documents_rels_workflows_fk_workflows: {
				kind: "many-to-one",
				sourceColumns: ["workflows_id"],
				targetSchema: "payload",
				targetModel: "workflows",
				targetColumns: ["id"],
			},
		},
	},
});
