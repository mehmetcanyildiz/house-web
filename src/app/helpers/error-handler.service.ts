import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthenticationService} from "../services";
import {CustomSnackBar} from "../services/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(
    private snackBar: MatSnackBar,
    private customSnackBar: CustomSnackBar,
    private zone: NgZone,
    private authenticationService: AuthenticationService) {
  }


  handleError(error: any): void {
    let message = '';

    if (error.error && error.error.validationErrors) {
      error.error.validationErrors.forEach((err: any) => {
        message += err + '\r\n';
      });
    } else if (error.error && error.error.error) {
      message = error.error.error;
    } else if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        message = 'No Internet Connection';
      } else {
        message = `HTTP Error: ${error.status} - ${error.message}`;
      }
    } else {
      message = error.message ? error.message : error.toString();
    }

    this.zone.run(() => {
      this.snackBar.open(message, 'Close', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['mat-toolbar', 'mat-danger']
      });
    });

    if (error.status === 401) {
      this.authenticationService.logout();
    }

    if (error.url.includes('classified/get/')) {
      this.customSnackBar.route(message, '/');
    }
  }
}
