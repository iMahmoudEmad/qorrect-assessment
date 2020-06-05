import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../../core/authentication/auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
	user = {
		email: null,
		password: null,
	};
	constructor(private auth: AuthService) {}

	authUser(form: NgForm) {
		const userData = {
			email: form.value.email,
			password: form.value.password,
		};

		this.auth.authUser(userData).subscribe((res) => {
			console.log(res);
		});
	}
}
