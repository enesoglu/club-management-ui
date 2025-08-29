import { AuthService } from '../../core/services/auth.service';

import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
            InputTextModule,
            MessageModule,
            ButtonModule,
            MessageModule,
            ToastModule,],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  messageService = inject(MessageService);

  credentials: FormGroup;

  formSubmitted = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,) {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  onSubmit() {
    this.formSubmitted = true;
    if (this.credentials.valid) {

      this.authService.login(this.credentials.value).subscribe({
        next: (response) => {
          console.log(response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login Successful.',
            life: 3000 });

          const creds = this.credentials.value;
          const authToken = 'Basic ' + btoa(creds.email + ':' + creds.password);
          this.authService.saveAuthToken(authToken);
          void this.router.navigate(['/members'])

          this.credentials.reset();
          this.formSubmitted = false;
        },

        error: (response) => {
          console.log(response);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Wrong E-Mail or Password.',
            life: 3000 });
        }
      })
    }
  }

  isInvalid(controlName: string) {
    const control = this.credentials.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }
}
