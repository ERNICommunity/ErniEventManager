import { NgModule } from '@angular/core';

import { RouterModule, Router } from '@angular/router';
import { UserCardComponent } from './user-card/user-card.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from '../loader/loader.module';

@NgModule({
    declarations: [
        UserCardComponent,
        UserEditComponent,
        UserListComponent,
        UsersComponent
    ],
    imports : [
        CommonModule,
        UsersRoutingModule,
        SharedModule,
        FormsModule,
        LoaderModule
    ]
})
export class UsersModule {}
