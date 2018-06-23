import { Component, OnInit } from '@angular/core';
import { IUserSchema } from '../../interfaces/user.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  private user: IUserSchema;
  private isCreate: boolean;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = new IUserSchema();
  }

  ngOnInit() {
    if (this.route.snapshot.params['id'] === 'new') {
      this.isCreate = true;
    } else {
      this.userService.get(this.route.snapshot.params['id'])
        .subscribe((user) => {
          this.user = user;
        },
        (reason) => {
          this.router.navigate(['/']);
        }
      );
      this.isCreate = false;
    }
  }

  create() {
    this.userService.create(this.user)
      .subscribe(
        (user) => {
          this.router.navigate(['/user']); // success path
        },
        (error) => {
          console.log('Following error appeared: ', error);
        }
      );
  }

}
