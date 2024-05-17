import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CustomSnackBar {
  constructor(private snackBar: MatSnackBar, private router: Router) {
  }

  public message(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Close', {
      duration: duration ?? 3000,
      horizontalPosition: 'right',
    });
  }

  public route(message: string, action: string, duration: number = 3000) {
    this.router.navigate([action]).then((navigated: boolean) => {
      if (navigated) {
        this.snackBar.open(message, 'Close', {
          duration: duration ?? 3000,
          horizontalPosition: 'right',
        });
      }
    });
  }
}
