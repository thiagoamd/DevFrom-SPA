import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router, private alertity: AlertifyService) {}

    resolve(router: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(router.params['id']).pipe(
            catchError(error => {
                this.alertity.error('Problem retrieving data');
                this.router.navigate(['/member']);
                return of(null);
            })
        );
    }
}

