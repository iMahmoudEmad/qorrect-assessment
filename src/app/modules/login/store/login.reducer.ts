import { initialState, Token } from "./login.store";
import * as Actions from "./login.action";

export function loginReducer(state = initialState, action: Token) {
	switch (action.type) {
		case Actions.LOGIN_SUCCESS:
			return { token: action.token };
		case Actions.LOGOUT_SUCCESS:
			return { token: action.token };
		default:
			return state;
	}
}
