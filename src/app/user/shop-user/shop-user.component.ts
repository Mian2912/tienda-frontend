import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { global } from 'src/app/services/global';
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
  protected css:any;
  protected message:any;
  protected products:Product[];
  protected order:Order;
  protected user:User;
  protected url:string;

  public constructor(
    private _route:ActivatedRoute,
    private _userService:UserService,
    private _productService:ProductService,
    private _orderService:OrderService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.products = [];
    this.order = new Order(1, 1, 1, '','','',1, 1, 1, 1, 1);
    this.user = new User(1,'', '', '', '', '', '', '', '', '');
    this.url = global.url;
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

  protected addProduct(id:number){
    this.order.id_product = id;
    this.order.id_user = this.identity.sub;
    this._route.params.subscribe( params => {
      let idShop = params['id'];
      this.order.id_shop = idShop;
      this._orderService.sendOrder(this.order, this.token).subscribe(
        response => {          
          if(response.status == 'accepted')
            this.loadAlert(response, 'alert-danger position-fixed top-0 end-0 me-5');
          else
            this.loadAlert(response, 'alert-success position-fixed top-0 end-0 me-5');
          
        }, error => console.log(error)
        
      );
    });
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
    this.message = response.message;
    setTimeout(() => {
      this.css = '';
      this.message = '';
    }, 3000);
  }

}
