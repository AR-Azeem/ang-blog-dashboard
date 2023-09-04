import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllPostsComponent } from './posts/all-posts/all-posts.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './service/auth.guard';
import { SubscriptionComponent } from './subscription/subscription.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'category',component:CategoryComponent,canActivate:[AuthGuard]},
  {path:'posts',component:AllPostsComponent,canActivate:[AuthGuard]},
  {path:'posts/new',component:NewPostComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'subscription',component:SubscriptionComponent,canActivate:[AuthGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
