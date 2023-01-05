import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { trackRequestResult } from '@ngneat/elf-requests';
import { map, tap } from 'rxjs/operators';
import { ApiResponse } from 'src/app/shared/api-resp.model';
import { environment } from 'src/environments/environment';
import { ProductDetailProps, ProductDetailRepository } from '../state/product-detail.repository';

@Injectable({ providedIn: 'root' })
export class ProductDetailService {

    constructor(
        private productDetailRepository: ProductDetailRepository,
        private http: HttpClient
    ) { }

    fetchProductDetail(id: string) {
        this.http.get<Partial<ApiResponse>>(environment.apiUrlSpring + '/product/' + id).pipe(
            map((response) => response.data),
            map((data: any) => {
                const { id, title, description, price, images } = data;
                const res: ProductDetailProps = { id, title, description, price, images };
                return res;
            }),
            tap((res) => this.productDetailRepository.setProduct(res)),
            trackRequestResult(['product-detail'], { skipCache: true })
        ).subscribe();
        // return this.http.get<ProductResponce>(environment.apiUrl + '/products/' + id).pipe(
        //     map((responce: ProductResponce) => {
        //         const { id, title, description, price, images } = responce;
        //         const res: ProductDetailProps = { id, title, description, price, images };
        //         return res;
        //     }),
        //     tap((res) => this.productDetailRepository.setProduct(res)),
        //     trackRequestResult(['product-detail'])
        // ).subscribe();
    }

}
