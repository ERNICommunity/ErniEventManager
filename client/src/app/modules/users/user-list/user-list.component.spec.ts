import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { userServiceSpy, routerSpy, userSchemaMock1 } from '../../../utils-test/index.spec';
import { of } from 'rxjs';
import { UserCardComponent } from '../user-card/user-card.component';
import { Router } from '@angular/router';
import { LoaderModule } from '../../loader/loader.module';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserListComponent,
        UserCardComponent
      ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        LoaderModule
      ],
      providers: [
        {provide: Router, useValue: routerSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
