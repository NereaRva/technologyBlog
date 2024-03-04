import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './component/post-list/post-list.component';
import { CreatePostComponent } from './component/create-post/create-post.component';
import { DetailPostComponent } from './component/detail-post/detail-post.component';

const routes: Routes = [
  { path: '', pathMatch:'full', component: PostListComponent},
  { path: 'postList', component: PostListComponent},
  { path: 'createPost', component: CreatePostComponent},
  { path: 'detailPost/:id', component: DetailPostComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }