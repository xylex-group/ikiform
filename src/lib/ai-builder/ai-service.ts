import type { FormSchema as DatabaseFormSchema } from "@/lib/database";
import type { ChatMessage } from "./types";
import { extractJsonFromText, isDatabaseFormSchema } from "./utils";

export class AIBuilderService {
	static async sendMessage(
		messages: ChatMessage[],
		sessionId: string,
		onStream: (content: string) => void,
		onError: (error: string) => void
	): Promise<{ fullText: string; foundJson: DatabaseFormSchema | null }> {
		try {
			const response = await fetch("/api/ai-builder", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ messages, sessionId }),
			});

			if (!response.body) {
				onError("No response from server.");
				return { fullText: "", foundJson: null };
			}

			const reader = response.body.getReader();
			let fullText = "";
			let foundJson: DatabaseFormSchema | null = null;

			while (true) {
				const { value, done } = await reader.read();
				if (done) {
					break;
				}

				const chunk = new TextDecoder().decode(value);
				fullText += chunk;
				onStream(fullText);

				if (!foundJson) {
					const extractedJson = extractJsonFromText(fullText);
					if (isDatabaseFormSchema(extractedJson)) {
						foundJson = extractedJson;
					}
				}
			}

			return { fullText, foundJson };
		} catch (_error) {
			onError("Failed to send message");
			return { fullText: "", foundJson: null };
		}
	}
}
