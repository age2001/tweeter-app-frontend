import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreatePost } from '../models/post-create.model';
import { ICreateReply } from '../models/reply-create.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private BASE_URL = 'http://localhost:9000/api/v1.0';

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(`${this.BASE_URL}/post`);
  }

  getUsers() {
    return this.http.get(`${this.BASE_URL}/users/all`);
  }
  
  getPostsByUsername(username: any) {
    return this.http.get(`${this.BASE_URL}/post/${username}`);
  }

  getUserByUsername(username: any) {
    return this.http.get(`${this.BASE_URL}/auth/${username}`)
  }

  getRepliesByPostId(postId: any) {
    return this.http.get(`${this.BASE_URL}/reply/${postId}`);
  }

  getTagsByPostId(postId: any) {
    return this.http.get(`${this.BASE_URL}/tag/${postId}`);
  }

  getTagsByReplyId(replyId: any) {
    return this.http.get(`${this.BASE_URL}/tag/reply/${replyId}`);
  }

  createPost(tweet: ICreatePost) {
    return this.http.post(`${this.BASE_URL}/post`, tweet);
  }

  createReply(reply: ICreateReply) {
    return this.http.post(`${this.BASE_URL}/reply`, reply);
  }
}
