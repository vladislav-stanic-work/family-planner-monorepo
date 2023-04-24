import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginRoutingModule } from "./login-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from "./login.page";

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}
