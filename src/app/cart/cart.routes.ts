import { Route } from "@angular/router";
import { AuthGuardService } from "../auth/service/auth-guard.service";
import { CartComponent } from "./cart/cart.component";

export const CartRoutes: Route[] = [
    { path: 'cart', component: CartComponent, canActivate: [AuthGuardService] },
]