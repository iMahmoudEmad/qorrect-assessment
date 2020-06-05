import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./component/dashboard.component";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { SharedModule } from "src/app/shared/modules/shared.module";

const routes: Routes = [
	{
		path: "",
		component: DashboardComponent,
	},
];

@NgModule({
	declarations: [DashboardComponent],
	imports: [RouterModule.forChild(routes), SharedModule],
	exports: [DashboardComponent, SharedModule],
})
export class DashboardModule {}
