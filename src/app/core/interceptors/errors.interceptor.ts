import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

export class HttpErrorInterceptor implements HttpInterceptor {
	constructor(private toastr: ToastrService) {}
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError(() => {
				this.toastr.error("Email or password is incorrect");
				return throwError("Email or password is incorrect");
			})
		);
	}
}
