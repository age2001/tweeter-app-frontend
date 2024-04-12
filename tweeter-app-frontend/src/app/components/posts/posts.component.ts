import { Component, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPostInfo } from 'src/app/models/post-info.model';
import { DataService } from 'src/app/services/data.service';

import * as usersData from './users.json'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  className: string = '';

  pageName: any;
  username: any;
  // posts: IPostInfo[] = [];
  posts: any = JSON.parse(JSON.stringify(usersData)).users;

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router, private elementRef: ElementRef) {
    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    this.pageName = this.elementRef.nativeElement.getAttribute('pageName');

    var hashTagDiv = document.querySelector(".hashtags");
    if (hashTagDiv !== null) {
      console.log("NOT NULL")
      hashTagDiv.innerHTML = this.posts.tags.join(" ");
    }

    // If on Home page posts feed then get all posts
    // Else if on the users profile page, get posts by the users stored username
    if (this.pageName === 'allPosts') {
      this.className = 'container wrapper'
      this.dataService.getPosts().subscribe((response: any) => {
        console.log(response);
        this.posts = response;
      });
    } else if (this.pageName === 'profilePosts') {
      this.className = 'container wrapper profile-posts-vh'
      this.dataService.getPostsByUsername(this.username).subscribe((response: any) => {
        console.log(response);
        this.posts = response;
      });
    }
  }
  
  onClickHandler(id: any) {
    this.router.navigate(['/post', id]);
  }
  
  returnTag(tag: Array<string>) {
    if (tag === undefined) {
      return "";
    }
    return tag.map(i => '#' + i).join(" ");
  }
  
  checkRepliesQuantity(replies: any) {
    if (replies === undefined) {
      return 0;
    }
    return replies.length;
  }

  getRepliesQuantity(replies: any) {
    if (replies === undefined) {
      return "";
    }
    return replies.length;
  }
}
