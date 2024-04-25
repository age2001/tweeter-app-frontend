import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUserInfo } from 'src/app/models/user-info.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userInfo: IUserInfo = {
    firstName: '',
    lastName: '',
    username: '',
    bio: ''
  }

  userName: any;

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) {
    this.userName = localStorage.getItem('userName');
    this.dataService.getUserByUsername(this.userName).subscribe((response: any) => {
      this.userInfo.firstName = response.firstName;
      this.userInfo.lastName = response.lastName;
      this.userInfo.username = this.userName;
      this.userInfo.bio = "This is a bio";
    });
  }
}
