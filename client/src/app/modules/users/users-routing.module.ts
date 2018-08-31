import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const usersRoutes: Routes = [
    {
        path: '',
        component: UsersComponent,
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
