import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPaginator, IUserResponse } from '../../../interfaces';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  errorMessage: any;
  users = [];
  retreiveData = false;
  paginator: IPaginator = new IPaginator(
    100,
    5,
    [5, 10, 25, 100],
    0,
    {},
    { field: 'email', way: '' },
    {}
  );

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.retreiveData = true;
    this.userService.queryPaginated(this.paginator)
      .subscribe((userRes: IUserResponse) => {
        if (userRes.qi === this.paginator.qi) {
          this.retreiveData = false;
          this.paginator.length = userRes.length;
          this.users = userRes.list;
        }
      },
      (reason) => {
        this.displayError(reason);
        this.retreiveData = false;
      }
    );
  }

  openUser(id: string) {
    this.router.navigate(['/user/edit/' + id]);
  }

  displayError(reason: any) {
    this.errorMessage = reason && reason.error ? reason.error.err : 'Unexpected error appeared';
  }

}
