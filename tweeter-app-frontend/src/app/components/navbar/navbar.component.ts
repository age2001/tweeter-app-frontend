import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private route: ActivatedRoute, private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['token'] !== null) {
        
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
    // this.router.navigateByUrl('home');
  }

  onProfile() {
    this.router.navigateByUrl('profile');
  }
}
