import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { global } from "./global";

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


}