import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICreatePost } from 'src/app/models/post-create.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-tweet',
  templateUrl: './new-tweet.component.html',
  styleUrls: ['./new-tweet.component.css']
})
export class NewTweetComponent {
  characterCount: number = 144;
  tweet: ICreatePost = {
    userName: '',
    content: '',
    tags: []
  }

  constructor(private authService: AuthService, private router: Router) {}

  onInputHandler(event: any) {
    this.characterCount = 144 - event.target.value.length;
  }

  onTweetHandler() {
    const userName = localStorage.getItem('userName');
    if (userName !== null) {
      this.tweet.userName = userName;
    } else {
      return;
    }
    this.authService.register(this.tweet).subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['/profile'], { queryParams: { newTweet: 'true' } });
    }, (error: any) => {
      console.log(error);
    });
  }
}
