import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { SharedService } from "src/app/shared/services/shared.service";

@Component({
	selector: "app-user",
	templateUrl: "./user.component.html",
	styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
	@Input() users;
	@Input() page;
	@Input() total;
	@Input() per_page;
	@Output() opened: EventEmitter<any> = new EventEmitter();
	@Output() curruntPage: EventEmitter<any> = new EventEmitter();

	constructor(private sharedService: SharedService) {}

	ngOnInit(): void {}

	fullName(first, last) {
		return this.sharedService.fullName(first, last);
	}

	openUserData(userId) {
		return this.opened.emit(userId);
	}

	pageChanged(e) {
		this.curruntPage.emit(e);
	}
}
