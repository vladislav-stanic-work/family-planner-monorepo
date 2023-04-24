import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterRoutingModule } from "./register-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { RegisterComponent } from "./register.page";

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [RegisterComponent],
})
export class RegisterModule {}
