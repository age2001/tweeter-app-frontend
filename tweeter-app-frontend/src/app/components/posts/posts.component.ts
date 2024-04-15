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
    tags: [],
    postId: -1
  }

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router, private elementRef: ElementRef, private authService: AuthService) {
    this.username = localStorage.getItem('userName');
    this.pageName = this.elementRef.nativeElement.getAttribute('pageName');

    this.posts = []
    // If on Home page posts feed then get all posts
    // Else if on the users profile page, get posts by the users stored username
    if (this.pageName === 'allPosts') {
      this.className = 'container wrapper'
      this.dataService.getPosts().subscribe((response: any) => {
        this.posts = response;

        for (let post of this.posts) {
          this.getRepliesFromPost(post)
          this.getTagsFromPost(post)
        }
      });
    } else if (this.pageName === 'profilePosts') {
      this.className = 'container wrapper profile-posts-vh'
      this.dataService.getPostsByUsername(this.username).subscribe((response: any) => {
          this.posts = response;
          for (let post of this.posts) {
            this.getRepliesFromPost(post)
            this.getTagsFromPost(post)
          }
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
        this.reply.tags = [];
        for (let tagName of hashTags) {
          this.reply.tags.push({name: tagName})
        }
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
    this.reply.postId = this.modalPost.id;
    this.dataService.createReply(this.reply).subscribe((response: any) => {
      console.log(response);
      // this.router.navigate(['/profile'], { queryParams: { newReply: 'true' } });
      // location.reload();
      
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
    
    // return tag.map(i => '#' + i).join(" ");

    let final_string = "";
    for (let i of tag) {
      final_string += i.name + " ";
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

  getRepliesFromPost(post: any) {
    this.dataService.getRepliesByPostId(post.id).subscribe((response: any) => {
      post.replies = response;
      for (let reply of post.replies) {
        this.dataService.getTagsByReplyId(reply.id).subscribe((response2: any) => {
          reply.replyTags = response2;
        });
      }
  });
}

  getTagsFromPost(post: any) {
    this.dataService.getTagsByPostId(post.id).subscribe((response: any) => {
      post.tags = response;
    });
  }
}
