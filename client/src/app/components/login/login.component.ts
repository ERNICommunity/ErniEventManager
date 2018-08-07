import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error = false;

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {

    this.authService.authError.subscribe((value) => {
      this.error = value;
    });

    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }


  login() {
    this.authService.login(this.form.value.login, this.form.value.password);
  }
}
