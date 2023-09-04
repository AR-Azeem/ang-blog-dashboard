import { Component } from '@angular/core';
import { SubscripitonService } from '../service/subscripiton.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {

  subscribers;

  constructor(private subService:SubscripitonService){}

  ngOnInit(){
    this.subService.loadSubscribers().subscribe(val=>{
      this.subscribers = val;
    })
  }

  onDelete(subId){
    this.subService.deleteSubscriber(subId);
  }

}
