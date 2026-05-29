import { defineDatabase } from "@xylex-group/athena";

import { athenaSchema } from "../athena/schema";
import { payloadSchema } from "../payload/schema";
import { publicSchema } from "../public/schema";

export const railwayDatabase = defineDatabase({
	athena: athenaSchema,
	payload: payloadSchema,
	public: publicSchema,
});
