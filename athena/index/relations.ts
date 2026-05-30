import { defineDatabase } from "@xylex-group/athena";

import { athenaSchema } from "../athena/schema";
import { formsSchema } from "../forms/schema";
import { payloadSchema } from "../payload/schema";
import { publicSchema } from "../public/schema";

export const railwayDatabase = defineDatabase({
	athena: athenaSchema,
	forms: formsSchema,
	payload: payloadSchema,
	public: publicSchema,
});
