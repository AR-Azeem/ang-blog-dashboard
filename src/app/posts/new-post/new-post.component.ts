import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/service/categories.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  permalink:string='';
  img:any = "../../../assets/placeholder.png"
  categories:Array<any>;
  postForm:FormGroup;
  imgPathSelected;
  docId;
  post;
  oldImgPath;
  formStatus="Add"

  ngOnInit(){
    this.categoryService.loadData().subscribe(val=>{
      this.categories = val;
    })
  }

  constructor(private categoryService:CategoriesService,private fb:FormBuilder,private postService:PostService,private activatedRoute:ActivatedRoute,private router:Router){
    this.activatedRoute.queryParams.subscribe(val=>{
      this.docId = val['id'];
      this.oldImgPath = val['img'];
      if(this.docId){
        this.postService.loadOneData(this.docId).subscribe(data=>{
          this.post = data;
          this.postForm = this.fb.group({
            title : [this.post.title,[Validators.required,Validators.minLength(10)]],
            permalink : [{value:this.post.permalink,disabled:true},Validators.required],
            excerpt : [this.post.excerpt,[Validators.required,Validators.minLength(20)]],
            category : [`${this.post.category.categoryId}-${this.post.category.category}`,Validators.required],
            postImg : ['',Validators.required],
            content : [this.post.content,Validators.required]
          })
          this.img= this.post.postImgPath
        })

        this.formStatus="Edit"

        
        
      }else{
        this.postForm = this.fb.group({
          title : ['',[Validators.required,Validators.minLength(10)]],
          permalink : [{value:'',disabled:true},Validators.required],
          excerpt : ['',[Validators.required,Validators.minLength(20)]],
          category : ['',Validators.required],
          postImg : ['',Validators.required],
          content : ['',Validators.required]
        })
      }
    })
    
  }

  get fc(){
    return this.postForm.controls;
  }

  onSubmit(){
    // console.log(this.postForm.getRawValue())
    let postFormValue = this.postForm.getRawValue()
    let splitted = postFormValue.category.split("-")
    let postData:Post={
      title:postFormValue.title,
      permalink:postFormValue.permalink,
      category:{
        categoryId:splitted[0],
        category:splitted[1]
      },
      postImgPath:'',
      isFeatured:false,
      excerpt:postFormValue.excerpt,
      content:postFormValue.content,
      status:'new',
      views:0,
      createdAt:new Date()
    }
    this.postService.uploadImage(this.imgPathSelected,postData,this.formStatus,this.docId,this.oldImgPath)
    this.postForm.reset();
    this.img = "../../../assets/placeholder.png"
    this.router.navigate(["/posts"]);

  }




  onTitle($event){
    let title = $event.target.value;
    this.permalink = title.replace(/\s/g,"-");
  }

  onPreview($event){
    const reader = new FileReader();
    reader.onload = e =>{
      console.log(e.target.result)
      this.img = e.target.result;
    }
    reader.readAsDataURL($event.target.files[0])
    this.imgPathSelected = $event.target.files[0] 
    console.log(this.imgPathSelected)
  }

}
