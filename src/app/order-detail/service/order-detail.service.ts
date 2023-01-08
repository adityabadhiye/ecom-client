import { Injectable } from "@angular/core";
import { trackRequestResult } from "@ngneat/elf-requests";
import { HotToastService } from "@ngneat/hot-toast";
import { catchError, map, of, tap } from "rxjs";
import { ajax } from "rxjs/ajax";
import { AuthService } from "src/app/auth/service/auth.service";
import { ApiResponse } from "src/app/shared/api-resp.model";
import { environment } from "src/environments/environment";
import { OrderDetailRepository } from "../state/order-detail.repository";

@Injectable({ providedIn: 'root' })
export class OrderDetailService {

    constructor(
        private orderDetailRepository: OrderDetailRepository,
        private toast: HotToastService,
        private auth: AuthService
    ) { }

    getOrderDetails() {
        return this.orderDetailRepository.orderDetail$;
    }

    fetchOrderDetail(id: string) {
        console.log(id);
        // this.orderDetailRepository.orderDetail(+id).subscribe(console.log);
        ajax.get(environment.apiUrlSpring + '/order?order_id=' + id, { Authorization: this.auth.getToken() }).pipe(
            map((response) => response.response as Partial<ApiResponse>),
            tap((res) => {
                if (res.success)
                    this.orderDetailRepository.setOrderDetail(res.data);
                else
                    this.toast.error(res.error);
            }),
            trackRequestResult(['order-detail']),
            catchError(error => {
                this.toast.error("Network error");
                console.log('error: ', error);
                return of(error);
            }),
        ).subscribe();
    }
}
