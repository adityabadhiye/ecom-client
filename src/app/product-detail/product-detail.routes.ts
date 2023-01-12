import { Route } from "@angular/router";
import { AuthGuardService } from "../auth/service/auth-guard.service";
import { ProductDetailComponent } from "./product-detail/product-detail.component";

export const ProductDetailRoutes: Route[] = [
    { path: 'product/:productId', component: ProductDetailComponent, canActivate: [AuthGuardService] }
]