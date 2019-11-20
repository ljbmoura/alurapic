import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor (private userService: UserService
        , private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot
        , state: RouterStateSnapshot)
        : boolean | Observable<boolean> | Promise<boolean> {

        if (!this.userService.isLoggeg()) {
            console.log(`rota "${state.url}" não permitida para usuário sem sessão ativa`);
            this.router.navigate(['']);
            return false;
        }
        return true;

    }
}
