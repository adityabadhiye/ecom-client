import { ProductResponce } from "./product-resp.model";

export interface ProductsResponce {
    products: ProductResponce[];
    total: number;
    skip: number;
    limit: number;
}