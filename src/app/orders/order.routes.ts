import { Route } from "@angular/router";
import { AuthGuardService } from "../auth/service/auth-guard.service";
import { OrdersComponent } from "./orders/orders.component";

export const OrderRoutes: Route[] = [
    { path: 'orders', component: OrdersComponent, canActivate: [AuthGuardService] }
]