import { Route } from "@angular/router";
import { ProductDetailComponent } from "./product-detail/product-detail.component";

export const ProductDetailRoutes: Route[] = [
    { path: 'product/:productId', component: ProductDetailComponent }
]