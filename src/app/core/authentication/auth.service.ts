import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UrlsService } from "../../shared/apis/urls.service";
import { Subject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	isAuth: string;
	constructor(private http: HttpClient, private url: UrlsService) {}

	isAuthenticated() {
		this.isAuth = localStorage.getItem("token");
		return this.isAuth ? true : false;
	}

	authUser(userData) {
		return this.http.post(this.url.postApisUrl().loginUrl, userData);
	}
}
