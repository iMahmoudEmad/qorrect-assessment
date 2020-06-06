import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./page/dashboard.component";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { SharedModule } from "src/app/shared/modules/shared.module";
import { UserComponent } from "./components/user/user.component";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
	{
		path: "",
		component: DashboardComponent,
	},
];

@NgModule({
	declarations: [DashboardComponent, UserComponent],
	imports: [RouterModule.forChild(routes), SharedModule, ReactiveFormsModule],
	exports: [DashboardComponent, SharedModule],
})
export class DashboardModule {}
