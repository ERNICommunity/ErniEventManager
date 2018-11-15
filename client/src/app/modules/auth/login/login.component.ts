import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AdalService } from 'adal-angular4';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error = false;
  display = false;

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private adalService: AdalService) {

    this.authService.authError.subscribe((value) => {
      this.error = value;
    });

    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated() && this.adalService.userInfo.authenticated) {
      this.authService.loginAzure();
    } else {
      this.display = true;
    }
  }


  login() {
    this.authService.login(this.form.value.login, this.form.value.password);
  }

  loginAzure() {
    this.adalService.login();
  }

}
