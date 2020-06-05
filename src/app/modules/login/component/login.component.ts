import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../core/authentication/auth.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	user: FormGroup;

	constructor(
		private auth: AuthService,
		private formBuilder: FormBuilder,
		private toastr: ToastrService,
		private router: Router
	) {}

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

	authUser(user) {
		const { email, password } = user.value;

		this.auth.authUser({ email, password }).subscribe((res: any) => {
			if (res.token) {
				localStorage.setItem("token", res.token);
				this.toastr.success("Login successfuly");
				this.router.navigate(["dashboard"]);
			}
		});
	}
}
