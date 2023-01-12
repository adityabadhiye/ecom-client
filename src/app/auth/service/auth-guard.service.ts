import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public auth: AuthService, public router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // console.log(state.url);
        if (!this.auth.isAuthenticated() && state.url != '/login') {
            this.router.navigate(['login']);
            return false;
        } else if (this.auth.isAuthenticated() && state.url == '/login') {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}