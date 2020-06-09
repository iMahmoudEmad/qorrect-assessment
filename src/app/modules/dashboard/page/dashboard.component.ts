import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/core/services/dashboard.service";
import { ToastrService } from "ngx-toastr";
import { NgxSmartModalService } from "ngx-smart-modal";
import { SharedService } from "src/app/shared/services/shared.service";
import { Store } from "@ngrx/store";
import * as DashboardActions from "../store/dashboard.action";
import { Users } from "../store/dashboard.store";
import { dashboardReducerS } from "../store/dashboard.reducer";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
	users;
	userInfo = {
		id: null,
		first_name: null,
		last_name: null,
		email: null,
		avatar: null,
		updatedAt: null,
		createdAt: null,
	};
	userSelectedId;
	isUserModalOpened = false;
	currentPage: number;
	total: number;
	per_page: number;
	token;

	constructor(
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
		this.getAllUsers();
	}

	fullName(first, last) {
		return this.sharedService.fullName(first, last);
	}

	getAllUsers() {
		this.dashboardService.getAllUsers().subscribe((res: any) => {
			this.store.dispatch({
				type: DashboardActions.ALL_USERS,
				users: res.data,
			});
			this.currentPage = res.page;
			this.total = res.total;
			this.per_page = res.per_page;
		});
	}

	getUserInfo(userId = this.userSelectedId) {
		if (this.userSelectedId !== this.userInfo.id) {
			this.dashboardService
				.getUserInfo(userId)
				.subscribe((res: any) => (this.userInfo = res.data));
		}
		setTimeout(() => (this.isUserModalOpened = true));
	}

	deleteUser(userId = this.userSelectedId) {
		if (this.userSelectedId) {
			this.dashboardService.deleteUser(userId).subscribe(() => {
				const users = this.users.filter((user) => user.id !== userId);
				this.store.dispatch({
					type: DashboardActions.ALL_USERS,
					users: users,
				});
				this.toaster.success("Deleted successfuly");
				this.userSelectedId = null;
				this.isUserModalOpened = false;
			});
		}
	}

	editUser() {
		this.dashboardService.editUser(this.userInfo).subscribe((user: any) => {
			this.userInfo = user;
			this.store.dispatch({
				type: DashboardActions.UPDATE_USER,
				users: user,
			});
			this.toaster.success("Edit successfuly");
		});
	}

	addUser() {
		this.dashboardService.addUser(this.userInfo).subscribe((user) => {
			this.users = [...this.users, user];
			this.store.dispatch({
				type: DashboardActions.ADD_USER,
				users: user,
			});
			this.toaster.success("Added successfuly");
		});
	}

	pageChanged(currentPage) {
		this.dashboardService.getAllUsers(currentPage).subscribe((res: any) => {
			this.store.dispatch({
				type: DashboardActions.ALL_USERS,
				users: res.data,
			});
			this.currentPage = res.page;
		});
	}

	addUserModal(e) {
		console.log(e);
		this.ngxSmartModalService.create("userModal", "content").open();
	}
}
