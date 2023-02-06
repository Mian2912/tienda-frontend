import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { identity, Observable } from "rxjs";
import { global } from "./global";
import { Shop } from "../models/shop";

@Injectable()
export class ShopService{
    private url:string;

    public constructor( private _http:HttpClient ){
        this.url = global.url;
    }

    public register(shop:Shop):Observable<any>{
        let json = JSON.stringify(shop);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url+"shop/register", params, {headers:headers});
    }

    public login(shop:any, gettoken:boolean=false):Observable<any>{
        shop.gettoken = (gettoken != false) ? 'true' : 'false';
        let json = JSON.stringify(shop);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url+'shop/login', params, {headers:headers});
    }

    public getIdentity(){
        let identityShop:any = sessionStorage.getItem('identityShop');
        identityShop = (identityShop && identityShop.sub) ? JSON.parse(identityShop): null;
        return identityShop;
    }

    public getToken(){
        let tokenShop = sessionStorage.getItem('tokenShop');
        tokenShop = (tokenShop && tokenShop != 'undefined') ? tokenShop :null;
        return tokenShop;
    }

    public getShop(token:string):Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.url+"shop/profile", {headers:headers});
    }

    public update(shop:Shop, token:string):Observable<any>{
        let json = JSON.stringify(shop);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Authorization', token).set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.put(this.url+"shop/profile", params, {headers:headers});
    }

    public getShops():Observable<any>{
        return this._http.get(this.url+"shops");
    }

    public getShopBySearch(search:string):Observable<any>{
        return this._http.get(this.url+"user/shop/"+search);
    }

}