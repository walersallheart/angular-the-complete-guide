import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts:Post[] = [];
  isFetching = false;
  url = 'https://angular-8a2b4-default-rtdb.firebaseio.com/posts.json';

  constructor(private http: HttpClient, private postsService:PostsService) {}

  ngOnInit() {
    this.postsService.fetchPosts()
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.postsService.fetchPosts()
  }

  onClearPosts() {
    // Send Http request
  }
}
