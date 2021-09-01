import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models/user.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getcurrentuser() {
    return this.http.get<User>(`${environment.apiUrl}/api/get-user`).pipe(
      map((user) => {
        const userObj = new User(user.name, user.email);
        return userObj;
      })
    );
  }
}
