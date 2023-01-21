import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import { shopRouting, ShopRoutingProviders } from './shop/shop.routing';
import { userRouting, UserRoutingProviders } from './user/user.routing';

// component
import { IndexComponent } from './components/index/index.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeShopComponent } from './shop/home-shop/home-shop.component';
import { HomeUserComponent } from './user/home-user/home-user.component';
import { ProfileShopComponent } from './shop/profile-shop/profile-shop.component';
import { OrderShopComponent } from './shop/order-shop/order-shop.component';

//services
import { UserService } from './services/user.service';
import { ShopService } from './services/shop.service';

//gurds
import { IdentityUserGuard } from './guards/identityUser.guard';
import { IdentityShopGuard } from './guards/identityShop.guard';
import { ProfileUserComponent } from './user/profile-user/profile-user.component';
import { OrderUserComponent } from './user/order-user/order-user.component';
import { ShopUserComponent } from './user/shop-user/shop-user.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeShopComponent,
    HomeUserComponent,
    IndexComponent,
    ProfileShopComponent,
    OrderShopComponent,
    ProfileUserComponent,
    OrderUserComponent,
    ShopUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    shopRouting,
    userRouting
  ],
  providers: [
    appRoutingProviders,
    UserService,
    ShopService,
    IdentityUserGuard,
    IdentityShopGuard,
    ShopRoutingProviders,
    UserRoutingProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
