import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogServerService } from 'src/app/blog-server.service';
import { Post } from 'src/app/interfaces/posts.interface';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit {
 
  blog: Post | undefined;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private service: BlogServerService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.fetchPostDetails(this.id);
    });
  }

  fetchPostDetails(id: number): void {
    this.service.getById(id).then(
      (data: Post) => {
        this.blog = data;
      },
      (error: any) => {
        console.error('Error fetching post details:', error);
      }
    );
  }
}
