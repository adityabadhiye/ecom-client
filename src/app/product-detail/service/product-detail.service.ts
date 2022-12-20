import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { trackRequestResult } from '@ngneat/elf-requests';
import { map, tap } from 'rxjs/operators';
import { ProductResponce } from 'src/app/shared/product-resp.model';
import { environment } from 'src/environments/environment';
import { ProductDetailProps, ProductDetailRepository } from '../state/product-detail.repository';

@Injectable({ providedIn: 'root' })
export class ProductDetailService {

    constructor(private productDetailRepository: ProductDetailRepository, private http: HttpClient) {
    }

    fetchProductDetail(id: string) {
        return this.http.get<ProductResponce>(environment.apiUrl + '/products/' + id).pipe(
            map((responce: ProductResponce) => {
                const { id, title, description, price, images } = responce;
                const res: ProductDetailProps = { id, title, description, price, images };
                return res;
            }),
            tap((res) => this.productDetailRepository.setProduct(res)),
            trackRequestResult(['product-detail'])
        ).subscribe();
    }

}
