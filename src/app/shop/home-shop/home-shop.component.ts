import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/app/models/shop';
import { Product } from 'src/app/models/product';
import { ShopService } from 'src/app/services/shop.service';
import { ProductService } from 'src/app/services/product.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-home-shop',
  templateUrl: './home-shop.component.html',
  styleUrls: ['./home-shop.component.css'],
  providers: [ShopService, ProductService]
})
export class HomeShopComponent implements OnInit{
  protected shop:Shop;
  protected identity:any;
  protected producto:Product;
  private token:any;
  protected css:string;
  protected message:string;
  protected products:Product[];
  protected alert:any;
  protected updateProducto:Product;
  protected cantidad:number;
  protected mensajeResponse:any;
  protected url:string;
  protected afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg, .png",
    maxSize: "20",
    uploadAPI:  {
        url: global.url+"shop/products/image",
        method:"POST",
        headers: {
          "Authorization" : this._shopService.getToken()
        }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText:'Agregar Imagen'
      };

  public constructor(
    private _shopService:ShopService,
    private _productService:ProductService
  ){
    this.shop = new Shop(1,'','', '','', '', '', '','','','');
    this.identity = this._shopService.getIdentity(); 
    this.producto = new Product(1,'','','',0,0,this.identity.sub);
    this.updateProducto = new Product(1,'','','',0,0,this.identity.sub);
    this.token = this._shopService.getToken();
    this.css = 'alert-info';
    this.message = 'Agregar Nuevo Producto';
    this.products = [];
    this.cantidad = 0;
    this.url = global.url;
  }

  ngOnInit(): void {
    this.identity = this._shopService.getIdentity();
    this.allProductsByShop();
    
  }

  protected onSubmit(form:any){
    this._productService.register(this.producto, this.token).subscribe(
      response => {
        if(response.status == 'accepted'){
          this.loadAlert(response, 'alert-danger');
        }else{
          this.loadAlert(response, 'alert-success');
          form.reset();
          this.allProductsByShop();
        }
      }, error => console.log(error)
    ); 
  }

  private loadAlert(response:any, css:string){
    this.css = css;
    this.message = response.message;

    setTimeout(() => {
      this.css = 'alert-info';
      this.message = 'Agregar Nuevo Producto';
    }, 3000);
  
  }

  private allProductsByShop(){
    this._productService.allProductsByShop(this.token).subscribe(
      response => {
        if(response.status == 'accepted'){
          this.mensajeResponse = response.message;
        }else{
          this.products = response.products;
          this.cantidad = response.quantity;
        }
        
      }, 
      error => console.log(error)
    );
  }

  protected getProduct(id:number){
    this._productService.getProductById(id, this.token).subscribe(
      response => {
        this.alert = "Actualizar Producto";
        this.updateProducto = response.dataProduct
      }, 
      error => console.log(error)
    );
  }

  protected onUpdate(form:any){
    this._productService.updateProductById(this.updateProducto, this.token).subscribe(
      response => {
        if(response.status == 'accepted'){
          this.css = 'alert-danger';
          this.alert = response.message;
        }else{
          this.css = 'alert-success';
          this.alert = response.message;
          setTimeout(() => {
            this.alert = "Actualizar Producto";
            this.css = 'alert-info';
          }, 3000);
        }
      }, error => console.log(error)
    );
  }

  protected imageProduct(data:any){
    this.producto.image = JSON.parse(data.response).image;
  }

}
