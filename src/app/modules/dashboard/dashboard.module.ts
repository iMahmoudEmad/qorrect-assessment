import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./page/dashboard.component";
import { SharedModule } from "src/app/shared/modules/shared.module";
import { UsersComponent } from "./components/users/users.component";
import { FormsModule } from "@angular/forms";
import { NgxSmartModalModule } from "ngx-smart-modal";
import { ClickOutsideModule } from "ng-click-outside";
import { AuthGuard } from "src/app/core/guards/auth.guard";

const routes: Routes = [
	{
		path: "",
		component: DashboardComponent,
		canActivate: [AuthGuard],
	},
];

@NgModule({
	declarations: [DashboardComponent, UsersComponent],
	imports: [
		RouterModule.forChild(routes),
		NgxSmartModalModule.forRoot(),
		SharedModule,
		FormsModule,
		ClickOutsideModule,
	],
	exports: [SharedModule],
})
export class DashboardModule {}
