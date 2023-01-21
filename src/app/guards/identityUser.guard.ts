import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,  } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable()
export class IdentityUserGuard implements CanActivate{

    public constructor (
        private _router:Router,
        private _userService:UserService
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let identity:any = this._userService.getIdentity();
        if(identity && identity.sub) return true;
        sessionStorage.clear();
        this._router.navigate(['']);
        return false;
    }
}