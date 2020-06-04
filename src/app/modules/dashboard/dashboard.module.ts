import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./component/dashboard.component";
import { AuthGuard } from "src/app/core/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
