import type { HeadBlobResult, ListBlobResult } from "@vercel/blob";
import { del, head, list, put } from "@vercel/blob";

export interface FileUploadResult {
	fullPath: string;
	id: string;
	path: string;
	signedUrl: string;
}

const token = process.env.BLOB_READ_WRITE_TOKEN;

function ensureToken(): string {
	if (!token) {
		throw new Error(
			"BLOB_READ_WRITE_TOKEN is not set. Add it to your environment for Vercel Blob storage."
		);
	}
	return token;
}

/**
 * Production Vercel Blob storage adapter.
 * Matches the public interface previously provided by Supabase Storage.
 *
 * Current strategy (migration-friendly):
 * - Uses public access for fastest cutover and CDN delivery.
 * - "signedUrl" is currently the direct blob URL (no expiry for public objects).
 * - When ready for private blobs + short-lived signed URLs, switch upload `access`
 *   to 'private' and implement `issueSignedToken` + `presignUrl`.
 */

export async function uploadFile(
	file: File,
	formId: string,
	fieldId: string,
	submissionId?: string
): Promise<FileUploadResult> {
	const t = ensureToken();

	const timestamp = Date.now();
	const randomId = Math.random().toString(36).substring(2, 15);
	const fileExtension = file.name.split(".").pop() ?? "bin";
	const fileName = `${timestamp}_${randomId}.${fileExtension}`;

	const basePath = submissionId
		? `submissions/${submissionId}/${fieldId}`
		: `forms/${formId}/${fieldId}`;

	const pathname = `${basePath}/${fileName}`;

	const blob = await put(pathname, file, {
		access: "public", // TODO: switch to 'private' + signed URLs post-migration
		token: t,
		addRandomSuffix: false,
	});

	return {
		id: blob.pathname,
		path: blob.pathname,
		signedUrl: blob.url,
		fullPath: blob.url,
	};
}

export async function deleteFile(filePath: string): Promise<void> {
	const t = ensureToken();
	await del(filePath, { token: t });
}

export async function getSignedUrl(
	filePath: string,
	_expiresIn = 3600
): Promise<string> {
	const t = ensureToken();
	const meta = await head(filePath, { token: t });
	return meta.url;
}

export async function refreshSignedUrls(
	filePaths: string[],
	expiresIn = 86_400
): Promise<Record<string, string>> {
	const signedUrls: Record<string, string> = {};

	await Promise.all(
		filePaths.map(async (filePath) => {
			try {
				signedUrls[filePath] = await getSignedUrl(filePath, expiresIn);
			} catch {
				// Skip missing files gracefully
			}
		})
	);

	return signedUrls;
}

export async function listFiles(
	folderPath: string
): Promise<ListBlobResult["blobs"]> {
	const t = ensureToken();
	const { blobs } = await list({ prefix: folderPath, token: t });
	return blobs;
}

export async function getFileMetadata(
	filePath: string
): Promise<HeadBlobResult | null> {
	const t = ensureToken();
	try {
		return await head(filePath, { token: t });
	} catch {
		return null;
	}
}


