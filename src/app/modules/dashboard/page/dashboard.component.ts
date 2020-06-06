import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { DashboardService } from "src/app/core/services/dashboard.service";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
	users: any[];
	user: FormGroup;
	isUserModalOpened = false;

	constructor(
		private formBuilder: FormBuilder,
		private dashboardService: DashboardService
	) {}

	ngOnInit() {
		this.user = this.formBuilder.group({
			id: [null, [Validators.required, Validators.minLength(1)]],
			avatar: ["", [Validators.required]],
			email: ["", [Validators.required, Validators.email]],
			first_name: ["", [Validators.required, Validators.minLength(2)]],
			last_name: ["", [Validators.required, Validators.minLength(2)]],
		});

		this.getAllUsers();
	}

	getAllUsers() {
		this.dashboardService.getAllUsers().subscribe((users) => {
			this.users = users;
		});
	}
}
