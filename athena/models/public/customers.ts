import { defineModel } from "@xylex-group/athena";

export interface PublicCustomersRow {
	account_manager?: string | null;
	accountant_id?: string | null;
	accountant_is_partner_backoffice?: boolean | null;
	accountant_name?: string | null;
	accounting_start_date?: string | null;
	address_line_2?: string | null;
	administration?: string | null;
	adverse_media_check_flags?: string | null;
	adverse_media_checked_at?: string | null;
	adverse_media_data_provider?: string | null;
	allow_self_accounting?: boolean | null;
	archive_hash?: string | null;
	archived_at?: string | null;
	avatar?: string | null;
	awaiting_deletion: boolean;
	birth_day?: string | null;
	bundle?: string | null;
	cash_management?: string | null;
	chatroom?: string | null;
	city?: string | null;
	closing_enabled?: boolean | null;
	comments?: string | null;
	companies?: string | null;
	company_country_number?: string | null;
	company_number?: string | null;
	consent_marketing_communications?: boolean | null;
	consent_marketing_communications_preferences?: string | null;
	consent_marketing_data_provider?: string | null;
	contact_name?: string | null;
	contract_start_date?: string | null;
	country?: string | null;
	created_at?: string | null;
	credit_debit_arrangements?: string | null;
	credit_debit_notes?: string | null;
	credit_hold_flags?: string | null;
	credit_limit?: string | null;
	currencies?: Record<string, unknown> | null;
	custom_tags?: Record<string, unknown> | null;
	customer_id: string;
	customer_jurisdiction?: string | null;
	customer_jurisdiction_id?: string | null;
	customer_success_manager?: string | null;
	customer_type_id?: string | null;
	data_provider?: string | null;
	data_provider_reference_id?: string | null;
	data_residency?: string | null;
	default_currency?: string | null;
	description?: string | null;
	domain?: string | null;
	domain_wildcard_email?: string | null;
	dpa_signed?: boolean | null;
	dpa_signed_at?: string | null;
	dpa_signed_url?: string | null;
	email?: string | null;
	first_name?: string | null;
	global_company_id?: string | null;
	group_structure?: Record<string, unknown> | null;
	has_business_registry_extract?: boolean | null;
	has_identity_card?: boolean | null;
	has_power_of_attorney?: boolean | null;
	has_source_of_funds?: boolean | null;
	has_source_of_wealth?: boolean | null;
	has_store_status?: boolean | null;
	has_ultimate_beneficial_owner_statement?: boolean | null;
	icp_return_frequency?: string | null;
	id: string;
	inactive_on?: string | null;
	internal_email_administration?: string | null;
	internal_email_support?: string | null;
	internal_phone_number?: string | null;
	invoicing_entity_legal_name?: string | null;
	is_article23?: boolean | null;
	is_ioss?: boolean | null;
	is_oss?: boolean | null;
	is_overdue?: boolean | null;
	is_partner_domain?: string | null;
	is_pep_sanction?: boolean | null;
	kyc_status?: string | null;
	label?: string | null;
	language?: string | null;
	language_invoice_and_quote?: string | null;
	last_invoice_at?: string | null;
	last_name?: string | null;
	last_seen_at?: string | null;
	lead_source?: string | null;
	legal_form?: string | null;
	main_contact_id?: string | null;
	metadata?: Record<string, unknown> | null;
	name?: string | null;
	note?: string | null;
	nsent_marketing_communications_given_at?: string | null;
	onboarded_by_user?: string | null;
	onboarding_approved?: boolean | null;
	onboarding_aproval_conditions?: string | null;
	onboarding_aproval_findings?: string | null;
	organization_id: string;
	owner?: string | null;
	payment_method_invoice?: string | null;
	payment_term_invoice?: string | null;
	payroll_withholding_number?: string | null;
	pep_sanction_checked_at?: string | null;
	person_number?: string | null;
	person_number_ref?: string | null;
	phone?: string | null;
	portal?: string | null;
	postal_code?: string | null;
	primary_ledger?: string | null;
	primary_ledger_tenant_id?: string | null;
	questions?: string | null;
	rating_amount_questions?: string | null;
	rating_difficult_admin?: string | null;
	rating_payments?: string | null;
	rating_responds_timely?: string | null;
	reverse_charged?: boolean | null;
	risk_rating?: string | null;
	salutations?: string | null;
	self_booking?: boolean | null;
	signed_contract?: string | null;
	signed_gdpr_document?: boolean | null;
	size?: string | null;
	sla_agreed_response?: string | null;
	sla_reporting_format_cadence?: string | null;
	state_province_region?: string | null;
	status?: string | null;
	store_user_ids?: string | null;
	street?: string | null;
	street_address?: string | null;
	subject_to_reverse_vat_charge?: boolean | null;
	subject_to_vat?: boolean | null;
	supported_languages?: Record<string, unknown> | null;
	tickets?: string | null;
	timezone?: string | null;
	users?: string | null;
	vat_id?: string | null;
	vat_return_frequency?: string | null;
	website?: string | null;
	workflow?: string | null;
}

export type PublicCustomersInsert = Partial<PublicCustomersRow>;
export type PublicCustomersUpdate = Partial<PublicCustomersInsert>;

export const publicCustomersModel = defineModel<
	PublicCustomersRow,
	PublicCustomersInsert,
	PublicCustomersUpdate
