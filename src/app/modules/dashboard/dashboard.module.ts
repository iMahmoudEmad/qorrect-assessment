import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./page/dashboard.component";
import { SharedModule } from "src/app/shared/modules/shared.module";
import { UserComponent } from "./components/user/user.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxSmartModalModule } from "ngx-smart-modal";

const routes: Routes = [
	{
		path: "",
		component: DashboardComponent,
	},
];

@NgModule({
	declarations: [DashboardComponent, UserComponent],
	imports: [
		RouterModule.forChild(routes),
		NgxSmartModalModule.forRoot(),
		SharedModule,
		ReactiveFormsModule,
	],
	exports: [DashboardComponent, SharedModule],
})
export class DashboardModule {}
