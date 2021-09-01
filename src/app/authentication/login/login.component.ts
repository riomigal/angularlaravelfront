import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  resendActivationLink: boolean = false;

  acivationMailSent: boolean = false;
  activationMailMessage: string = '';

  errors: any = [];
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onSubmit() {
    const authService = this.authService
      .login(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(['/profile']);
        },
        (error) => {
          this.errors = error.errors;
          if (this.errors.verification) {
            this.resendActivationLink = true;
          }
        }
      );
  }

  onResendActivationLink() {
    this.authService
      .resendActivationEmail(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      )
      .subscribe(
        (res: { data: { email_sent: string } }) => {
          this.acivationMailSent = true;
          this.activationMailMessage = res.data.email_sent;
        },
        (error) => {
          this.acivationMailSent = false;
          this.activationMailMessage = error.errors.email_sent_error;
        }
      );
  }

  ngOnInit(): void {}
}
