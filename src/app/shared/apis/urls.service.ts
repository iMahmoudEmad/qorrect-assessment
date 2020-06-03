import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UrlsService {
  constructor() {}

  getApisUrl() {
    return {
      userLists: `${environment.baseUrl}api/users`,
      singleUser: `${environment.baseUrl}api/users/`,
    };
  }

  postApisUrl() {
    return {
      loginUrl: `${environment.baseUrl}api/login`,
      createUser: `${environment.baseUrl}api/users`,
    };
  }

  putApisUrl() {
    return {
      updateUser: `${environment.baseUrl}api/users/`,
    };
  }

  deleteApisUrl() {
    return {
      deleteUser: `${environment.baseUrl}api/users/`,
    };
  }
}
