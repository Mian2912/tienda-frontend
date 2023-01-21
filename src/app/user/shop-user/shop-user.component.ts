import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shop-user',
  templateUrl: './shop-user.component.html',
  styleUrls: ['./shop-user.component.css'],
  providers: [UserService, ProductService]
})
export class ShopUserComponent implements OnInit{
  protected identity:any;
  private token:any;
  protected css:string;
  protected message:any;
  protected products:Product[];

  public constructor(
    private _route:ActivatedRoute,
    private _userService:UserService,
    private _productService:ProductService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.products = [];
    this.css = 'alert-info'
    this.message = ''
  }

  public ngOnInit(): void {
    this.getProductByShop();
  }

  private getProductByShop(){
    this._route.params.subscribe( params => {
      let idShop = params['id'];
      this._productService.AllProductsByShop(idShop, this.token).subscribe(
        response => this.products = response.products,
        error => console.log(error)
      );
      
    })
  }

  protected onSubmit(form:any){

  }

}
