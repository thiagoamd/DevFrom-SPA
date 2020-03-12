import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailsComponent } from './members/member-detail/member-details/member-details.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent, resolve: {user: MemberListResolver} , canActivate: [AuthGuard] },
            { path: 'members/:id', component: MemberDetailsComponent, resolve: {user: MemberDetailResolver} , canActivate: [AuthGuard] },
            { path: 'member/edit', component: MemberEditComponent, resolve: {user: MemberEditResolver}, 
                canDeactivate:[PreventUnsavedChanges], canActivate: [AuthGuard]},
            { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
            { path: 'list', component: ListComponent, canActivate: [AuthGuard] }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
