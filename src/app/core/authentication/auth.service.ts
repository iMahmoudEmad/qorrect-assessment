import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isAuth: string;
  constructor() {}

  isAuthenticated() {
    return this.isAuth ? true : false;
  }
}
