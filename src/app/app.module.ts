import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./core/header/header.component";
import { FooterComponent } from "./core/footer/footer.component";

import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, ToastrModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
