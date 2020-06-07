import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UrlsService } from "../../shared/apis/urls.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Token } from "src/app/modules/login/store/login.store";

import * as LoginActions from "../../modules/login/store/login.action";
import { loginReducerS } from "../../modules/login/store/login.reducer";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	token;
	constructor(
		private http: HttpClient,
		private url: UrlsService,
		private router: Router,
		private store: Store<Token>
	) {
		this.store.select(loginReducerS).subscribe((token) => (this.token = token));
	}

	isAuthenticated() {
		return this.token ? true : false;
	}

	login(userData) {
		return this.http.post(this.url.postApisUrl().loginUrl, userData);
	}

	logout() {
		this.store.dispatch({
			type: LoginActions.LOGOUT_SUCCESS,
			token: null,
		});
		this.token = null;
		this.router.navigate(["login"]);
	}
}
