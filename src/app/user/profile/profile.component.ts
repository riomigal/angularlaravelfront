import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models/user.model';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user = {} as User;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getcurrentuser().subscribe(
      (user) => {
        this.user = user;
        console.log(user);
      },
      (error) => console.error(error.errors)
    );
  }
}
