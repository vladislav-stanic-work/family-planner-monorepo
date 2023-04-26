import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { GroupCreateComponent } from './group-create/group-create.component';
import { LayoutComponent } from './layout/layout.component';
import { LoaderComponent } from './loader/loader.component';
import { MenuComponent } from './menu/menu.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  declarations: [
    LoaderComponent,
    SnackbarComponent,
    MenuComponent,
    LayoutComponent,
    UserEditComponent,
    GroupCreateComponent,
  ],
  exports: [
    LoaderComponent,
    SnackbarComponent,
    MenuComponent,
    LayoutComponent,
    UserEditComponent,
    GroupCreateComponent,
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TextFieldModule,
    MatDialogModule,
  ],
})
export class UiModule {}
