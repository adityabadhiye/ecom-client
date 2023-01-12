import { Route } from "@angular/router";
import { AuthGuardService } from "../auth/service/auth-guard.service";
import { OrderDetailComponent } from "./order-detail/order-detail.component";

export const OrderDetailRoutes: Route[] = [
    { path: 'order/:orderId', component: OrderDetailComponent, canActivate: [AuthGuardService] }
]