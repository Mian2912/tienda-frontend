import { Component, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


// componentes
import { IndexComponent } from "./components/index/index.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeShopComponent } from "./shop/home-shop/home-shop.component";
import { HomeUserComponent } from "./user/home-user/home-user.component";


//guards
import { IdentityUserGuard } from "./guards/identityUser.guard";
import { IdentityShopGuard } from "./guards/identityShop.guard";

// rutas
const appRoutes:Routes = [
    {path: '', component:IndexComponent},
    {path: 'Registrarse', component:RegisterComponent},
    {path: 'user/home', canActivate: [IdentityUserGuard], component:HomeUserComponent},
    {path: 'shop/home', canActivate: [IdentityShopGuard], component:HomeShopComponent}

];

export const appRoutingProviders:any[] = [];
export const routing:ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);