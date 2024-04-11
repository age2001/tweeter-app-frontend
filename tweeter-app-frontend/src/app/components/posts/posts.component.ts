import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost } from 'src/app/models/post.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  username: any;
  posts: IPost[] = [];

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    // If a username is not passed when getting posts, then get all posts
    // Otherwise, get posts by the username passed
    if (this.username == null) {
      this.dataService.getPosts().subscribe((response: any) => {
        console.log(response);
        this.posts = response;
      });
    } else {
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
