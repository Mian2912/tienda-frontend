import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Shop } from 'src/app/models/shop';
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
  protected shops:Shop[];
  protected orders:Order[];
  protected css:string;
  protected order:Order;
  protected message:string;
  protected cantidad:number;


  public constructor (
    private _userService:UserService,
    private _orderService:OrderService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.shops = [];
    this.orders = [];
    this.order = new Order(1,1,1,'','','',1,1,1,1,1);
    this.cantidad = 0;
    this.css = 'alert-info';
    this.message = 'detalle de la orden';
  }

  public ngOnInit(): void {

  }

  

  protected onSubmit(form:any){
    this.order.full_value = this.order.quantity * this.order.unit_value;
    this._orderService.updateOrder(this.order, this.token).subscribe(
      response => {
        if (response.status == 'accepted'){
          this.loadAlert(response, 'alert-danger');
        }else{
          this.loadAlert(response, 'alert-success');
        }
      },
      error => console.log(error)
    );
  }

  private loadAlert(response:any, css:string){
    this.css = css;
    this.message = response.message;

    setTimeout(() => {
      this.css = 'alert-info';
      this.message = 'detalle de la orden';
    }, 3000);
  }


}
