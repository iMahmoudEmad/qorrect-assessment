import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UrlsService } from "../../shared/apis/urls.service";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	isAuth: string;
	constructor(private http: HttpClient, private url: UrlsService) {}

	isAuthenticated() {
		return this.isAuth ? true : false;
	}

	authUser(userData) {
		return this.http.post(this.url.postApisUrl().loginUrl, userData);
	}
}
