import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-user',
  templateUrl: './order-user.component.html',
  styleUrls: ['./order-user.component.css'],
  providers: [UserService, OrderService]
})
export class OrderUserComponent implements OnInit{
  protected identity:any;
  private token:any;
  protected orders:Order[];
  protected order:Order;
  protected message:any;
  protected quantity:number;

  public constructor (
    private _userService:UserService,
    private _orderService:OrderService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.orders = [];
    this.order = new Order(1,1,1,1,1,1,1,1);
    this.quantity = 0;
  }

  public ngOnInit(): void {
    this.getOrders();
  }

  private getOrders(){
    this._orderService.allOrdersOfTheUser(this.token).subscribe(
      response => {
        if(response.status == 'accepted'){
          this.message = response.message;
          this.orders = [];
        }else{
          this.orders = response.orders;
          this.quantity = response.quantity;
        }
      },
      error => console.log(error)
    );
  }


}
