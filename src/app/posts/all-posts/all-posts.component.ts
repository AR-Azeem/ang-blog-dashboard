import { Component } from '@angular/core';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent {
  constructor(private postService : PostService){}

  allPosts:Array<any>;

  ngOnInit(){
    this.postService.loadPost().subscribe(val=>{
      this.allPosts =val;
    })
  }
  onDelete(postImagePath,id){
    this.postService.deleteImage(postImagePath,id);
  }

  onFeature(id){
    let featureData = {
      isFeatured : true
    }
    this.postService.updateData(id,featureData);
  }
  onRemoveFeature(id){
    let featureData = {
      isFeatured : false
    }
    this.postService.updateData(id,featureData);
  }
}
