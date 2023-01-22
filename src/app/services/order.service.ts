import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { global } from "./global";
import { Order } from "../models/order";

@Injectable()
export class OrderService{
    private url:string;

    public constructor (private _http:HttpClient){
        this.url = global.url;
    }

    public allOrders(token:string):Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.url+"shop/orders", {headers:headers});
    }

    public allOrdersOfTheUser(token:string):Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.url+"user/orders", {headers:headers});
    }

    public sendOrder(order:Order, token:string):Observable<any>{
        let json = JSON.stringify(order);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Authorization', token).set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url+"user/order", params, {headers:headers});
    }

    public getOrder(id:number, token:string):Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.url+"user/order/"+id, {headers: headers});
    }

    public updateOrder(order:Order, token:string):Observable<any>{
        let json = JSON.stringify(order);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Authorization', token).set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.put(this.url+"user/order/"+order.id, params, {headers:headers});
    }

    public searchedProduct(shop:number, searched:string, token:string):Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.url+"user/products/"+shop+"/"+searched, {headers:headers});
    }

}