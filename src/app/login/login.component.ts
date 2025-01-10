import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private storage: StorageService,
    private apiService: ApiService
  ) {}

  login() {
    const loginData = { user: this.user, password: this.password };

    this.apiService.login(loginData).subscribe(
      (response: any) => {
        console.log(response, 'res');
        this.storage.setItem('token', response.token);
        this.router.navigate(['/mainpage']);
      },
      (error) => {
        console.log('login error:', error);
        alert('An error occured during login.');
      }
    );
  }

  onSubmit() {
    this.login();
  }
}
