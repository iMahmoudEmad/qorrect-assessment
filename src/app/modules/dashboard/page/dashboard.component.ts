import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { DashboardService } from "src/app/core/services/dashboard.service";
import { ToastrService } from "ngx-toastr";
import { NgxSmartModalService } from "ngx-smart-modal";
import { SharedService } from "src/app/shared/services/shared.service";
import { Store } from "@ngrx/store";
import * as DashboardActions from "../store/dashboard.action";
import { Users, User } from "../store/dashboard.store";
import { dashboardReducerS } from "../store/dashboard.reducer";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
	users;
	user: FormGroup;
	userInfo;
	userSelectedId;
	isUserModalOpened = false;
	token;
	currentPage: number;
	total: number;
	per_page: number;

	constructor(
		private formBuilder: FormBuilder,
		private dashboardService: DashboardService,
		private toaster: ToastrService,
		public ngxSmartModalService: NgxSmartModalService,
		private sharedService: SharedService,
		private store: Store<Users>
	) {
		this.store
			.select(dashboardReducerS)
			.subscribe((users) => (this.users = users));
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
		this.dashboardService.getAllUsers().subscribe((res: any) => {
			this.store.dispatch({
				type: DashboardActions.ALL_USERS,
				payload: res.data,
			});
			this.currentPage = res.page;
			this.total = res.total;
			this.per_page = res.per_page;
		});
	}

	getUserInfo(userId = this.userSelectedId) {
		// this.isUserModalOpened = false; // if you wont to close aside userInfo remove this comment
		if (this.userSelectedId) {
			this.dashboardService.getUserInfo(userId).subscribe((res: any) => {
				this.userInfo = res.data;
				this.isUserModalOpened = true;
			});
		}
	}

	deleteUser(userId = this.userSelectedId) {
		if (this.userSelectedId) {
			this.dashboardService.deleteUser(userId).subscribe(() => {
				const users = this.users.filter((user) => user.id !== userId);
				this.store.dispatch({
					type: DashboardActions.ALL_USERS,
					payload: users,
				});
				this.toaster.success("Deleted successfuly");
				this.userSelectedId = null;
				this.isUserModalOpened = false;
			});
		}
	}

	addUser(user: User) {
		this.dashboardService.addUser(user).subscribe((res) => {
			console.log(res);
		});
	}

	pageChanged(currentPage) {
		this.dashboardService.getAllUsers(currentPage).subscribe((res: any) => {
			this.store.dispatch({
				type: DashboardActions.ALL_USERS,
				payload: res.data,
			});
			this.currentPage = res.page;
		});
	}
}
