import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/app/models/shop';
import { User } from 'src/app/models/user';
import { ShopService } from 'src/app/services/shop.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService, ShopService]

})
export class RegisterComponent implements OnInit{
  protected user:User;
  protected shop:Shop;
  protected message:string;
  protected css:string;

  public constructor( 
    private _userService:UserService,
    private _shopService:ShopService
  ){
    this.user = new User(1,'','','','','','','','','');
    this.shop = new Shop(1,'','','','','','','','','','')
    this.message = "Ingrese los datos del usuario";
    this.css = 'alert-info';
  }

  ngOnInit(): void {
    
  }

  protected d_none(){
    let aUser:any = document.querySelector('#user');
    let aShop:any = document.querySelector('#shop');
    let formUser:any = document.querySelector('#formUser');
    let formShop:any = document.querySelector('#formShop')

    aUser.addEventListener('click', ()=>{
      this.message = "Ingrese los datos del usuario";
      this.css = "alert-info";
      formUser.classList.remove('d-none');
      formShop.classList.add('d-none');
    });

    aShop.addEventListener('click', ()=>{
      this.message = "Ingrese los datos de la empresa";
      this.css = "alert-info";
      formShop.classList.remove('d-none');
      formUser.classList.add('d-none');
    });
    
  }

  protected formUser(form:any){
    this._userService.registerUser(this.user).subscribe(
      response => {
        if(response.status == 'accepted'){
          this.css = "alert-danger";
          this.message = response.message;
        }else{
          this.css = "alert-success";
          this.message = response.message;
          form.reset();
        }
      }, error => console.log(error)
    );
  }

  protected formShop(form:any){
    this._shopService.register(this.shop).subscribe(
      response => {
        if(response.status == "accepted"){
          this.css = 'alert-danger';
          this.message = response.message;
        }else{
          this.css = 'alert-success';
          this.message = response.message;
          form.reset();
        }
      }, error => console.log(error)
    );
  }

}
