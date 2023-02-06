import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/app/models/shop';
import { global } from 'src/app/services/global';
import { ShopService } from 'src/app/services/shop.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  protected url:string;
  protected shops:Shop[];
  protected identityUser:any;
  protected identityShop:any;

  public constructor(
    private _userService:UserService,
    private _shopService:ShopService
    ){
    this.url = global.url;
    this.shops = [];
    this.identityUser = this._userService.getIdentity();
    this.identityShop = this._shopService.getIdentity();
  }

  public ngOnInit(): void {
    this.getShops();
  }
  
  protected searchShop(search:string){
    if(search.length > 0){
      this._shopService.getShopBySearch(search).subscribe(
        response => {
          if (response.status == 'accepted'){
            this.shops = [];
          }else{
            this.shops = response.shops;
          }
        },
        error => console.log(error)
      );
    }else{
      this.getShops();
    }
  }

  private getShops(){
    this._shopService.getShops().subscribe(
      response => this.shops = response.shops,
      error => console.log(error)
    );
  }

}
