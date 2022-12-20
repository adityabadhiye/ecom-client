import { Route } from "@angular/router";
import { ProductsComponent } from "./products/products.component";

export const ProductsRoutes: Route[] = [
    { path: 'products', component: ProductsComponent },
    { path: '', redirectTo: 'products', pathMatch: 'full' }
]