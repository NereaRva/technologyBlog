import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogServerService } from 'src/app/blog-server.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

  createPost: FormGroup;

  servicios = inject(BlogServerService);

  router = inject(Router)

  constructor() {
    this.createPost = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      explicacion: new FormControl('', [Validators.required, /* Validators.minLength(30) */]),
      autor: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required])
    });
  }

  async onSubmit() {

    try {
      const response = await this.servicios.create(this.createPost.value);
      console.log(response);

      if (response.id) {
        await Swal.fire({
          title: 'Post creado',
          text: 'Se ha creado un nuevo post',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.router.navigateByUrl('/postList');
      } 
    } catch (error) {
      Swal.fire({
        title: 'Error en formulario',
        text: 'Cuidado! Tienes un error en los datos',
        icon: 'error',

        confirmButtonText: 'Aceptar'
      })
    }
  }
  checkError(field: string, validator: string): boolean {
    return this.createPost.get(field)!.hasError(validator) && this.createPost.get(field)!.touched;
  }
}
