import { HttpClient,  HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

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
        let searchParams = new HttpParams();
        //HttpParams is immutable, so you need to overwrite it when you make a chance
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom1', 'value1');
        searchParams = searchParams.append('custom2', 'value2');

        return this.http.get<{ [key:string] : Post }>(
            this.url,
            {
                headers: new HttpHeaders({
                    'Custom-Header': 'Hello'
                }),
                params: searchParams
            }
            )
            .pipe(map((responseData) => {
                const postArray:Post[] = [];

                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                    postArray.push({ ...responseData[key], id: key  });
                    }
                }

                return postArray;
            }), catchError(errorResponse => {
                return throwError(errorResponse);
            }));
    }
    deletePosts(){
        return this.http.delete(this.url);
    }
}