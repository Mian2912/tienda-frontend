import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/shop.service';
import { global } from 'src/app/services/global';


@Component({
  selector: 'app-profile-shop',
  templateUrl: './profile-shop.component.html',
  styleUrls: ['./profile-shop.component.css'],
  providers: [ShopService]
})
export class ProfileShopComponent implements OnInit{
  protected shop:Shop;
  protected identity:any;
  protected token:any;
  protected css:string;
  protected message:string;
  protected url = global.url;
  protected afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg, .jpeg, .png",
    maxSize: "20",
    uploadAPI:  {
        url: this.url+"shop/image",
        method:"POST",
        headers: {
          "Authorization" : this._shopService.getToken()
        }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText:'Editar Imagen'
      };


  public constructor( private _shopService:ShopService ){
    this.shop = new Shop(1,'','','','','','','','','','');
    this.identity = this._shopService.getIdentity();
    this.token = this._shopService.getToken();
    this.css = 'alert-info';
    this.message = 'Actualizar Perfil';
  }

  ngOnInit(): void {
    this.identity = this._shopService.getIdentity();
    this.getShop();
  }
  
  private getShop(){
    this._shopService.getShop(this.token).subscribe(
      response => this.shop = response.tiendaShop,
      error => console.log(error)
    );
  }

  protected onSubmit(form:any){
    this._shopService.update(this.shop, this.token).subscribe(
      response => {
        if(response.status == 'accepted'){
          this.css = 'alert-danger';
          this.message = response.message;
        }else{
          this.css = 'alert-success';
          this.message = response.message;
          this.identity.nameShop = this.shop.nameShop;
          sessionStorage.setItem('identityShop', JSON.stringify(this.identity));

        }
        
      }, error => console.log(error)
    );
  }

  protected imageProfile(data:any){
    let json = JSON.parse(data.response);
  }


}
// Supermecado Don Jose, donde encontrara un excelente servicio y los mejores productos de la canasta familiar a exceletes precios