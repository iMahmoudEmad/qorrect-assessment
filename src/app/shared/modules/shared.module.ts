import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "src/app/core/header/header.component";
import { FooterComponent } from "src/app/core/footer/footer.component";

@NgModule({
	imports: [CommonModule],
	declarations: [HeaderComponent, FooterComponent],
	exports: [HeaderComponent, FooterComponent, CommonModule],
})
export class SharedModule {}
