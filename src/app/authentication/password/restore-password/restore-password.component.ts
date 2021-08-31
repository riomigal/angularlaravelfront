import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Validation from '@app/_helpers/Validation';
import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss'],
})
export class RestorePasswordComponent implements OnInit {
  errors: any = [];
  successMessage = '';
  restorePWForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      token: new FormControl('', []),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
      password_confirmation: new FormControl('', [
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
    },
    { validators: [Validation.match('password', 'confirm_password')] }
  );

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.restorePWForm.controls.token.setValue(
      this.route.snapshot.queryParamMap.get('token')
    );
  }

  onSubmit() {
    this.authenticationService
      .setNewPassword(
        this.restorePWForm.controls.email.value,
        this.restorePWForm.controls.token.value,
        this.restorePWForm.controls.password.value,
        this.restorePWForm.controls.password_confirmation.value
      )
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
