import { Route } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";

export const AuthRoutes = [
    { path: 'login', component: AuthComponent },
    { path: 'register', redirectTo: 'login' },
    { path: 'signup', redirectTo: 'login' }
]