import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../components/snackbar/snackbar.component";
import { SNACKBAR_DURATION } from "../constants";

@Injectable({
    providedIn: 'root'
})
export class AppService {
    constructor(
        private snackBar: MatSnackBar
    ){}

    showSnackbar(message: string) {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: message,
          duration: SNACKBAR_DURATION
        });
    };
}
  
