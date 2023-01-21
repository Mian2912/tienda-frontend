import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { global } from "./global";
import { User } from "../models/user";

@Injectable()
export class UserService{
    private url:string;
    private identity:any;
    private token:any;

    public constructor( private _http:HttpClient ){
        this.url = global.url;
    }

    public registerUser(user:User):Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url+"user/register", params, {headers:headers})
    }

    public login(user:any, gettoken:boolean=false):Observable<any>{
        user.gettoken = (gettoken != false) ? 'true' : 'false';
        let json = JSON.stringify(user);
        let params = 'json='+json;   
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url+'user/login', params, {headers:headers});
    }

    public getIdentity(){
        let identity = sessionStorage.getItem('identity');
        identity = (identity && identity != 'undefined') ? JSON.parse(identity) : null;
        return identity;
    }

    public getToken(){
        let token = sessionStorage.getItem('token');
        token = (token && token != 'undefined') ? token: null;
        return token;
    }

    public getUser(token:string):Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(this.url+"user/getUser", {headers:headers});
    }

    public update(user:User, token:string): Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Authorization', token).set('Content-Type','application/x-www-form-urlencoded');
        return this._http.put(this.url+"user/update", params, {headers:headers});
    }

}