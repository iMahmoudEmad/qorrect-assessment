import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { LoginComponent } from "./component/login.component";

const routes: Routes = [
	{
		path: "",
		component: LoginComponent,
	},
];

@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule,
	],
	exports: [RouterModule],
})
export class LoginModule {}
