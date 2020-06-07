import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { DashboardService } from "src/app/core/services/dashboard.service";
import { ToastrService } from "ngx-toastr";
import { NgxSmartModalService } from "ngx-smart-modal";
import { SharedService } from "src/app/shared/services/shared.service";
import { Store } from "@ngrx/store";
import { Token } from "../../login/store/login.store";
import { AuthService } from "src/app/core/authentication/auth.service";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
	users: any[];
	user: FormGroup;
	userInfo;
	userSelectedId;
	isUserModalOpened = false;
	token;

	constructor(
		private formBuilder: FormBuilder,
		private dashboardService: DashboardService,
		private toaster: ToastrService,
		public ngxSmartModalService: NgxSmartModalService,
		private sharedService: SharedService,
		private store: Store<Token>,
		private auth: AuthService
	) {
		this.store.subscribe((res) => (this.token = res.token));
	}

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

	fullName(first, last) {
		return this.sharedService.fullName(first, last);
	}

	getAllUsers() {
		this.dashboardService.getAllUsers().subscribe((users) => {
			this.users = users;
		});
	}

	getUserInfo(userId = this.userSelectedId) {
		// this.isUserModalOpened = false; // if you wont to close aside userInfo remove this comment
		if (this.userSelectedId) {
			this.dashboardService.getUserInfo(userId).subscribe((res) => {
				this.userInfo = res;
				this.isUserModalOpened = true;
			});
		}
	}

	deleteUser(userId = this.userSelectedId) {
		if (this.userSelectedId) {
			this.dashboardService.deleteUser(userId).subscribe(() => {
				this.users = this.users.filter((user) => user.id !== userId);
				this.toaster.success("Deleted successfuly");
				this.userSelectedId = null;
				this.isUserModalOpened = false;
			});
		}
	}
}
