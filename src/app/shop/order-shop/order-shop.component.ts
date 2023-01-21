import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-order-shop',
  templateUrl: './order-shop.component.html',
  styleUrls: ['./order-shop.component.css'],
  providers: [ShopService, OrderService]
})
export class OrderShopComponent implements OnInit{
  protected identity:any;
  protected token:any;
  protected order:Order;
  protected orders:Order[];
  protected css:string;
  protected message:any;
  protected quantity:number;

  public constructor(
    private _shopService:ShopService,
    private _orderService:OrderService
  ){
    this.identity = this._shopService.getIdentity();
    this.token = this._shopService.getToken();
    this.order = new Order(this.identity.sub,1,1,1,1,1,1,1);
    this.orders = [];
    this.css = 'alert-info';
    this.quantity = 0;
  }

  ngOnInit(): void {
    this.getOrdersByShop();
  }

  private getOrdersByShop(){
    this._orderService.allOrders(this.token).subscribe(
      response => {
        if(response.status == 'accepted'){
          this.message = response.message;
          this.orders = [];
        }else{
          this.orders = response.orders;
          this.quantity= response.quantity;
        }
      },
      error => console.log(error)
    );
  }


}
