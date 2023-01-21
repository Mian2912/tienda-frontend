import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/app/models/shop';
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

  public constructor(
    private _userService:UserService,
    private _shopService:ShopService
  ){
    this.css = 'alert-info';
    this.shops = [];
    this.token = this._userService.getToken();
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
}
