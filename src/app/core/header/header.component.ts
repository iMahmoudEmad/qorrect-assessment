import { Component, OnInit, Output } from "@angular/core";
import { AuthService } from "../authentication/auth.service";
import { EventEmitter } from "events";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
	@Output() isAddUserModalOpened: any = new EventEmitter();
	constructor(private auth: AuthService) {}

	ngOnInit(): void {}

	logout() {
		this.auth.logout();
	}

	addNewUser() {
		this.isAddUserModalOpened.emit(true);
	}
}
