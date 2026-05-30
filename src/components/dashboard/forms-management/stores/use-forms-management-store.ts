import { create } from "zustand";
import type { Form } from "@/utils/athena/forms";
import { DEFAULT_DELETE_MODAL_STATE } from "../constants";
import type { DeleteModalState } from "../types";

type FormListUpdater =
	| Form[]
	| null
	| ((prev: Form[] | null) => Form[] | null);

type DeleteModalUpdater =
	| DeleteModalState
	| ((prev: DeleteModalState) => DeleteModalState);

interface FormsManagementStore {
	deleteModal: DeleteModalState;
	exportTargetForm: Form | null;
	formsOverride: Form[] | null;
	searchQuery: string;
	showExportModal: boolean;
	showImportModal: boolean;
	sortBy: string;
	statusFilter: string;
	resetFilters: () => void;
	setDeleteModal: (next: DeleteModalUpdater) => void;
	setExportTargetForm: (form: Form | null) => void;
	setFormsOverride: (next: FormListUpdater) => void;
	setSearchQuery: (query: string) => void;
	setShowExportModal: (open: boolean) => void;
	setShowImportModal: (open: boolean) => void;
	setSortBy: (sortBy: string) => void;
	setStatusFilter: (statusFilter: string) => void;
}

export const useFormsManagementStore = create<FormsManagementStore>((set) => ({
	deleteModal: DEFAULT_DELETE_MODAL_STATE,
	exportTargetForm: null,
	formsOverride: null,
	searchQuery: "",
	showExportModal: false,
	showImportModal: false,
	sortBy: "updated",
	statusFilter: "all",
	resetFilters: () =>
		set({
			searchQuery: "",
			statusFilter: "all",
			sortBy: "updated",
		}),
	setDeleteModal: (next) =>
		set((state) => ({
			deleteModal:
				typeof next === "function"
					? (next as (prev: DeleteModalState) => DeleteModalState)(
							state.deleteModal
						)
					: next,
		})),
	setExportTargetForm: (form) => set({ exportTargetForm: form }),
	setFormsOverride: (next) =>
		set((state) => ({
			formsOverride:
				typeof next === "function"
					? (next as (prev: Form[] | null) => Form[] | null)(state.formsOverride)
					: next,
		})),
	setSearchQuery: (searchQuery) => set({ searchQuery }),
	setShowExportModal: (showExportModal) => set({ showExportModal }),
	setShowImportModal: (showImportModal) => set({ showImportModal }),
	setSortBy: (sortBy) => set({ sortBy }),
	setStatusFilter: (statusFilter) => set({ statusFilter }),
}));

