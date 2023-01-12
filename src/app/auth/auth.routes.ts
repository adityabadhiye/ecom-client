import { Route } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuardService } from "./service/auth-guard.service";

export const AuthRoutes: Route[] = [
    { path: 'login', component: AuthComponent, canActivate: [AuthGuardService] },
    { path: 'register', redirectTo: 'login' },
    { path: 'signup', redirectTo: 'login' }
]