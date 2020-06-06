import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "src/app/core/header/header.component";
import { SharedService } from "../services/shared.service";

@NgModule({
	imports: [CommonModule],
	declarations: [HeaderComponent],
	exports: [HeaderComponent, CommonModule],
	providers: [SharedService],
})
export class SharedModule {}
