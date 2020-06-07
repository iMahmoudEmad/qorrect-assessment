import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../core/authentication/auth.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

import { Store } from "@ngrx/store";
import * as LoginActions from "../store/login.action";
import { Token } from "../store/login.store";
import { loginReducerS } from "../store/login.reducer";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	user: FormGroup;
	token = null;

	constructor(
		private auth: AuthService,
		private formBuilder: FormBuilder,
		private toastr: ToastrService,
		private router: Router,
		private store: Store<Token>
	) {
		this.store.subscribe((res) => (this.token = res.token));
		this.store.select(loginReducerS).subscribe((token) => (this.token = token));
	}

	ngOnInit() {
		if (this.auth.isAuthenticated()) this.router.navigate(["dashboard"]);
		this.user = this.formBuilder.group({
			email: ["eve.holt@reqres.in", [Validators.required, Validators.email]],
			password: ["cityslicka", [Validators.required, Validators.minLength(6)]],
			remember_me: false,
		});
	}

	get email() {
		return this.user.get("email");
	}

	get password() {
		return this.user.get("password");
	}

	login(user) {
		const { email, password } = user.value;

		this.auth.login({ email, password }).subscribe((res: any) => {
			if (res.token) {
				this.store.dispatch({
					type: LoginActions.LOGIN_SUCCESS,
					token: res.token,
				});
				this.toastr.success("Login successfuly");
				this.router.navigate(["dashboard"]);
			}
		});
	}
}
