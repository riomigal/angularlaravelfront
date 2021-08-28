import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl('name', [Validators.required]),
    email: new FormControl('email', [Validators.required]),
    password: new FormControl('password'),
  });

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.userService.register();
  }
}
