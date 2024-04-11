import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPostInfo } from 'src/app/models/post-info.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  
  @Input()
  pageName: any;
  username: any;
  posts: IPostInfo[] = [];

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    // If on Home page posts feed then get all posts
    // Else if on the users profile page, get posts by the users stored username
    if (this.pageName === 'allPosts') {
      this.dataService.getPosts().subscribe((response: any) => {
        console.log(response);
        this.posts = response;
      });
    } else if (this.pageName === 'profilePosts') {
      this.dataService.getPostsByUsername(this.username).subscribe((response: any) => {
        console.log(response);
        this.posts = response;
      });
    }
  }

  onClickHandler(id: any) {
    this.router.navigate(['/post', id]);
  }

}
