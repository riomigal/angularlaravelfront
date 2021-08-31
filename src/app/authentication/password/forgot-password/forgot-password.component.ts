import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  successMessage = '';
  errors: any = [];
  forgotPWForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authenticationService
      .resetPassword(this.forgotPWForm.controls.email.value)
      .subscribe(
        (res) => {
          this.successMessage = res.message;
        },
        (error) => {
          this.errors = error.errors;
        }
      );
  }
}
