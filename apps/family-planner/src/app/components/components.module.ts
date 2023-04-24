import { NgModule } from "@angular/core";
import { LoaderComponent } from "./loader/loader.component";
import { SnackbarComponent } from "./snackbar/snackbar.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    LoaderComponent,
    SnackbarComponent
  ],
  entryComponents: [],
  providers: [],
  exports: [
    LoaderComponent,
    SnackbarComponent
  ],
  imports: [
    MatSnackBarModule,
    MatProgressSpinnerModule
    // ReactiveFormsModule,
  ],
})
export class ComponentsModule {}
