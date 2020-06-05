import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../core/authentication/auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	user: FormGroup;

	constructor(private auth: AuthService, private formBuilder: FormBuilder) {}

	ngOnInit() {
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
			this.auth.isAuth = res.token;
			console.log(res.token);
		});
	}
}
