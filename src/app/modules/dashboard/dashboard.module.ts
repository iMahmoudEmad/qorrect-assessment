import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./page/dashboard.component";
import { SharedModule } from "src/app/shared/modules/shared.module";
import { UserComponent } from "./components/user/user.component";
import { ReactiveFormsModule } from "@angular/forms";
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
	declarations: [DashboardComponent, UserComponent],
	imports: [
		RouterModule.forChild(routes),
		NgxSmartModalModule.forRoot(),
		SharedModule,
		ReactiveFormsModule,
		ClickOutsideModule,
	],
	exports: [SharedModule],
})
export class DashboardModule {}
