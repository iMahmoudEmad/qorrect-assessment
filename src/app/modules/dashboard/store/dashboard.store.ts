export interface Users {
	type: string;
	users: {
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
	updatedAt: string;
}

export const initialState = {
	users: [],
};
