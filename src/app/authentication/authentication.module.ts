import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../layout/components/components.module';
import { ForgotPasswordComponent } from './password/forgot-password/forgot-password.component';
import { RestorePasswordComponent } from './password/restore-password/restore-password.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RestorePasswordComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, ComponentsModule],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthenticationModule {}
