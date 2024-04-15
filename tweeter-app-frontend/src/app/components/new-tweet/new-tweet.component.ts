import { Component } from '@angular/core';
import { ICreatePost } from 'src/app/models/post-create.model';
import { ITag } from 'src/app/models/tag.model';
import { DataService } from 'src/app/services/data.service';
import { SharedService } from 'src/app/services/shared.service';

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

  currentTags : ITag[] = [];

  constructor(private dataService: DataService,  
              private sharedService: SharedService) {}

  onInputHandler(event: any) {
    this.characterCount = 144 - event.target.value.length;
    var hashTags = event.target.value.match(/(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,50})(\b|\r)/g)
    var hashTagDiv = document.querySelector(".hashtags");
    if (hashTagDiv !== null) {
      if (hashTags !== null) {
        hashTagDiv.innerHTML = hashTags.join(" ");
        this.tweet.tags = [];
        for (let tagName of hashTags) {
          this.tweet.tags.push({name: tagName})
        }
      } else {
        hashTagDiv.innerHTML = "";
      }
    }
  }

  onTweetHandler() {
    const userName = localStorage.getItem('userName');
    if (userName !== null) {
      this.tweet.userName = userName;
    } else {
      return;
    }
    this.dataService.createPost(this.tweet).subscribe((response: any) => {
      console.log(response);
      // this.router.navigate(['/profile'], { queryParams: { newTweet: 'true' } });
      // location.reload();
      this.sharedService.onMainEvent.emit();
    }, (error: any) => {
      console.log(error);
    });
    this.tweet.content = "";
    this.characterCount = 144;
    var hashTagDiv = document.querySelector(".hashtags");
    if (hashTagDiv !== null) {
      hashTagDiv.innerHTML = "";
    }
  }
}
