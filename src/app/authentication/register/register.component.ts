import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import Validation from '../../_helpers/Validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  errors: any = [];
  successMessage: string = '';
  registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
      confirm_password: new FormControl('', [
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
      terms: new FormControl('', [Validators.requiredTrue]),
    },
    {
      validators: Validation.match('password', 'confirm_password'),
    }
  );

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authService
      .register(
        this.registerForm.get('name').value,
        this.registerForm.get('email').value,
        this.registerForm.get('password').value,
        this.registerForm.get('confirm_password').value
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
