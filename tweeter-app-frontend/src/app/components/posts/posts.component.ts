import { Component, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPostInfo } from 'src/app/models/post-info.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  pageName: any;
  username: any;
  posts: IPostInfo[] = [];

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router, private elementRef: ElementRef) {
    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    this.pageName = this.elementRef.nativeElement.getAttribute('pageName');
    // If on Home page posts feed then get all posts
    // Else if on the users profile page, get posts by the users stored username
    if (this.pageName === 'allPosts') {
      this.dataService.getPosts().subscribe((response: any) => {
        console.log("all posts detected")
        console.log(response);
        this.posts = response;
        // this.posts = 
      });
    } else if (this.pageName === 'profilePosts') {
      this.dataService.getPostsByUsername(this.username).subscribe((response: any) => {
        console.log("profile posts detected")
        console.log(response);
        this.posts = response;
      });
    }
  }

  onClickHandler(id: any) {
    this.router.navigate(['/post', id]);
  }

}
