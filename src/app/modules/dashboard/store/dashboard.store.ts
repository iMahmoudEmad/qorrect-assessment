export interface Users {
	type: string;
	users: {
		id: number;
		email: string;
		first_name: string;
		last_name: string;
		avatar: string;
		updatedAt: string;
		createdAt: string;
	};
}

export interface User {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	avatar: string;
	updatedAt: string;
	createdAt: string;
}

export const initialState = {
	users: [],
};
