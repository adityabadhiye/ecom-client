import { Route } from "@angular/router";
import { AuthGuardService } from "../auth/service/auth-guard.service";
import { CheckoutComponent } from "./checkout/checkout.component";

export const CheckoutRoutes: Route[] = [
    { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService] }
]