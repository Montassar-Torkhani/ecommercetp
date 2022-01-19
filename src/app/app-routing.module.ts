import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjtprComponent } from './ajtpr/ajtpr.component';
import {CartComponent} from "./component/cart/cart.component";
import { LoginComponent } from './component/login/login.component';
import {ProductsComponent} from "./component/products/products.component";
import { ProfileComponent } from './component/profile/profile.component';
import { SignupComponent } from './component/signup/signup.component';
import { AuthGuard } from './guard/auth.guard';
import { GuestGuard } from './guard/guest.guard';

const routes: Routes = [
  {path:'',component:ProductsComponent},
  {path:'cart',component: CartComponent},
  {path:'login',component: LoginComponent,canActivate:[GuestGuard]},
  {path:'singup',component: SignupComponent,canActivate:[GuestGuard]},
  {path:'profile',component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'addprod',component:AjtprComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
