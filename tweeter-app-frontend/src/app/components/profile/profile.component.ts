import { Component } from '@angular/core';
import { IUserInfo } from 'src/app/models/user-info.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userInfo: IUserInfo = {
    firstName: '',
    lastName: '',
    userName: '',
    bio: ''
  }
}
