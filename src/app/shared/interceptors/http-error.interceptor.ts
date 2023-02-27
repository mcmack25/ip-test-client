import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private readonly toastr: ToastrService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = this.handleError(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  private handleError = (error: HttpErrorResponse): string => {
    if (error.error?.errors) {
      const values = Object.values(error.error.errors) as string[];
      values.forEach((errorMessage) => this.toastr.error(errorMessage));

      let message = '';
      values.map((m: string) => {
        message += m + '<br>';
      });
      return message.slice(0, -4);
    }

    if (error.error) {
      this.toastr.error(error.error.title);

      return error.error;
    }

    return error.message;
  };
}
