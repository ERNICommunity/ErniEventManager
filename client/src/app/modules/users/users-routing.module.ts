import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AuthGuard } from '../../services/auth/auth-guard.service';

const usersRoutes: Routes = [
    {
        path: '',
        component: UsersComponent,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                component: UserListComponent
            },
            {
                path: 'edit/:id',
                component: UserEditComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(usersRoutes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}
