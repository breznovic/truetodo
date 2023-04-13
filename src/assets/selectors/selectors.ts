import { RootState } from "../../store/store";

export const selectAppStatus = (state: RootState) => state.filter.filterValue;
export const selectAppError = (state: RootState) => state.tasks.tasks;
