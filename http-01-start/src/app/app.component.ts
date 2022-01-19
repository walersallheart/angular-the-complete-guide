import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  url = 'https://angular-8a2b4-default-rtdb.firebaseio.com/posts.json';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts()
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.http.post(
      this.url,
      postData
    ).subscribe(responseData => {

    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts()
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
    this.http.get(this.url).subscribe(
      posts => {
        console.log(posts);
      }
    )
  }
}
