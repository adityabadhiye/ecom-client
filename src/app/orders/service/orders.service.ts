import { Injectable } from "@angular/core";
import { trackRequestResult } from "@ngneat/elf-requests";
import { HotToastService } from "@ngneat/hot-toast";
import { catchError, map, of, tap } from "rxjs";
import { ajax } from "rxjs/ajax";
import { AuthService } from "src/app/auth/service/auth.service";
import { ApiResponse } from "src/app/shared/api-resp.model";
import { environment } from "src/environments/environment";
import { OrderRepository } from "../state/order.repository";

@Injectable({ providedIn: 'root' })
export class OrdersService {

    constructor(
        private orderRepository: OrderRepository,
        private toast: HotToastService,
        private auth: AuthService
    ) { }

    getOrders() {
        return this.orderRepository.order$;
    }

    fetchOrders() {
        ajax.get(environment.apiUrlSpring + '/orders', { Authorization: this.auth.getToken() }).pipe(
            map((response) => response.response as Partial<ApiResponse>),
            tap((res) => {
                if (res.success)
                    this.orderRepository.setOrder(res.data.content);
                else
                    this.toast.error(res.error);
            }),
            trackRequestResult(['order']),
            catchError(error => {
                this.toast.error("Network error");
                console.log('error: ', error);
                return of(error);
            }),
        ).subscribe();
    }
}
