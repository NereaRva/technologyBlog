import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Post } from './interfaces/posts.interface';

@Injectable({

  providedIn: 'root'
})

export class BlogServerService {

  private url = 'https://my-json-server.typicode.com/mariogiron/blog-server/posts';

  private urlHttp = inject(HttpClient);

  
   
  getAll(): Promise<Post[]>{
    return firstValueFrom(this.urlHttp.get<Post[]>(this.url))
  }

  getById(id: number): Promise<Post> {
    const url = `${this.url}/${id}`
    return firstValueFrom(this.urlHttp.get<Post>(url))
  }
  create(postData: Post): Promise<Post> {
    console.log(postData);
    return firstValueFrom(this.urlHttp.post<Post>(this.url, postData)); 
  }
  deleteById(postId: string): Promise<Post> {
    return firstValueFrom(this.urlHttp.delete<Post>(`${this.url}/${postId}`))
  }
}

 

