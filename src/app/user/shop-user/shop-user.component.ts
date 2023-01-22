import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shop-user',
  templateUrl: './shop-user.component.html',
  styleUrls: ['./shop-user.component.css'],
  providers: [UserService, ProductService, OrderService]
})
export class ShopUserComponent implements OnInit{
  protected identity:any;
  private token:any;
  protected css:string;
  protected message:any;
  protected messageForm:string;
  protected products:Product[];
  protected order:Order;
  protected user:User;

  public constructor(
    private _route:ActivatedRoute,
    private _userService:UserService,
    private _productService:ProductService,
    private _orderService:OrderService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.products = [];
    this.css = 'alert-info';
    this.messageForm = '¿Desea Ordenar este producto?';
    this.order = new Order(1, 1, 1, '','','',1, 1, 1, 1, 1);
    this.user = new User(1,'', '', '', '', '', '', '', '', '');
  }

  public ngOnInit(): void {
    this.getProductByShop();
  }

  private getProductByShop(){
    this._route.params.subscribe( params => {
      let idShop = params['id'];
      this.order.id_shop = idShop;
      this._productService.AllProductsByShop(idShop, this.token).subscribe(
        response => this.products = response.products,
        error => console.log(error)
      );
      
    })
  }

  protected getUser(id:number){
    this._userService.getUser(this.token).subscribe(
      response => {
        this.order.nameUser = response.user.name;
        this.order.phone = response.user.phone;
        this.order.address = response.user.address;
        this.getProduct(id);
      },
      error => console.log(error)
    );
  }

  private getProduct(id:number){
    this._productService.getProductById(id, this.token).subscribe(
      response => {
        this.order.id_product = response.dataProduct.id;
        this.order.unit_value = response.dataProduct.price;
      },
      error => console.log(error)
    );
  }

  protected onSubmit(form:any){
    this.order.full_value = this.order.unit_value * this.order.quantity;
    this._orderService.sendOrder(this.order, this.token).subscribe(
      response => {
        if(response.status == 'accepted'){
          this.loadAlert(response, 'alert-danger');
        }else{
          this.loadAlert(response, 'alert-success');
        }
      },
      error => console.log(error)
    );
  }

  protected getResults(searched:string){
    this._route.params.subscribe( params => {
      let shop = params['id'];

      if(searched.length > 0){
        this._orderService.searchedProduct(shop, searched, this.token).subscribe(
          response => {
            if(response.status == 'accepted'){
              this.products = [];
              this.message = response.message;
            }else{
              this.products = response.products;
            }
          },
          error => console.log(error)
        );
      }else{
        this.getProductByShop();
      }

    })

  }

  private loadAlert(response:any, css:string){
    this.css = css;
    this.messageForm = response.message;
    setTimeout(() => {
      this.css = 'alert-info';
      this.messageForm = '¿Desea Ordenar este producto?';
    }, 3000);
  }

}
