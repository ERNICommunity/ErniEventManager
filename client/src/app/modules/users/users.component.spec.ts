import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { MockComponent } from '../../utils';
import { RouterTestingModule } from '@angular/router/testing';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UsersComponent,
        MockComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'user',
            component: MockComponent
          }
        ])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
