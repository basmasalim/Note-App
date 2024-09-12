import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from './../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, SigninComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  apiErr: string = '';
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(20),]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^\w{6,}$/),]),
    phone: new FormControl('', [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/),]),
    age: new FormControl('', [Validators.required]),
  });
  AuthService: any;

  registerSubmit(form: FormGroup): void {
    this.isLoading = true;
    this._AuthService.setRegister(form.value).subscribe({
      next: (res) => {
        this._Router.navigate(['/signin']);
      },
      error: (err) => {
        this.apiErr = err.error.msg;
        this.isLoading = false;
      },
    });
  }
}
