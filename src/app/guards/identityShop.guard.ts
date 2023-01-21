import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ShopService } from "../services/shop.service";

@Injectable()
export class IdentityShopGuard implements CanActivate{

    public constructor( private _router:Router ,private _shopService:ShopService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let identityShop:any = this._shopService.getIdentity();
        if(identityShop && identityShop != 'undefined') return true;
        sessionStorage.clear();
        this._router.navigate(['']);
        return false;
    }

}