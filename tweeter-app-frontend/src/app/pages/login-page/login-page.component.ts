import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent{
  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private authService: AuthService,
    private router: Router) { }

  alertMessage = ''
  alertClass = ''

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['registered'] === 'true') {
        this.alertMessage = 'You have been registered successfully. Please login!';
        this.alertClass = 'alert alert-success';
      }
    });
  }

  loginForm = this.fb.group({
    usernameOrEmail: [null, [Validators.required]],
    password: [null, [Validators.required, Validators.minLength(6)]]
  });

  get usernameOrEmail() {
    return this.loginForm.get('usernameOrEmail');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLoginHandler() {
    this.authService.login(this.loginForm.value).subscribe((response: any) => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('userName', response.userName);
      this.router.navigate(['/home'], { queryParams: { loggedIn: 'true' }});
    }, (error: any) => {
      this.alertMessage = "Login failed, please try again!";
      this.alertClass = "alert alert-danger";
    });
  }
}
