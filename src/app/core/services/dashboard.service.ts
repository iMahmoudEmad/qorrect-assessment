import { Injectable } from "@angular/core";
import { UrlsService } from "src/app/shared/apis/urls.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../authentication/auth.service";

@Injectable({
	providedIn: "root",
})
export class DashboardService {
	headers = new HttpHeaders({
		"Content-Type": "application/json",
		Authorization: `Bearer ${this.auth.token}`,
		Accept: "application/json",
	});
	constructor(
		private url: UrlsService,
		private http: HttpClient,
		private auth: AuthService
	) {}

	getAllUsers(page = 1) {
		return this.http.get(`${this.url.getApisUrl().getAllUsers}/?page=${page}`);
	}

	getUserInfo(id) {
		return this.http.get(`${this.url.getApisUrl().singleUser}${id}`);
	}

	deleteUser(id) {
		return this.http.delete(`${this.url.deleteApisUrl().deleteUser}/${id}`, {
			headers: this.headers,
		});
	}

	editUser(user) {
		return this.http.put(
			`${this.url.putApisUrl().updateUser}${user.id}`,
			user,
			{
				headers: this.headers,
			}
		);
	}

	addUser(user) {
		return this.http.post(this.url.postApisUrl().createUser, user, {
			headers: this.headers,
		});
	}
}
