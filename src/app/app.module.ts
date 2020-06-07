import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { SharedModule } from "./shared/modules/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { HttpErrorInterceptor } from "./core/interceptors/errors.interceptor";
import { environment } from "../environments/environment";

// Reducers
import { loginReducer } from "./modules/login/store/login.reducer";
import { dashboardReducer } from "./modules/dashboard/store/dashboard.reducer";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot(),
		SharedModule,
		StoreModule.forRoot(
			{
				token: loginReducer,
				users: dashboardReducer,
			},
			{}
		),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
	],
	exports: [SharedModule],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpErrorInterceptor,
			multi: true,
			deps: [ToastrService],
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
