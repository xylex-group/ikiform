import { defineSchema } from "@xylex-group/athena";

import { formsAiAnalyticsChatModel } from "../models/forms/ai-analytics-chat";
import { formsAiBuilderChatModel } from "../models/forms/ai-builder-chat";
import { formsFormSubmissionsModel } from "../models/forms/form-submissions";
import { formsFormsModel } from "../models/forms/forms";
import { formsInboundWebhookMappingsModel } from "../models/forms/inbound-webhook-mappings";
import { formsRedemptionCodesModel } from "../models/forms/redemption-codes";
import { formsWaitlistModel } from "../models/forms/waitlist";
import { formsWebhookLogsModel } from "../models/forms/webhook-logs";
import { formsWebhooksModel } from "../models/forms/webhooks";

export const formsSchema = defineSchema({
	ai_analytics_chat: formsAiAnalyticsChatModel,
	ai_builder_chat: formsAiBuilderChatModel,
	form_submissions: formsFormSubmissionsModel,
	forms: formsFormsModel,
	inbound_webhook_mappings: formsInboundWebhookMappingsModel,
	redemption_codes: formsRedemptionCodesModel,
	waitlist: formsWaitlistModel,
	webhook_logs: formsWebhookLogsModel,
	webhooks: formsWebhooksModel,
});
