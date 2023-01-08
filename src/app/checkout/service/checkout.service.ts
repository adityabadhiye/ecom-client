// TODO: SETUP SERVICE AND REPOSITORY AND NO_PRODUCT_IN_CART_ERROR

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, map, tap } from "rxjs/operators";
import { AuthService } from "src/app/auth/service/auth.service";
import { ApiResponse } from "src/app/shared/api-resp.model";
import { environment } from "src/environments/environment";
import { CheckoutRepository } from "../state/checkout.repository";

@Injectable({ providedIn: 'root' })
export class CheckoutService {

    constructor(
        // private http: HttpClient,
        private auth: AuthService,
        private checkoutRepository: CheckoutRepository,
        private toast: HotToastService
    ) { }

    getCheckoutStatus() {
        return this.checkoutRepository.checkoutStatus$;
    }

    checkout(data: any) {
        ajax.post(environment.apiUrlSpring + "/create-order", data, { Authorization: this.auth.getToken() })
            .pipe(
                map(r => r.response as Partial<ApiResponse>),
                tap(resp => {
                    // console.log(resp);
                    if (resp.success) {
                        if (typeof resp.data.paymentURL == "string")
                            window.location.href = resp.data.paymentURL as string;
                        else
                            this.toast.error("Server error")
                    } else {
                        if (resp.error == 'validation error') {
                            this.toast.error("Validation Error");
                            this.checkoutRepository.setError(resp.validation);
                        } else {
                            this.checkoutRepository.setError({ error: resp.error });
                        }
                    }
                }),
                catchError(error => {
                    this.toast.error("Network error");
                    console.log('error: ', error);
                    return of(error);
                }),
                this.checkoutRepository.trackRequestsStatus('checkout')
            ).subscribe();
    }
}
