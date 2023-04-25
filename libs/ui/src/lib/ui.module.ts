import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LoaderComponent } from './loader/loader.component';
import { SnackbarComponent } from './snackbar/snackbar.component';

@NgModule({
  declarations: [LoaderComponent, SnackbarComponent],
  exports: [LoaderComponent, SnackbarComponent],
  imports: [CommonModule, MatSnackBarModule, MatProgressSpinnerModule],
})
export class UiModule {}
