import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { routerNgProbeToken } from '@angular/router/src/router_module';

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

        if (this.userService.isLoggeg()) {
            console.log(`rota "${state.url}" não permitida para usuário com sessão ativa`);
            this.router.navigate(['user', this.userService.getUserName()]);
            return false;
        }
        return true;

    }
}
