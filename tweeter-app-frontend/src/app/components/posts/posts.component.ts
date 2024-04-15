import { Component, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPostInfo } from 'src/app/models/post-info.model';
import { DataService } from 'src/app/services/data.service';

// import * as usersData from './users.json'
import { ICreateReply } from 'src/app/models/reply-create.model';
import { AuthService } from 'src/app/services/auth.service';
import { ITag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  className: string = '';

  pageName: any;
  username: any;
  posts: IPostInfo[];

  modalPost: any

  characterCount: number = 144;
  reply: ICreateReply = {
    userName: '',
    content: '',
    tags: []
  }

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router, private elementRef: ElementRef, private authService: AuthService) {
    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    this.pageName = this.elementRef.nativeElement.getAttribute('pageName');

    this.posts = []
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
  
  onInputHandler(event: any) {
    this.characterCount = 144 - event.target.value.length;
    var hashTags = event.target.value.match(/(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,50})(\b|\r)/g)
    var hashTagDiv = document.querySelector(".reply-hashtags");
    if (hashTagDiv !== null) {
      if (hashTags !== null) {
        hashTagDiv.innerHTML = hashTags.join(" ");
      } else {
        hashTagDiv.innerHTML = "";
      }
    }
  }

  onReplyHandler() {
    const userName = localStorage.getItem('userName');
    if (userName !== null) {
      this.reply.userName = userName;
    } else {
      return;
    }
    this.authService.register(this.reply).subscribe((response: any) => {
      console.log(response);
      // this.router.navigate(['/profile'], { queryParams: { newReply: 'true' } });
      location.reload();
    }, (error: any) => {
      console.log(error);
    });
  }

  onClickHandler(id: any) {
    this.router.navigate(['/post', id]);
  }
  
  returnTag(tag: ITag[] | undefined) {
    if (tag === undefined) {
      return "";
    }
    
    let final_string = "";

    // return tag.map(i => '#' + i).join(" ");
    for (let i = 0; i < tag.length; i++) {
      final_string += '#' + tag[i].name + ' ';
    }
    return final_string;
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

  passPostInfoToModal(post: any) {
    this.modalPost = post;
  }
}
