import { Post } from './../../interfaces/posts.interface';
import { Component, inject } from '@angular/core';
import { BlogServerService } from 'src/app/blog-server.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent{
  
  blog: Post[] = [];
  servicios = inject(BlogServerService);

  async ngOnInit() {
    const response = await this.servicios.getAll()
    this.blog = response;
  }
  async handleClickBorrar(postId: string) {
    const result = await Swal.fire({
      title: 'Eliminar post',
      text: 'Vas a eliminar un post, ¿estás segura/o?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    });
    if (result.isConfirmed) {
  
      
       const respuesta = await this.servicios.deleteById(postId);

       
      const response = await this.servicios.getAll();
      this.blog = response;
    }
  }
}


