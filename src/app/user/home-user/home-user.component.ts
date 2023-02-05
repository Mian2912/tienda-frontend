import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/app/models/shop';
import { global } from 'src/app/services/global';
import { ShopService } from 'src/app/services/shop.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css'],
  providers: [UserService, ShopService]
})
export class HomeUserComponent implements OnInit{
  protected identity:any;
  private token:any;
  protected css:string;
  protected quantity:any;
  protected messageResponse:any;
  protected shops:Shop[];
  protected url:string;

  public constructor(
    private _userService:UserService,
    private _shopService:ShopService
  ){
    this.css = 'alert-info';
    this.shops = [];
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.getShops();
  }

  private getShops(){
    this._shopService.getShops(this.token).subscribe(
      response => {
        if(response.status == 'accepted'){
          this.messageResponse = response.message;
          this.shops = [];
        }else{
          this.shops = response.shops;
          this.quantity = response.quantity;
        }
      }, error => console.log(error)
      
    );
    
  }

  protected searchShop(shop:string){
    if(shop.length > 0){
      this._shopService.getShopBySearch(shop, this.token).subscribe(
        response => {
          if(response.status == 'accepted'){
            this.messageResponse = response.message;
            this.shops = []
          }else{
            this.shops = response.shops;
          }
        }, error => console.warn(error)
      );
    }else{
      this.getShops();
    }
  }
}
