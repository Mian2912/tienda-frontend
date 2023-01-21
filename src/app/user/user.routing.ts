import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// componentes
import { ProfileUserComponent } from "./profile-user/profile-user.component";

// guard
import { IdentityUserGuard } from "../guards/identityUser.guard";
import { OrderUserComponent } from "./order-user/order-user.component";
import { ShopUserComponent } from "./shop-user/shop-user.component";

// rutas
const userRoutes:Routes = [
    {path: 'user/perfil', canActivate: [IdentityUserGuard], component:ProfileUserComponent},
    {path: 'user/orders', canActivate: [IdentityUserGuard], component:OrderUserComponent},
    {path: 'user/shop/:id', canActivate: [IdentityUserGuard], component:ShopUserComponent}
];

export const UserRoutingProviders:any[] = [];
export const userRouting:ModuleWithProviders<any> = RouterModule.forRoot(userRoutes);