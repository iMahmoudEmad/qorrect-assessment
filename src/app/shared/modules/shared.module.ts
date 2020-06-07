import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "src/app/core/header/header.component";
import { SharedService } from "../services/shared.service";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
	imports: [CommonModule, NgxPaginationModule],
	declarations: [HeaderComponent],
	exports: [HeaderComponent, CommonModule, NgxPaginationModule],
	providers: [SharedService],
})
export class SharedModule {}
