import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { trackRequestResult } from '@ngneat/elf-requests';
import { map, tap } from 'rxjs/operators';
import { ProductResponce } from 'src/app/shared/product-resp.model';
import { ProductsResponce } from 'src/app/shared/products-resp.model';
import { environment } from 'src/environments/environment';
import { Product, ProductsRepository } from '../state/products.repository';

@Injectable({ providedIn: 'root' })
export class ProductsService {

    constructor(private productsRepository: ProductsRepository, private http: HttpClient) {
    }

    fetchProducts() {
        return this.http.get<ProductsResponce>(environment.apiUrl + '/products').pipe(
            map((responce: ProductsResponce) => {
                const entities: Product[] = responce.products.map((o: ProductResponce) => ({
                    id: o.id,
                    title: o.title,
                    price: o.price,
                    thumbnail: o.thumbnail
                }));
                return entities;
            }),
            tap((e) => this.productsRepository.setProducts(e)),
            trackRequestResult(['products'])
        ).subscribe();
    }

}
