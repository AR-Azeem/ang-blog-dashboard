import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../service/categories.service';
import { Category } from '../interface/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categoriesData:Array<any>;
  categoryNameValue=""
  categoryId;
  formStatus = "Add";
  constructor(private categoryService:CategoriesService){}

  ngOnInit(){
    this.categoryService.loadData().subscribe(val=>{
      this.categoriesData = val;
    })
  }

  onSubmit(f:NgForm){
    console.log(f.value.categoryName)
    let category:Category={
      category:f.value.categoryName,
      
    }
    if(this.formStatus==="Add"){
      this.categoryService.saveCategory(category);
    }
    else{
      console.log('update')
      this.categoryService.updateData(this.categoryId,category)
      this.formStatus="Add"
    }
    f.resetForm();
  }

  onEdit(id,data){
    console.log(id,data)
    this.categoryNameValue=data;
    this.categoryId=id;
    this.formStatus = "Edit";
  }
  onDelete(id){
    this.categoryService.deleteData(id);
  }
}
