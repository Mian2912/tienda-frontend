import { ModuleWithProviders } from "@angular/core";
import { Route, Routes, RouterModule } from "@angular/router";

//components
import { ProfileShopComponent } from "./profile-shop/profile-shop.component";
import { OrderShopComponent } from "./order-shop/order-shop.component";

// guard
import { IdentityShopGuard } from "../guards/identityShop.guard";

//rutas 
const shopRoutes:Routes = [
    {path: 'shop/perfil', canActivate: [IdentityShopGuard], component: ProfileShopComponent},
    {path: 'shop/orders', canActivate: [IdentityShopGuard], component: OrderShopComponent},
];

export const ShopRoutingProviders:any[] = [];
export const shopRouting:ModuleWithProviders<any> = RouterModule.forRoot(shopRoutes);