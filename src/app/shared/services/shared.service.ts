import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class SharedService {
	constructor() {}

	fullName(first, last) {
		return `${first} ${last}`;
	}
}
