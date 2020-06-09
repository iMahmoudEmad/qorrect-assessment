import { Component, OnInit } from "@angular/core";
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
	user: User = {
		id: null,
		email: null,
		first_name: null,
		last_name: null,
		avatar: null,
		updatedAt: null,
		createdAt: null,
	};
	userInfo: User = {
		id: null,
		email: null,
		first_name: null,
		last_name: null,
		avatar: null,
		updatedAt: null,
		createdAt: null,
	};
	userSelectedId;
	isUserModalOpened: boolean = false;
	isAddUserModalOpened: boolean = false;
	currentPage: number;
	total: number;
	per_page: number;
	token;
	isLoading: boolean;

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
		this.isLoading = true;
		this.dashboardService.getAllUsers().subscribe((res: any) => {
			this.store.dispatch({
				type: DashboardActions.ALL_USERS,
				users: res.data,
			});
			this.currentPage = res.page;
			this.total = res.total;
			this.per_page = res.per_page;
			this.isLoading = false;
		});
	}

	getUserInfo(userId) {
		this.isAddUserModalOpened = false;
		this.userSelectedId = userId;
		if (this.userSelectedId || this.userInfo.id)
			setTimeout(() => (this.isUserModalOpened = true));
		if (this.userSelectedId && this.userSelectedId !== this.userInfo.id) {
			this.dashboardService.getUserInfo(userId).subscribe((res: any) => {
				this.userInfo = res.data;
			});
		}
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
		this.isAddUserModalOpened = false;
		this.dashboardService.editUser(this.userInfo).subscribe((user: any) => {
			this.userInfo = user;
			this.userSelectedId = null;
			this.store.dispatch({
				type: DashboardActions.UPDATE_USER,
				users: user,
			});
			this.toaster.success("Edit successfuly");
		});
	}

	addUser() {
		this.dashboardService.addUser(this.user).subscribe((user) => {
			this.store.dispatch({
				type: DashboardActions.ADD_USER,
				users: user,
			});
			this.toaster.success("Added successfuly");
			this.isAddUserModalOpened = false;
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

	addUserModal() {
		this.isAddUserModalOpened = true;
		this.ngxSmartModalService.create("userModal", "").open();
	}
}
