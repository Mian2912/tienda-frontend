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
    this.orders = [];
    this.order = new Order(1,1,1,'','','',1,1,1,1,1);
    this.cantidad = 0;
    this.css = 'alert-info';
    this.message = 'detalle de la orden';
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
          this.cantidad = response.quantity;
        }
      },
      error => console.log(error)
    );
  }

  protected getOrder(id:number){
    this._orderService.getOrder(id, this.token).subscribe(
      response => this.order = response.order,
      error => console.log(error)
    );
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
