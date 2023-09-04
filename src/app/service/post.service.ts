import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private storage:AngularFireStorage,private afs:AngularFirestore,private toastr :ToastrService) { }

  uploadImage(selectedImage,postData,formStatus,docId,oldImgPath){
    console.log(selectedImage)
    let filePath= `postIMG/${Date.now()}`;
    this.storage.upload(filePath,selectedImage).then(data=>{
      console.log("img uploaded successfully")
      this.storage.ref(filePath).getDownloadURL().subscribe(URL=>{
        postData.postImgPath = URL;
        console.log(postData);
        if(formStatus=="Add"){
          this.savePost(postData);
        }else{
          this.updatePost(docId,postData,oldImgPath)
        }
      })
    })
  }

  savePost(postData){
    this.afs.collection('posts').add(postData).then(res=>{
      this.toastr.success("Post saved successfully!")
    })
  }

  updatePost(id,postData,oldImgPath){
    this.storage.storage.refFromURL(oldImgPath).delete().then(res=>{
      this.afs.collection('posts').doc(id).update(postData).then(res=>{
        this.toastr.success("Post updated successfully")
      })
    })
    
  }

  loadPost(){
   return this.afs.collection('posts').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(action=>{
          const id=action.payload.doc.id;
          const data = action.payload.doc.data()
          return {id,data}
        })
      })
    )
  }

  loadOneData(docId){
    return this.afs.collection('posts').doc(docId).valueChanges()
  }
  deleteImage(image,id){
    this.storage.storage.refFromURL(image).delete().then(res=>{
      this.deletePost(id)
    })
  }

  deletePost(id){
    this.afs.collection('posts').doc(id).delete().then(res=>{
      this.toastr.error("Post deleted successfully")
    })
  }

  updateData(id,data){
    this.afs.collection('posts').doc(id).update(data).then(res=>{
      this.toastr.info('Updated data successfully');
    })
  }
}

