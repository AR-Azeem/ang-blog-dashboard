import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscripitonService {

  constructor(private afs:AngularFirestore,private toastr:ToastrService) { }

  loadSubscribers(){
    return this.afs.collection('subscriber').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(action=>{
          const id = action.payload.doc.id;
          const data = action.payload.doc.data()
          return {id,data};
        })
      })
    )
  }

  deleteSubscriber(subId){
    this.afs.collection('subscriber').doc(subId).delete().then(val=>{
      this.toastr.success("Subscriber deleted successfully!")
    })
  }
}
