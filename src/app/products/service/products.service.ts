import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { trackRequestResult } from '@ngneat/elf-requests';
import { HotToastService } from '@ngneat/hot-toast';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiResponse } from 'src/app/shared/api-resp.model';
import { environment } from 'src/environments/environment';
import { Product, ProductsRepository } from '../state/products.repository';

@Injectable({ providedIn: 'root' })
export class ProductsService {

    constructor(
        private productsRepository: ProductsRepository,
        private http: HttpClient,
        private toast: HotToastService
    ) { }

    fetchProducts(page: number, cat: string | null, min: number, max: number, search: string | null) {
        this.http.get<Partial<ApiResponse>>(
            environment.apiUrlSpring + '/products' +
            ('?page=' + page) +
            (cat ? ('&cat=' + cat) : '') +
            ('&min=' + min + '&max=' + max) +
            (search ? ('&search=' + search) : '')
        ).pipe(
            map((responce) => responce.data),
            tap((data: any) => {
                this.productsRepository.setPagination({
                    itemsPerPage: data.size,
                    currentPage: data.number + 1,
                    totalItems: data.totalElements,
                    totalPage: data.totalPages,
                });
            }),
            map((data) => data.content),
            map((content: any) => {
                const entities: Product[] = content.map((o: any) => ({
                    id: o.id,
                    title: o.title,
                    price: o.price,
                    thumbnail: o.thumbnail
                }));
                return entities;
            }),
            tap((e) => this.productsRepository.setProducts(e)),
            trackRequestResult(['products'], { skipCache: true }),
            catchError(error => {
                this.toast.error("Network error");
                console.log('error: ', error);
                return of(error);
            }),
        ).subscribe();
        // return this.http.get<ProductsResponce>(environment.apiUrl + '/products').pipe(
        //     map((responce: ProductsResponce) => {
        //         const entities: Product[] = responce.products.map((o: ProductResponce) => ({
        //             id: o.id,
        //             title: o.title,
        //             price: o.price,
        //             thumbnail: o.thumbnail
        //         }));
        //         return entities;
        //     }),
        //     tap((e) => this.productsRepository.setProducts(e)),
        //     trackRequestResult(['products'])
        // ).subscribe();
    }

}
