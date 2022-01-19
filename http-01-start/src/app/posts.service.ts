import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class PostsService{
    url = 'https://angular-8a2b4-default-rtdb.firebaseio.com/posts.json';

    constructor(private http:HttpClient){}

    createAndStorePost(title:string, content:string) {
        const postData:Post = {
            title:title,
            content:content
        };

        this.http.post<{name:string}>(
            this.url,
            postData
        ).subscribe(responseData => {
            //
        });
    }

    fetchPosts() {
        this.http.get<{ [key:string] : Post }>(this.url)
            .pipe(map((responseData) => {
                const postArray:Post[] = [];

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