import { initialState, Users } from "./dashboard.store";
import * as Actions from "./dashboard.action";

export function dashboardReducer(state = initialState, action: Users) {
	switch (action.type) {
		case Actions.ALL_USERS:
			return { payload: action.payload };
		default:
			return state;
	}
}
