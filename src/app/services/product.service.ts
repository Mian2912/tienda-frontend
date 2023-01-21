import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { global } from "./global";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "../models/product";

@Injectable()
export class ProductService{
    private url:string;

    constructor( private _http:HttpClient ){
        this.url = global.url;    
    }


    public register(product:Product, token:string):Observable<any>{
        let json = JSON.stringify(product);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Authorization', token).set('Content-type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url+"shop/products", params, {headers:headers});
    }

    public allProductsByShop(token:string): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.url+"shop/products", {headers:headers});
    }

    public getProductById(id:number, token:string):Observable<any>{
        let header = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.url+"shop/product/"+id, {headers:header});
    }

    public updateProductById(product:Product, token:string):Observable<any>{
        let json = JSON.stringify(product);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Authorization', token)
            .set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.put(this.url+"shop/product/"+product.id, params, {headers:headers});
    }

    public AllProductsByShop(id:number, token:string):Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.url+"user/products/shop/"+id, {headers:headers});
    }
}