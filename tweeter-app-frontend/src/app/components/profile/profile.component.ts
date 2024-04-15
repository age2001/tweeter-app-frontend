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
    userName: '',
    bio: ''
  }

  userName: any;

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) {
    this.userName = this.activatedRoute.snapshot.paramMap.get('username');
    this.dataService.getUserByUsername(this.userName).subscribe((response: any) => {
      this.userInfo = response;
    });
  }
}
