import { Injectable } from "@angular/core";
import { UrlsService } from "src/app/shared/apis/urls.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../authentication/auth.service";

@Injectable({
	providedIn: "root",
})
export class DashboardService {
	constructor(
		private url: UrlsService,
		private http: HttpClient,
		private auth: AuthService
	) {}

	getAllUsers(page = 1) {
		return this.http.get(`${this.url.getApisUrl().getAllUsers}/?page=${page}`);
	}

	getUserInfo(id) {
		const headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.auth.token}`,
			Accept: "application/json",
		});
		return this.http.get(`${this.url.getApisUrl().singleUser}${id}`);
	}

	deleteUser(id) {
		return this.http.delete(`${this.url.deleteApisUrl().deleteUser}/${id}`);
	}

	addUser(user) {
		const headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.auth.token}`,
			Accept: "application/json",
		});

		return this.http.post(this.url.postApisUrl().createUser, user, { headers });
	}
}
