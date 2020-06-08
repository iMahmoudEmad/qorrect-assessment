import { initialState, Users } from "./dashboard.store";
import * as Actions from "./dashboard.action";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export function dashboardReducer(state = initialState, action: Users) {
	switch (action.type) {
		case Actions.ALL_USERS:
			return {
				...state,
				users: action.users,
			};
		case Actions.UPDATE_USER:
			const user = state.users.find((p) => p.id === action.users.id);
			return {
				...state,
				users: [
					...state.users.filter((u) => u.id !== user.id),
					{ ...action.users },
				],
			};
		case Actions.ADD_USER:
			return {
				...state,
				users: [...state.users, action.users],
			};
		default:
			return state;
	}
}

export const dashboardReducerFS = createFeatureSelector<Users>("users");
export const dashboardReducerS = createSelector(
	dashboardReducerFS,
	(state) => state.users
);
