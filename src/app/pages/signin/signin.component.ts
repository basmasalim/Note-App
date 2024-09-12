import { Component, Inject, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, SignupComponent, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  apiErr: string = '';
  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });

  loginSubmit(form: FormGroup): void {
    this.isLoading = true;
    this._AuthService.setLogin(form.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', '3b8ny__' + res.token);
        this._AuthService.setUserToken();
        this._Router.navigate(['/notes']);
      },
      error: (err) => {
        this.apiErr = err.error.msg;
        this.isLoading = false;
      },
    });
  }
}
