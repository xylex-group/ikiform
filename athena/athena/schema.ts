import { defineSchema } from "@xylex-group/athena";

import { athenaAccountModel } from "../models/athena/account";
import { athenaAccountsModel } from "../models/athena/accounts";
import { athenaAdminAuditLogsModel } from "../models/athena/admin-audit-logs";
import { athenaApiKeysModel } from "../models/athena/api-keys";
import { athenaApikeyModel } from "../models/athena/apikey";
import { athenaAthenaClientsModel } from "../models/athena/athena-clients";
import { athenaAuditLogModel } from "../models/athena/audit-log";
import { athenaEmailSendFailuresModel } from "../models/athena/email-send-failures";
import { athenaEmailTemplatesModel } from "../models/athena/email-templates";
import { athenaEmailsModel } from "../models/athena/emails";
import { athenaInvitationModel } from "../models/athena/invitation";
import { athenaIpProfilesModel } from "../models/athena/ip-profiles";
import { athenaMemberModel } from "../models/athena/member";
import { athenaOrganizationModel } from "../models/athena/organization";
import { athenaPasskeysModel } from "../models/athena/passkeys";
import { athenaSessionIpProfilesModel } from "../models/athena/session-ip-profiles";
import { athenaSessionsModel } from "../models/athena/sessions";
import { athenaTwoFactorModel } from "../models/athena/two-factor";
import { athenaUsersModel } from "../models/athena/users";
import { athenaVerificationsModel } from "../models/athena/verifications";

export const athenaSchema = defineSchema({
	account: athenaAccountModel,
	accounts: athenaAccountsModel,
	admin_audit_logs: athenaAdminAuditLogsModel,
	api_keys: athenaApiKeysModel,
	apikey: athenaApikeyModel,
	athena_clients: athenaAthenaClientsModel,
	audit_log: athenaAuditLogModel,
	email_send_failures: athenaEmailSendFailuresModel,
	email_templates: athenaEmailTemplatesModel,
	emails: athenaEmailsModel,
	invitation: athenaInvitationModel,
	ip_profiles: athenaIpProfilesModel,
	member: athenaMemberModel,
	organization: athenaOrganizationModel,
	passkeys: athenaPasskeysModel,
	session_ip_profiles: athenaSessionIpProfilesModel,
	sessions: athenaSessionsModel,
	two_factor: athenaTwoFactorModel,
	users: athenaUsersModel,
	verifications: athenaVerificationsModel,
});
