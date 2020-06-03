import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./modules/login/login.module").then(
        (module) => module.LoginModule
      ),
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./modules/dashboard/dashboard.module").then(
        (module) => module.DashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
