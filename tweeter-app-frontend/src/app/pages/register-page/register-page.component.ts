import { Component } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  
  userModel: IUser = {
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    phoneNumber: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmitHandler() {
    this.authService.register(this.userModel).subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
    }, (error: any) => {
      console.log(error);
    });
  }
}
