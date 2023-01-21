import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { Shop } from './models/shop';
import { ShopService } from './services/shop.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, ShopService]
})
export class AppComponent implements DoCheck{
  protected user:User;
  protected shop:Shop;
  protected css:any;
  protected message:any;
  protected identityUser:any;
  protected identityShop:any;

  public constructor(
    private _router:Router,
    private _userService:UserService,
    private _shopService:ShopService,
  ){
    this.user = new User(1, '','','','','','','','','');
    this.shop = new Shop(1,'','','','','','','','','','');
  }

  ngDoCheck(): void {
    this.identityUser = this._userService.getIdentity();
    this.identityShop = this._shopService.getIdentity();
  }

  protected onSubmit(form:any){
    this._userService.login(this.user).subscribe(
      response => {
        if(response.original){
          this.shop.email = this.user.email;
          this.shop.password = this.user.password;
          this._shopService.login(this.shop).subscribe(
            response => {
              if(response.original){
                this.css = 'alert alert-danger mt-3';
                this.message = response.original.message;
              }else{
                sessionStorage.setItem('tokenShop', response);
                this._shopService.login(this.shop, true).subscribe(
                  response => {
                    sessionStorage.setItem('identityShop', JSON.stringify(response));
                    this._router.navigate(['shop/home']);
                    form.reset();
                    this.css='';
                    this.message= '';
                  },
                  error => console.log(error)
                );
              }
            }, error => console.log(error)
          );
        }else{
          sessionStorage.setItem('token', response);
          this._userService.login(this.user, true).subscribe(
            response => {
              sessionStorage.setItem('identity', JSON.stringify(response));
              this._router.navigate(['user/home']);
              form.reset();
              this.css='';
              this.message= '';
            }, 
            error => console.log(error)
          );
        }
      }, error => console.log(error)
    );
    
  }

  protected close(){
    sessionStorage.clear();
    this._router.navigate(['']);
  }
}
