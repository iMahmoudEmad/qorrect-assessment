export interface Users {
	type: string;
	payload: {
		id: number;
		email: string;
		first_name: string;
		last_name: string;
		avatar: string;
	};
}

export interface User {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	avatar: string;
}

export const initialState = {
	id: null,
	email: null,
	first_name: null,
	last_name: null,
	avatar: null,
};
