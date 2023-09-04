import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import {ToastrService} from "ngx-toastr";
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs:AngularFirestore,private toastr:ToastrService) { }

  saveCategory(data){
    this.afs.collection("categories").add(data).then(res=>{
        this.toastr.success("Categories added successfully");
    })

  }

  loadData(){
    return this.afs.collection("categories").snapshotChanges().pipe(
      map(actions=>{
       return actions.map(action=>{
          let id = action.payload.doc.id;
          let data = action.payload.doc.data();
          return {id,data};
        })
      })
    )
  }

  updateData(id,data){
    this.afs.collection("categories").doc(id).update(data).then(val=>{
      this.toastr.success("Updated category successfully!");
    })
  }

  deleteData(id){
    this.afs.collection("categories").doc(id).delete().then(res=>{
      this.toastr.error('Deleted Successfully!')
    })
  }
}
