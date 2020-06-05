import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UrlsService } from "../../shared/apis/urls.service";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	isAuth: string;
	constructor(
		private http: HttpClient,
		private url: UrlsService,
		private router: Router
	) {}

	isAuthenticated() {
		this.isAuth = localStorage.getItem("token");
		return this.isAuth ? true : false;
	}

	login(userData) {
		return this.http.post(this.url.postApisUrl().loginUrl, userData);
	}

	logout() {
		localStorage.removeItem("token");
		this.router.navigate(["login"]);
	}
}
