import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
import { Observable, of, throwError } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { catchError, map, tap } from "rxjs/operators";
import { ApiResponse } from "src/app/shared/api-resp.model";
import { environment } from "src/environments/environment";
import { AuthProps, AuthRepository } from "../state/auth.repository";

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(
        private authRepository: AuthRepository,
        private router: Router,
        private toast: HotToastService,
        private http: HttpClient
    ) { }

    isAuthenticated(): Boolean {
        return !!this.authRepository.getToken();
    }

    getAuthState(): Observable<AuthProps> {
        return this.authRepository.authState$;
    }

    getToken(): string {
        return 'Bearer ' + this.authRepository.getToken() as string;
    }

    login(data: { email: string, password: string }) {
        const key = 'login';
        // console.log(data, data.email, data.password);
        // this.http.post(environment.apiUrlSpring + "/login", data).pipe(
        //     tap(console.log)
        // ).subscribe();
        this.http.post<Partial<ApiResponse>>(environment.apiUrlSpring + "/login", data)
            .pipe(
                // map(r => r.response as Partial<ApiResponse>),
                tap(resp => {
                    // console.log(resp);
                    if (resp.success) {
                        this.authRepository.setState({ token: resp.data.token, full_name: resp.data.user.fullName, email: resp.data.user.email }, key);
                        this.router.navigate(['/products']);
                    } else {
                        this.authRepository.setError((resp.error == 'validation error') ? resp.validation : { error: resp.error }, key);
                    }
                }),
                catchError(error => {
                    this.toast.error("Network error");
                    console.log('error: ', error);
                    this.authRepository.reset();
                    return of(error);
                }),
                this.authRepository.trackRequestsStatus(key)
            ).subscribe();
        //POST REQUEST HERE
        //this.authRepository.trackRequestsStatus('login')
        //on validation/network error => setError
        //on success => setState & redirect
    }

    signup(data: { fullName: string, email: string, password: string }) {
        const key = 'signup';
        // console.log(data, data.fullName, data.email, data.password);
        this.http.post<Partial<ApiResponse>>(environment.apiUrlSpring + "/register", data)
            .pipe(
                // map(r => r.response as Partial<ApiResponse>),
                tap(resp => {
                    // console.log(resp);
                    if (resp.success) {
                        this.authRepository.setState({ token: resp.data.token, full_name: resp.data.user.fullName, email: resp.data.user.email }, key);
                        this.router.navigate(['/products']);
                    } else {
                        this.authRepository.setError((resp.error == 'validation error') ? resp.validation : { error: resp.error }, key);
                    }
                }),
                catchError(error => {
                    this.toast.error("Network error");
                    console.log('error: ', error);
                    this.authRepository.reset();
                    return of(error);
                }),
                this.authRepository.trackRequestsStatus(key)
            ).subscribe();
        //POST REQUEST HERE
    }

    logout() {
        this.authRepository.reset();
        this.router.navigate(['/login'])
        //maybe redirect to login page again?
        //as this method will be called on token expiry
    }

}
