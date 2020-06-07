import { initialState, Users } from "./dashboard.store";
import * as Actions from "./dashboard.action";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export function dashboardReducer(state = initialState, action: Users) {
	switch (action.type) {
		case Actions.ALL_USERS:
			return { payload: action.payload };
		default:
			return state;
	}
}

export const dashboardReducerFS = createFeatureSelector<Users>("users");
export const dashboardReducerS = createSelector(
	dashboardReducerFS,
	(state) => state.payload
);
