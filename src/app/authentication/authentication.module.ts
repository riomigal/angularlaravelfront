import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../layout/components/components.module';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [CommonModule, ReactiveFormsModule, ComponentsModule],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthenticationModule {}
