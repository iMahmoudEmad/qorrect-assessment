import { Component, OnInit, Input } from "@angular/core";
import { DashboardService } from "src/app/core/services/dashboard.service";
import { ToastrService } from "ngx-toastr";
import { NgxSmartModalService } from "ngx-smart-modal";

@Component({
	selector: "app-user-details",
	templateUrl: "./user-details.component.html",
	styleUrls: ["./user-details.component.scss"],
})
export class UserDetailsComponent implements OnInit {
	@Input() userId;
	userSelectedId;

	constructor(
		private dashboardService: DashboardService,
		private toaster: ToastrService,
		public ngxSmartModalService: NgxSmartModalService
	) {}

	ngOnInit(): void {}

	deleteUser(userId = this.userSelectedId) {
		if (this.userSelectedId) {
			this.dashboardService.deleteUser(1).subscribe(() => {
				this.users = this.users.filter((user) => user.id !== userId);
				this.toaster.success("Deleted successfuly");
				this.userSelectedId = null;
				this.isUserModalOpened = false;
			});
		}
	}
}
