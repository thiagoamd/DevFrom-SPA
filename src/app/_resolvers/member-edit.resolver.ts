import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router, private alertity: AlertifyService,
                private authService: AuthService ) {}
    TokenData: any;

    resolve(router: ActivatedRouteSnapshot): Observable<User> {
       try {
        return this.userService.getUser(this.authService.decodedToken['nameid']).pipe(
            catchError(error => {
                this.alertity.error('Problem retrieving your data');
                this.router.navigate(['/member']);
                return of(null);
            })
        );
       } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        this.alertity.message('logged out');
        this.router.navigate(['/home']);
        return of(null);
       }
    }
}

