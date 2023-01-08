import { Route } from "@angular/router";
import { OrderDetailComponent } from "./order-detail/order-detail.component";

export const OrderDetailRoutes: Route[] = [
    { path: 'order/:orderId', component: OrderDetailComponent }
]