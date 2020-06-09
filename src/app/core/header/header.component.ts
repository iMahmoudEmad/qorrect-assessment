import { Component, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../authentication/auth.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
	@Output() isUserModalOpened: EventEmitter<any> = new EventEmitter<any>();
	constructor(private auth: AuthService) {}

	logout() {
		this.auth.logout();
	}

	addUser() {
		this.isUserModalOpened.emit(true);
	}
}
