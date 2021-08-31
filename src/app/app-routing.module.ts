import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { UserModule } from './user/user.module';
import { AuthGuard } from './_auth/auth.guard';
import { ForgotPasswordComponent } from './authentication/password/forgot-password/forgot-password.component';
import { RestorePasswordComponent } from './authentication/password/restore-password/restore-password.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'restore-password',
    component: RestorePasswordComponent,
  },
  {
    path: 'profile',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), UserModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
