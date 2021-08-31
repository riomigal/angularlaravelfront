import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormControl,
  FormGroup,
  Validators,
  FormControlName,
} from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  errors: any = [];
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    confirm_password: new FormControl(''),
    terms: new FormControl('', [Validators.requiredTrue]),
  });

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
      .pipe(first())
      .subscribe(
        (res) => {
          // WE HAVE SEND BLABLABLABLAABL
        },
        (error) => {
          this.errors = error.errors;
        }
      );
  }
}
