import { Injectable } from "@angular/core";
import { UrlsService } from "src/app/shared/apis/urls.service";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class DashboardService {
	constructor(private url: UrlsService, private http: HttpClient) {}

	getAllUsers(page = 1) {
		return this.http.get(`${this.url.getApisUrl().getAllUsers}/?page=${page}`);
	}

	getUserInfo(id) {
		return this.http.get(`${this.url.getApisUrl().singleUser}${id}`);
	}

	deleteUser(id) {
		return this.http.delete(`${this.url.deleteApisUrl().deleteUser}/${id}`);
	}
}