>({
	meta: {
		database: "railway",
		schema: "public",
		model: "customers",
		tableName: "public.customers",
		primaryKey: ["customer_id"],
		nullable: {
			id: false,
			customer_id: false,
			company_number: true,
			vat_id: true,
			note: true,
			street_address: true,
			address_line_2: true,
			city: true,
			state_province_region: true,
			postal_code: true,
			country: true,
			email: true,
			size: true,
			customer_type_id: true,
			phone: true,
			website: true,
			legal_form: true,
			owner: true,
			vat_return_frequency: true,
			icp_return_frequency: true,
			cash_management: true,
			subject_to_vat: true,
			created_at: true,
			name: true,
			main_contact_id: true,
			organization_id: false,
			domain: true,
			administration: true,
			contract_start_date: true,
			accounting_start_date: true,
			closing_enabled: true,
			self_booking: true,
			global_company_id: true,
			customer_jurisdiction: true,
			account_manager: true,
			archive_hash: true,
			customer_jurisdiction_id: true,
			status: true,
			allow_self_accounting: true,
			companies: true,
			users: true,
			workflow: true,
			tickets: true,
			questions: true,
			is_overdue: true,
			data_provider: true,
			portal: true,
			data_provider_reference_id: true,
			signed_gdpr_document: true,
			archived_at: true,
			inactive_on: true,
			last_seen_at: true,
			bundle: true,
			accountant_id: true,
			accountant_name: true,
			accountant_is_partner_backoffice: true,
			currencies: true,
			default_currency: true,
			domain_wildcard_email: true,
			internal_email_support: true,
			internal_phone_number: true,
			internal_email_administration: true,
			supported_languages: true,
			is_partner_domain: true,
			subject_to_reverse_vat_charge: true,
			avatar: true,
			metadata: true,
			company_country_number: true,
			payment_method_invoice: true,
			person_number_ref: true,
			person_number: true,
			birth_day: true,
			salutations: true,
			payment_term_invoice: true,
			label: true,
			language_invoice_and_quote: true,
			last_name: true,
			street: true,
			first_name: true,
			description: true,
			reverse_charged: true,
			awaiting_deletion: false,
			data_residency: true,
			custom_tags: true,
			dpa_signed: true,
			dpa_signed_url: true,
			dpa_signed_at: true,
			consent_marketing_communications: true,
			consent_marketing_data_provider: true,
			nsent_marketing_communications_given_at: true,
			consent_marketing_communications_preferences: true,
			lead_source: true,
			group_structure: true,
			onboarding_approved: true,
			onboarded_by_user: true,
			onboarding_aproval_conditions: true,
			onboarding_aproval_findings: true,
			is_oss: true,
			is_ioss: true,
			is_article23: true,
			kyc_status: true,
			payroll_withholding_number: true,
			risk_rating: true,
			pep_sanction_checked_at: true,
			is_pep_sanction: true,
			credit_limit: true,
			credit_debit_notes: true,
			credit_debit_arrangements: true,
			credit_hold_flags: true,
			customer_success_manager: true,
			store_user_ids: true,
			adverse_media_check_flags: true,
			adverse_media_checked_at: true,
			adverse_media_data_provider: true,
			invoicing_entity_legal_name: true,
			has_ultimate_beneficial_owner_statement: true,
			has_identity_card: true,
			has_business_registry_extract: true,
			has_power_of_attorney: true,
			has_source_of_wealth: true,
			has_source_of_funds: true,
			has_store_status: true,
			timezone: true,
			language: true,
			sla_agreed_response: true,
			sla_reporting_format_cadence: true,
			primary_ledger: true,
			primary_ledger_tenant_id: true,
			signed_contract: true,
			comments: true,
			rating_amount_questions: true,
			rating_difficult_admin: true,
			rating_payments: true,
			rating_responds_timely: true,
			last_invoice_at: true,
			contact_name: true,
			chatroom: true,
		},
		relations: {
			contact_persons: {
				kind: "one-to-many",
				sourceColumns: ["customer_id"],
				targetSchema: "public",
				targetModel: "contact_persons",
				targetColumns: ["customer_id"],
			},
			customers_customer_jurisdiction_id_fkey_customer_jurisdictions: {
				kind: "many-to-one",
				sourceColumns: ["customer_jurisdiction_id"],
				targetSchema: "public",
				targetModel: "customer_jurisdictions",
				targetColumns: ["customer_jurisdiction_id"],
			},
			customers_organization_id_fkey_organization: {
				kind: "many-to-one",
				sourceColumns: ["organization_id"],
				targetSchema: "athena",
				targetModel: "organization",
				targetColumns: ["id"],
			},
			invoices: {
				kind: "one-to-many",
				sourceColumns: ["customer_id"],
				targetSchema: "public",
				targetModel: "invoices",
				targetColumns: ["customer_id"],
			},
			organization_customer: {
				kind: "one-to-many",
				sourceColumns: ["customer_id"],
				targetSchema: "public",
				targetModel: "organization_customer",
				targetColumns: ["customer_id"],
			},
			sf_formations_cases: {
				kind: "one-to-many",
				sourceColumns: ["customer_id"],
				targetSchema: "public",
				targetModel: "sf_formations_cases",
				targetColumns: ["customer_id"],
			},
		},
	},
});
