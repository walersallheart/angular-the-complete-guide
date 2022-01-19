import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
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
    this.http.get(this.url)
    .pipe(map(responseData => {
      const postArray = [];

      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postArray.push({ ...responseData[key], id: key  });
        }
      }

      return postArray;
    }))
    .subscribe(
      posts => {
        console.log(posts);
      }
    )
  }
}
